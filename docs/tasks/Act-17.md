# Act 17 - Checkout Integration

Repo: https://github.com/vandalieu06/shop_books.git

## 4.1 Flux de checkout (frontend)
**Implementar el flux:**
1. Carret
2. Dades d'enviament
3. Resum comanda
4. Pagament

**Pantalles mínimes:**
- /cart → `frontend/src/pages/Cart.jsx`
- /checkout → `frontend/src/pages/Checkout.jsx`
- /checkout/success → `frontend/src/pages/CheckoutSuccess.jsx`
- /checkout/cancel → `frontend/src/pages/CheckoutCancel.jsx`

**Validacions:**
- Carret no buit → `frontend/src/pages/Cart.jsx:26-45`
- Camps obligatoris (nom, adreça, etc.) → `frontend/src/pages/Checkout.jsx:111-178`
- Stock disponible → `backend/api/src/services/checkoutService.js:20-22`

---

## 4.2 Creació de comanda al backend
**Endpoint:** `POST /api/orders`

**Funcionalitat:** Crear comanda mínim amb: usuari, productes, total, estat = "pending"

**Implementación:**
- Modelo Order: `backend/api/src/models/orderScheme.js:15-50`
- Schema fields: `backend/api/src/models/orderScheme.js:24-48`
  - user: `backend/api/src/models/orderScheme.js:24-28`
  - items: `backend/api/src/models/orderScheme.js:30`
  - total_price: `backend/api/src/models/orderScheme.js:31-35`
  - status: `backend/api/src/models/orderScheme.js:36-40`
- Controller: `backend/api/src/controllers/orderController.js`
- Route: `backend/api/src/routes/orderRouter.js`

---

## 4.3 Integració amb Stripe (backend)
**Instal·lar:** `npm install stripe`

**Crear endpoint:** `POST /api/checkout/create-session`

**Implementación:**
- Controller: `backend/api/src/controllers/checkoutController.js:37-61`
- Service: `backend/api/src/services/checkoutService.js:6-55`
- Stripe config: `backend/api/src/services/checkoutService.js:1`
- Route: `backend/api/src/routes/checkoutRouter.js:59`

**Retorna:** `session.id` y `url` → `backend/api/src/services/checkoutService.js:54`

---

## 4.4 Integració amb Stripe (frontend)
**Instal·lar:** `npm install @stripe/stripe-js`

**Redirigir a Stripe:**
```javascript
const stripe = await loadStripe("PUBLIC_KEY");
await stripe.redirectToCheckout({ sessionId });
```

**Implementación:**
- API client: `frontend/src/api/orders.js:10-12`
- Stripe load: `frontend/src/pages/Checkout.jsx:3,8-9`
- Redirect: `frontend/src/pages/Checkout.jsx:57-66`

---

## 4.5 Confirmació de pagament (Webhook)
**Crear endpoint:** `POST /api/checkout/webhook`

**Funció:** Stripe notifica el pagament → Actualitzar comanda: `status = "paid"`

**Important:**
- Validar signature de Stripe
- No confiar només en frontend

**Implementación:**
- Webhook endpoint: `backend/api/src/controllers/checkoutController.js:4-35`
- Signature validation: `backend/api/src/controllers/checkoutController.js:10`
- Create order from session: `backend/api/src/services/checkoutService.js:64-108`
- Update status to "Paid": `backend/api/src/services/checkoutService.js:102`

---

## 4.6 Validacions i gestió d'errors
**Validar:**
- Productes existeixen → `backend/api/src/services/checkoutService.js:16-18`
- Preus correctes (no confiar en frontend) → `backend/api/src/services/checkoutService.js:27-30`
- Stock disponible → `backend/api/src/services/checkoutService.js:20-22`

**Errors comuns:**
- Sessió Stripe fallida → `backend/api/src/controllers/checkoutController.js:88-91`
- Pagament cancel·lat → `backend/api/src/controllers/checkoutController.js:76-78`
- Timeout → `backend/api/src/controllers/checkoutController.js:23-26`

**Resposta backend:** `res.status(400).json({ message: "Error en el pagament" });`

**Implementación errores:**
- Validación producto: `backend/api/src/services/checkoutService.js:16-18`
- Validación stock: `backend/api/src/services/checkoutService.js:20-22`
- Validación precio: `backend/api/src/services/checkoutService.js:24-26`
- Handler errores controller: `backend/api/src/controllers/checkoutController.js:54-60,88-93`

---

## 4.7 Sandbox i test de pagaments
**Utilitzar targetes de test de Stripe:** `4242 4242 4242 4242`

**Altres casos:**
- Error pagament
- Targeta rebutjada

**Implementación:**
- Stripe test keys configuradas en variables de entorno
- Public key: `frontend/src/pages/Checkout.jsx:8`
- Secret key: `backend/api/src/controllers/checkoutController.js:1`
