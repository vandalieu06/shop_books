# Act 17

Repo: https://github.com/vandalieu06/shop_books.git

## 4.1 Flux de checkout (frontend)
Implementar el flux:
1. Carret
2. Dades d’enviament
3. Resum comanda
4. Pagament

**Pantalles mínimes:**
● /cart
● /checkout
● /checkout/success
● /checkout/cancel

**Validacions:**
● Carret no buit
● Camps obligatoris (nom, adreça, etc.)
● Stock disponible

## 4.2 Creació de comanda al backend
**Endpoint:**
POST /api/orders

**Funcionalitat:**
Crear comanda mínim amb:
- usuari
- productes
- total
- estat = "pending"

**Exemple:**
```javascript
const order = new Order({
  user: req.user.userId,
  products,
  total,
  status: "pending"
});
```

## 4.3 Integració amb Stripe (backend)
**Instal·lar:**
`npm install stripe`

**Crear endpoint:**
POST /api/checkout/create-session

**Exemple:**
```javascript
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const session = await stripe.checkout.sessions.create({
  payment_method_types: ['card'],
  line_items: products.map(p => ({
    price_data: {
      currency: 'eur',
      product_data: {
        name: p.name
      },
      unit_amount: p.price * 100
    },
    quantity: p.quantity
  })),
  mode: 'payment',
  success_url: 'http://localhost:5173/checkout/success',
  cancel_url: 'http://localhost:5173/checkout/cancel'
});
```

**Retornar:**
`session.id`

## 4.4 Integració amb Stripe (frontend)
**Instal·lar:**
`npm install @stripe/stripe-js`

**Redirigir a Stripe:**
```javascript
const stripe = await loadStripe("PUBLIC_KEY");
await stripe.redirectToCheckout({
  sessionId: sessionId
});
```

## 4.5 Confirmació de pagament (Webhook)
**Crear endpoint:**
POST /api/checkout/webhook

**Funció:**
- Stripe notifica el pagament
- Actualitzar comanda:
  `status = "paid"`

**Important:**
- Validar signature de Stripe
- No confiar només en frontend

## 4.6 Validacions i gestió d’errors
**Validar:**
- Productes existeixen
- Preus correctes (no confiar en frontend)
- Stock disponible

**Errors comuns:**
- Sessió Stripe fallida
- Pagament cancel·lat
- Timeout

**Resposta backend:**
`res.status(400).json({ message: "Error en el pagament" });`

## 4.7 Sandbox i test de pagaments
**Utilitzar targetes de test de Stripe:**
`4242 4242 4242 4242`

**Altres casos:**
- Error pagament
- Targeta rebutjada
```
