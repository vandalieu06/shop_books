---
theme: seriph
background: https://cover.sli.dev
title: AkiraBooks
info: |
  ## AkiraBooks
  Librería Online — E-commerce

  Proyecto full-stack con Express + MongoDB + React
class: text-center
drawings:
  persist: false
transition: slide-left
comark: true
duration: 20min
---

# AkiraBooks

## Librería Online · E-commerce Full-Stack

Proyecto de tienda de libros con catálogo, carrito, pagos y panel admin

<div class="pt-12">
  <span @click="$slidev.nav.next" class="px-2 py-1 rounded cursor-pointer" hover="bg-white bg-opacity-10">
  Empecemos <carbon:arrow-right class="inline" />
  </span>
</div>

---
layout: two-cols
---

# ¿Qué es AkiraBooks?

Aplicación web de e-commerce para la venta de libros

::right::

<div v-click class="text-sm">

**Para clientes:**
- Catálogo con búsqueda y filtros
- Carrito de compras
- Checkout con Stripe
- Historial de pedidos
- Perfil de usuario

**Para administradores:**
- Panel con métricas y gráficas
- Gestión de pedidos
- Gestión de usuarios
- Control de stock

</div>

---
layout: center
---

# Stack Tecnológico

<div class="grid grid-cols-2 gap-8 mt-8">
<div>

### Backend
<v-clicks>

- **Node.js** + **Express 5**
- **MongoDB** + **Mongoose**
- **JWT** (access + refresh tokens)
- **Stripe** (pagos)
- **Swagger** (documentación API)
- **Pino** (logging)

</v-clicks>
</div>
<div>

### Frontend
<v-clicks>

- **React 19** + **Vite 7**
- **Tailwind CSS 4** + **shadcn/ui**
- **React Router** v7
- **Recharts** (gráficas admin)
- **Context API** (Auth + Cart)
- **Docker** + **Nginx**

</v-clicks>
</div>
</div>

---

# Arquitectura Backend

<div class="grid grid-cols-3 gap-4 mt-4 text-center text-sm">

<div class="border border-gray-400/30 rounded p-2">
  <div class="font-bold text-blue-400 mb-1">Routes</div>
  <div class="opacity-70">Definen endpoints<br/>y middleware</div>
</div>

<div class="border border-gray-400/30 rounded p-2">
  <div class="font-bold text-green-400 mb-1">Controllers</div>
  <div class="opacity-70">Manejan request/response<br/>HTTP</div>
</div>

<div class="border border-gray-400/30 rounded p-2">
  <div class="font-bold text-yellow-400 mb-1">Services</div>
  <div class="opacity-70">Lógica de negocio<br/>y BD</div>
</div>

</div>

```mermaid {scale: 0.6}
graph LR
  Client[Cliente] --> Routes
  subgraph Middleware
    Auth[JWT Auth]
    Role[Role Check]
    Logger[HTTP Logger]
  end
  Routes --> Auth
  Auth --> Role
  Role --> Logger
  Logger --> Controllers
  Controllers --> Services
  Services --> Models[(MongoDB)]
```

---

# Base de Datos

```mermaid {scale: 0.30}
erDiagram
  User ||--o{ Order : tiene
  User ||--o{ Review : escribe
  User ||--o{ Wishlist : guarda
  User ||--o| Cart : tiene
  Book ||--o{ OrderItem : incluye
  Book ||--o{ Review : recibe
  Book ||--o{ Wishlist : aparece
  Book }o--|| Author : escrito_por
  Book }o--|| Category : categorizado
  Book }o--|| Publisher : publicado_por

  User {
    string email PK
    string username
    string password
    string first_name
    string last_name
    string role "user | admin"
    string phone_number
    array address
    bool isActive
  }
  Book {
    string isbn PK
    string name
    string description
    number price
    number unit_stock
    string language
    string type_book "digital | fisico"
    string image
    number averageRating
    number totalReviews
    bool featured
  }
  Author {
    string name
    string slug
    string biography
    string nationality
  }
  Category {
    string name
    string slug
    string description
  }
  Publisher {
    string name
    string country
    string website
  }
  Order {
    string order_code PK
    string status "Pending | Paid | Shipped | Delivered | Cancelled"
    number total_price
    date date
    array items
  }
  Review {
    number rating "1-5"
    string comment
    date created_at
  }
  Cart {
    number totalItems
    array items
  }
```

---

# Features del Frontend

<div class="grid grid-cols-3 gap-6 mt-6">
<div v-click class="border border-gray-400/20 rounded-xl p-4 text-center bg-gray-800/20">
  <div class="text-3xl mb-2">📚</div>
  <div class="font-bold">Catálogo</div>
  <div class="text-xs opacity-70 mt-1">Búsqueda, filtros, vista grid/lista</div>
</div>
<div v-click class="border border-gray-400/20 rounded-xl p-4 text-center bg-gray-800/20">
  <div class="text-3xl mb-2">🛒</div>
  <div class="font-bold">Carrito</div>
  <div class="text-xs opacity-70 mt-1">Persistente en localStorage</div>
</div>
<div v-click class="border border-gray-400/20 rounded-xl p-4 text-center bg-gray-800/20">
  <div class="text-3xl mb-2">💳</div>
  <div class="font-bold">Pagos Stripe</div>
  <div class="text-xs opacity-70 mt-1">Checkout seguro integrado</div>
</div>
<div v-click class="border border-gray-400/20 rounded-xl p-4 text-center bg-gray-800/20">
  <div class="text-3xl mb-2">🔐</div>
  <div class="font-bold">Auth JWT</div>
  <div class="text-xs opacity-70 mt-1">Login/register con refresh tokens</div>
</div>
<div v-click class="border border-gray-400/20 rounded-xl p-4 text-center bg-gray-800/20">
  <div class="text-3xl mb-2">📊</div>
  <div class="font-bold">Panel Admin</div>
  <div class="text-xs opacity-70 mt-1">Métricas, pedidos, usuarios</div>
</div>
<div v-click class="border border-gray-400/20 rounded-xl p-4 text-center bg-gray-800/20">
  <div class="text-3xl mb-2">🐳</div>
  <div class="font-bold">Docker</div>
  <div class="text-xs opacity-70 mt-1">Multi-stage build + Nginx</div>
</div>
</div>

---
layout: center
class: text-center
---

# Demo en Vivo

<div class="text-6xl mb-6">🚀</div>

Veamos la aplicación funcionando

<div class="pt-4 text-sm opacity-60">
  http://localhost:8080
</div>

---
layout: center
class: text-center
---

# Gracias

<div class="text-sm opacity-60 mt-4">
  ¿Preguntas?
</div>
