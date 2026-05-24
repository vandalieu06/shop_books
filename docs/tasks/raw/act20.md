# Sessió 20

**Desenvolupament Web Full Stack (React, Node, Mongo)**  
**Curs 2025-2026**  
**Pràctica: E-commerce**

---

- [1. Dates](#1-dates)
- [2. Objectius](#2-objectius)
- [3. Feina prèvia abans de la sessió](#3-feina-prèvia-abans-de-la-sessió)
- [4. Feina durant la sessió](#4-feina-durant-la-sessió-i-abans-de-la-següent-sessió)
  - [4.1 Què és l'observabilitat?](#41-què-és-lobservabilitat)
  - [4.2 Instal·lació de dependències](#42-instal-lació-de-dependències)
  - [4.3 Configuració del logger](#43-configuració-del-logger)
  - [4.4 Afegir logs HTTP automàtics](#44-afegir-logs-http-automàtics)
  - [4.5 Request ID per traçar peticions](#45-request-id-per-traçar-peticions)
  - [4.6 Incloure requestId als logs](#46-incloure-requestid-als-logs)
  - [4.7 Logs manuals en controladors](#47-logs-manuals-en-controladors)
  - [4.8 Middleware global d'errors observable](#48-middleware-global-derrors-observable)
  - [4.9 Endpoint de salut: health check](#49-endpoint-de-salut-health-check)
  - [4.10 Mètriques bàsiques](#410-mètriques-bàsiques)
  - [4.11 Protegir /metrics](#411-protegir-metrics)
  - [4.12 Logging d'autenticació](#412-logging-dautenticació)
  - [4.13 Logging de checkout i pagaments](#413-logging-de-checkout-i-pagaments)
  - [4.14 Simulació d'error per comprovar observabilitat](#414-simulació-derror-per-comprovar-observabilitat)
- [Estructura recomanada](#estructura-recomanada)
- [Lliurable](#lliurable-de-la-sessió-20)

---

## 1. Dates

04/05 — 08/05

## 2. Objectius

| Pes | Preferent? | Funcionalitat |
| :--- | :--- | :--- |
| 0,4 | ☑ ✓ | Implementar logs estructurats al backend |
| 0,3 | ☑ | Afegir request-id per traçar peticions |
| 0,2 | ✓ | Crear mètriques bàsiques de salut i rendiment |
| 0,1 | | Documentar errors i incidències observables |

## 3. Feina prèvia abans de la sessió

- Tenir el backend Express funcionant
- Tenir connexió a MongoDB
- Tenir endpoints d'autenticació i productes
- Revisar què són: logs, errors HTTP, middleware d'Express, codis d'estat HTTP (200, 201, 400, 401, 403, 404, 500)

## 4. Feina durant la sessió i abans de la següent sessió

---

### 4.1 Què és l'observabilitat?

L'observabilitat és la capacitat d'entendre què està passant dins d'una aplicació a partir de la informació que genera.

En aquesta sessió treballarem tres pilars bàsics:

| Pilar | Funció |
| :--- | :--- |
| Logs | Saber què ha passat |
| Request ID | Seguir una petició concreta |
| Mètriques | Mesurar com funciona el sistema |

**Exemple real:**

Un client diu: "He intentat comprar i m'ha donat error."

- Sense observabilitat només sabem que "alguna cosa ha fallat"
- Amb observabilitat podem saber:
  - quin endpoint ha fallat
  - a quina hora
  - quin usuari estava autenticat
  - quin error s'ha produït
  - quant ha trigat la petició
  - quin requestId permet seguir el rastre

---

### 4.2 Instal·lació de dependències

```bash
pnpm add pino pino-http uuid
```

Opcional per desenvolupament:

```bash
pnpm add -D pino-pretty
```

**Explicació**

| Paquet | Ús |
| --- | --- |
| pino | Logger ràpid i estructurat |
| pino-http | Middleware de logs per Express |
| uuid | Generació d'identificadors únics |
| pino-pretty | Format llegible en desenvolupament |

![Dependències instal·lades](../../../Pasted%20image%2020260524210237.png)

---

### 4.3 Configuració del logger

Crear fitxer: `src/config/logger.js`

```javascript
const pino = require('pino');
const isDevelopment = process.env.NODE_ENV !== 'production';
const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  transport: isDevelopment
    ? {
        target: 'pino-pretty',
        options: {
          colorize: true,
          translateTime: 'SYS:standard',
          ignore: 'pid, hostname'
        }
      }
    : undefined
});
module.exports = logger;
```

Afegir al `.env`:

```env
NODE_ENV=development
LOG_LEVEL=debug
```

Producció:

```env
NODE_ENV=production
LOG_LEVEL=info
```

![Configuració logger](../../../Pasted%20image%2020260524210404.png)
![Logger funcionant](../../../Pasted%20image%2020260524210539.png)

---

### 4.4 Afegir logs HTTP automàtics

Crear fitxer: `src/middleware/httpLogger.js`

```javascript
const pinoHttp = require('pino-http');
const logger = require('../config/logger');
const httpLogger = pinoHttp({
  logger,
  customLogLevel: function (req, res, err) {
    if (res.statusCode >= 500 || err) return 'error';
    if (res.statusCode >= 400) return 'warn';
    return 'info';
  },
  customSuccessMessage: function (req, res) {
    return `${req.method} ${req.url} completed with status ${res.statusCode}`;
  },
  customErrorMessage: function (req, res, err) {
    return `${req.method} ${req.url} failed with status ${res.statusCode}`;
  }
});
module.exports = httpLogger;
```

Afegir a `src/server.js`:

```javascript
const httpLogger = require('./middleware/httpLogger');
app.use(httpLogger);
```

A partir d'aquest moment, cada petició generarà un log automàtic.

![Logs HTTP automàtics](../../../Pasted%20image%2020260524210608.png)

---

### 4.5 Request ID per traçar peticions

Cada petició tindrà un identificador únic. Això permet seguir una petició des que entra fins que surt.

Crear fitxer: `src/middleware/requestId.js`

```javascript
const { v4: uuidv4 } = require('uuid');
const requestId = (req, res, next) => {
  const incomingRequestId = req.headers['x-request-id'];
  req.requestId = incomingRequestId || uuidv4();
  res.setHeader('X-Request-Id', req.requestId);
  next();
};
module.exports = requestId;
```

Afegir a `src/server.js` **abans** del logger HTTP:

```javascript
const requestId = require('./middleware/requestId');
app.use(requestId);
app.use(httpLogger);
```

**Important:** L'ordre importa.

1. Primer: `app.use(requestId);`
2. Després: `app.use(httpLogger);`

Així el logger ja pot incloure el requestId.

![Request ID middleware](../../../Pasted%20image%2020260524210635.png)
![Request ID en acció](../../../Pasted%20image%2020260524210724.png)
![Header X-Request-Id](../../../Pasted%20image%2020260524210741.png)

---

### 4.6 Incloure requestId als logs

Modificar `httpLogger.js`:

```javascript
const pinoHttp = require('pino-http');
const logger = require('../config/logger');
const httpLogger = pinoHttp({
  logger,
  genReqId: function (req) {
    return req.requestId;
  },
  customProps: function (req, res) {
    return {
      requestId: req.requestId,
      userId: req.user?.userId || null
    };
  },
  customLogLevel: function (req, res, err) {
    if (res.statusCode >= 500 || err) return 'error';
    if (res.statusCode >= 400) return 'warn';
    return 'info';
  }
});
module.exports = httpLogger;
```

Exemple de log:

```json
{
  "level": 30,
  "requestId": "7b8f3e9b-2a4b-4d24-8d21-91a98b0e75c9",
  "method": "GET",
  "url": "/api/products",
  "statusCode": 200,
  "responseTime": 35,
  "msg": "request completed"
}
```

![Log amb requestId](../../../Pasted%20image%2020260524210941.png)
![Custom props al log](../../../Pasted%20image%2020260524210929.png)

---

### 4.7 Logs manuals en controladors

Exemple en `productController.js`:

```javascript
exports.getProducts = async (req, res, next) => {
  try {
    req.log.info({ requestId: req.requestId }, 'Getting product list');
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    req.log.error({
      requestId: req.requestId,
      error: error.message
    }, 'Error getting products');
    next(error);
  }
};
```

**Quan usar logs manuals:**

- operacions importants
- errors inesperats
- canvis d'estat
- accions sensibles
- pagaments
- login/logout

Exemples:

```javascript
req.log.info('User logged in');
req.log.warn('Invalid login attempt');
req.log.error('Payment failed');
```

![Logs manuals](../../../Pasted%20image%2020260524211114.png)

---

### 4.8 Middleware global d'errors observable

Crear fitxer: `src/middleware/errorHandler.js`

```javascript
const errorHandler = (err, req, res, next) => {
  req.log.error({
    requestId: req.requestId,
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? undefined : err.stack
  }, 'Unhandled error');

  res.status(err.statusCode || 500).json({
    message: err.message || 'Error intern del servidor',
    requestId: req.requestId
  });
};
module.exports = errorHandler;
```

Afegir al final de `src/server.js`:

```javascript
const errorHandler = require('./middleware/errorHandler');
app.use(errorHandler);
```

**Important:** El middleware d'errors sempre ha d'anar **després** de les rutes.

![Error handler](../../../Pasted%20image%2020260524211144.png)

---

### 4.9 Endpoint de salut: health check

Crear ruta: `src/routes/healthRoutes.js`

```javascript
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

router.get('/health', (req, res) => {
  const mongoStatus = mongoose.connection.readyState;
  res.json({
    status: 'ok',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    database: mongoStatus === 1 ? 'connected' : 'disconnected'
  });
});
module.exports = router;
```

Afegir a `server.js`:

```javascript
const healthRoutes = require('./routes/healthRoutes');
app.use('/api', healthRoutes);
```

Provar: `GET /api/health`

Resposta esperada:

```json
{
  "status": "ok",
  "uptime": 245.23,
  "timestamp": "2025-10-XXT10:20:00.000Z",
  "database": "connected"
}
```

![Health check](../../../Pasted%20image%2020260524211610.png)
![Health check resposta](../../../Pasted%20image%2020260524211634.png)

---

### 4.10 Mètriques bàsiques

Crear endpoint: `GET /api/metrics`

Aquest endpoint servirà per mostrar mètriques senzilles del procés Node.

Afegir a `healthRoutes.js`:

```javascript
router.get('/metrics', (req, res) => {
  const memoryUsage = process.memoryUsage();
  res.json({
    uptime: process.uptime(),
    memory: {
      rss: memoryUsage.rss,
      heapTotal: memoryUsage.heapTotal,
      heapUsed: memoryUsage.heapUsed,
      external: memoryUsage.external
    },
    cpu: process.cpuUsage(),
    nodeVersion: process.version,
    environment: process.env.NODE_ENV
  });
});
```

Resposta exemple:

```json
{
  "uptime": 350.42,
  "memory": {
    "rss": 73682944,
    "heapTotal": 24117248,
    "heapUsed": 18942448,
    "external": 2083781
  },
  "nodeVersion": "v20.11.0",
  "environment": "development"
}
```

![Mètriques](../../../Pasted%20image%2020260524212038.png)

---

### 4.11 Protegir /metrics

L'endpoint `/metrics` no hauria de ser públic en producció.

Opció simple amb RBAC:

```javascript
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

router.get(
  '/metrics',
  authMiddleware,
  roleMiddleware('admin'),
  (req, res) => {
    const memoryUsage = process.memoryUsage();
    res.json({
      uptime: process.uptime(),
      memory: memoryUsage,
      cpu: process.cpuUsage(),
      nodeVersion: process.version,
      environment: process.env.NODE_ENV
    });
  }
);
```

**Bones pràctiques:**

- `/health` pot ser públic o semipúblic
- `/metrics` ha d'estar protegit
- No exposar secrets
- No retornar variables d'entorn sensibles

![Metrics protegit](../../../Pasted%20image%2020260524212131.png)

---

### 4.12 Logging d'autenticació

Afegir logs als endpoints d'auth.

Login correcte:

```javascript
req.log.info({
  userId: user._id,
  email: user.email
}, 'User logged in successfully');
```

Login incorrecte:

```javascript
req.log.warn({
  email
}, 'Invalid login attempt');
```

Logout:

```javascript
req.log.info({
  userId: req.user.userId
}, 'User logged out');
```

**No s'ha de loguejar mai:**

- contrasenyes
- tokens JWT
- refresh tokens
- dades bancàries
- secrets
- targetes de crèdit

---

### 4.13 Logging de checkout i pagaments

En el checkout interessa registrar:

- creació de comanda
- inici de sessió Stripe
- pagament confirmat
- pagament fallit
- cancel·lació

Exemple:

```javascript
req.log.info({
  orderId: order._id,
  userId: req.user.userId,
  total: order.total
}, 'Order created');
```

Error de pagament:

```javascript
req.log.error({
  orderId,
  userId: req.user.userId,
  error: error.message
}, 'Payment failed');
```

**Mai registrar:**

- número de targeta
- CVC
- dades sensibles de Stripe
- tokens complets

![Logging checkout](../../../Pasted%20image%2020260524212228.png)
![Checkout pagament](../../../Pasted%20image%2020260524212241.png)

---

### 4.14 Simulació d'error per comprovar observabilitat

Crear endpoint temporal:

```javascript
app.get('/api/debug/error', (req, res, next) => {
  next(new Error('Error de prova per observabilitat'));
});
```

Provar: `GET /api/debug/error`

Resposta:

```json
{
  "message": "Error de prova per observabilitat",
  "requestId": "..."
}
```

Al terminal s'hauria de veure el log amb el mateix requestId.

> **Aquest endpoint s'ha d'eliminar abans de producció.**

![Error de prova](../../../Pasted%20image%2020260524212326.png)
![Error log](../../../Pasted%20image%2020260524212349.png)

---

## Estructura recomanada

```
src
├── config
│   └── logger.js
├── middleware
│   ├── requestId.js
│   ├── httpLogger.js
│   └── errorHandler.js
├── routes
│   └── healthRoutes.js
└── server.js

docs
└── incidents
    └── example-incident.md
```

## Lliurable de la Sessió 20

PDF amb totes les explicacions i link a GitHub.

---

## Referències

- [Pino](https://getpino.io/#/)
- [pino-http](https://github.com/pinojs/pino-http)
- [Express error handling](https://expressjs.com/en/guide/error-handling.html)
- [Node.js process.memoryUsage](https://nodejs.org/api/process.html#processmemoryusage)
- [OWASP Logging Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheet)
