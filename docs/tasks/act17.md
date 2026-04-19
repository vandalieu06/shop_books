# Informe Técnico - Session de Desarrollo

**Fecha:** 19 de Abril 2026  
**Proyecto:** Shop Books (E-commerce)

---

## 1. Checkout - Fases de Implementación

### Fase 1: Páginas de Checkout

| Archivo | Descripción |
|---------|-------------|
| `frontend/src/pages/Cart.jsx` | Página dedicada del carrito |
| `frontend/src/pages/Checkout.jsx` | Checkout con dirección de envío |
| `frontend/src/pages/CheckoutSuccess.jsx` | Página de éxito |
| `frontend/src/pages/CheckoutCancel.jsx` | Página de cancelación |
| `frontend/src/main.jsx` | Rutas registradas |

**Rutas implementadas:**
- `/cart` - Carrito dedicado
- `/checkout` - Datos de envío
- `/checkout/success` - Confirmación
- `/checkout/cancel` - Cancelación

### Fase 2: Validación de Stock

**Backend - `orderService.js`:**
```javascript
const validateStock = async (items) => {
  // Valida stock disponible para cada item
  // Lanza error si stock insuficiente
};
```

- Valida stock antes de crear orden
- Obtiene precio/título desde DB
- Envía solo ISBN + quantity desde frontend

### Fase 3: Flujo de Pago

- `CheckoutPayment.jsx` crea sesión Stripe
- Valida errores de stock y muestra mensajes legibles
- Loading spinner durante procesamiento

---

## 2. Páginas de Órdenes

### Archivos creados

| Archivo | Descripción |
|---------|-------------|
| `frontend/src/pages/Orders.jsx` | Lista de órdenes del usuario |
| `frontend/src/pages/OrderDetail.jsx` | Detalle de una orden |

**Funcionalidades:**
- Lista pedidos ordenados por fecha (más recientes primero)
- Muestra código, estado (colores), fecha, items, total
- Botón "Cancel order" si estado es "Pending"
- Vista detallada con items y dirección de envío

### Backend - `orderService.js`

```javascript
const getAllByUser = async (userId, page = 1, limit = 20) => {
  return await buildPaginationResponse(
    Order, query, page, limit,
    { path: "items.book", select: "name image price" },
    { createdAt: -1 }  // Orden: más recientes primero
  );
};
```

---

## 3. Integración Stripe

### Backend

| Archivo | Descripción |
|---------|-------------|
| `services/checkoutService.js` | Crea sesión Stripe, crea orden desde webhook |
| `controllers/checkoutController.js` | Endpoints API |
| `routes/checkoutRouter.js` | Rutas `/create-session` y `/webhook` |

**Endpoints:**

```
POST /api/checkout/create-session
  - Requiere: items [{ book: isbn, quantity }]
  - Devuelve: { sessionId, url }

POST /api/checkout/webhook
  - Verifica signature de Stripe
  - Crea orden con status: "Paid"
```

### Frontend

**`Checkout.jsx`:**
```javascript
const handleProceedToPayment = async () => {
  const response = await checkoutApi.createSession(items);
  const { url } = response.data;
  window.location.href = url;  // Redirige a Stripe
};
```

**Flujo completo:**
```
/cart → /checkout (dirección) → Stripe Checkout → /checkout/success
```

---

## 4. Correcciones y Mejoras

### Error: "Maximum update depth exceeded"

**Causa:** `clearCart` en `useEffect` causaba bucle infinito

**Solución:**
- Envolver funciones del contexto con `useCallback`
- Usar `useRef` + acceso directo a localStorage en CheckoutSuccess

### Error: Seed fallando con idioma "jp"

**Causa:** Índice text de MongoDB no soporta "jp"

**Solución:**
- Cambiar enum a "ja" (código ISO correcto)
- Mantener el libro en español para evitar problemas

---

## 5. Archivos Modificados

### Backend
- `src/services/orderService.js` - validateStock, generateOrderCode export
- `src/services/checkoutService.js` - Stripe integration
- `src/controllers/checkoutController.js` - Webhook handler
- `src/routes/checkoutRouter.js` - Rutas checkout
- `src/server.js` - Registro de rutas, raw body para webhook
- `src/models/bookScheme.js` - Enum de idiomas
- `src/utils/pagination.js` - Soporte para sort

### Frontend
- `src/pages/Cart.jsx` - Nueva página
- `src/pages/Checkout.jsx` - Integración Stripe
- `src/pages/CheckoutSuccess.jsx` - Limpia carrito
- `src/pages/CheckoutCancel.jsx` - Nueva página
- `src/pages/Orders.jsx` - Nueva página
- `src/pages/OrderDetail.jsx` - Nueva página
- `src/contexts/CartContext.jsx` - clearCart con useCallback
- `src/api/orders.js` - checkoutApi export
- `src/api/index.js` - Export checkoutApi
- `src/main.jsx` - Rutas registradas

---

## 6. Variables de Entorno

### Backend (.env)
```
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
FRONTEND_URL=http://localhost:5173
```

### Frontend (.env)
```
VITE_STRIPE_PUBLIC_KEY=pk_test_...
```

---

## 7. Pendientes / Mejoras Futuras

- [ ] Guardar shippingAddress en la orden (actualmente vacío)
- [ ] Validar stock en tiempo real antes de crear sesión Stripe
- [ ] Webhook debe actualizar stock de libros tras pago exitoso
- [ ] Integrar Stripe Connect para pagos reales
- [ ] Envío de email de confirmación
