## 4. Feina durant la sessió i abans de la següent sessió

### 4.1 Instal·lació de dependències

Instal·lar les llibreries necessàries per a l’autenticació:

```bash
npm install jsonwebtoken bcryptjs
````

Aquestes llibreries serviran per:

* bcryptjs → xifrar contrasenyes
* jsonwebtoken → generar tokens JWT

### 4.2 Registre d’usuaris

Crear controlador `authController.js`.

**Endpoint:**
POST /api/auth/register

**Flux:**

1. Rebre dades de l’usuari.
2. Verificar que l’email no existeix.
3. Hashejar la contrasenya.
4. Guardar usuari a MongoDB.

### 4.3 Login amb JWT

**Endpoint:**

POST /api/auth/login

**Flux:**

1. Buscar usuari per email.
2. Comparar contrasenya amb bcrypt.
3. Generar access token.
4. Generar refresh token.

### 4.4 Refresh token

**Endpoint:**

POST /api/auth/refresh

Permet generar un nou access token sense tornar a fer login.

**Flux:**

1. L’usuari envía refresh token.
2. Es vàlida.
3. Es genera un nou access token.

### 4.5 Logout

**Endpoint:**
POST /api/auth/logout

**Opcions possibles:**

* eliminar refresh token de base de dades
* invalidar token

**Flux simple:**

1. Eliminar refresh token associat a l’usuari.

### 4.6 Middleware d’autenticació

Crear middleware: middleware/authMiddleware.js

### 4.7 RBAC (Role Based Access Control)

Els rols definits seran:

* client
* admin

Crear middleware:

middleware/roleMiddleware.js

**Exemple:**

```js
module.exports = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Accés prohibit" });
    }
    next();
  };
};
```

**Exemple d’ús:**
GET /api/products/admin

```js
router.get(
  '/admin',
  authMiddleware,
  roleMiddleware('admin'),
  controller
);
```

Només els admins poden accedir.
