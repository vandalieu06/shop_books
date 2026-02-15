# AGENTS.md - Backend API

## Stack
- Node.js + Express 5
- MongoDB + Mongoose
- JWT para autenticación
- Multer para uploads de imágenes

## Estructura de Carpetas

```
src/
├── config/           # Configuración de base de datos
├── controllers/      # Controladores (lógica de rutas API)
├── data/             # Datos seed/demo para poblar la DB
├── middleware/       # Middleware (auth.js, upload.js)
├── models/           # Esquemas Mongoose
├── routes/           # Rutas API
│   └── pages/        # Rutas legacy para vistas (Handlebars)
├── services/         # Lógica de negocio (separada de controladores)
├── utils/            # Utilidades (pagination.js, seed.js)
├── uploads/          # Imágenes subidas por usuarios
└── server.js         # Entry point de la aplicación
```

## Convenciones

### Naming
- Archivos: camelCase (`bookService.js`, `userController.js`)
- Rutas: plural (`/api/books`, `/api/authors`)
- Métodos: estándar REST (`GET`, `POST`, `PUT`, `DELETE`)

### Arquitectura
- **Controladores**: Reciben request/response, llaman a servicios
- **Servicios**: Lógica de negocio pura, sin HTTP
- **Modelos**: Esquemas Mongoose con validaciones básicas

### Respuestas API
```javascript
// Éxito
{ status: "success", data: [...] }

// Error
{ status: "error", message: "Descripción del error" }

// Con paginación
{ status: "success", data: [...], pagination: { total, page, limit, totalPages } }
```

## Endpoints API

### Autenticación
| Método | Endpoint | Auth | Descripción |
|--------|----------|------|-------------|
| POST | `/api/auth/login` | ❌ | Login (email, password) |
| POST | `/api/auth/register` | ❌ | Registro (first_name, last_name, email, password, username) |
| POST | `/api/auth/logout` | ✅ | Logout |
| GET | `/api/auth/me` | ✅ | Usuario actual |
| POST | `/api/auth/refresh` | ❌ | Refresh token |

### Libros
| Método | Endpoint | Auth | Descripción |
|--------|----------|------|-------------|
| GET | `/api/books` | ❌ | Lista con paginación y filtros |
| GET | `/api/books/featured` | ❌ | Libros destacados |
| GET | `/api/books/search?q=` | ❌ | Búsqueda por título/autor/isbn |
| GET | `/api/books/:isbn` | ❌ | Detalle de libro |
| POST | `/api/books/add` | ❌ | Crear libro |
| PUT | `/api/books/:isbn` | ❌ | Actualizar libro |
| DELETE | `/api/books/:isbn` | ❌ | Eliminar libro (soft delete) |

**Query Params para `/api/books`:**
- `page` - Página (default: 1)
- `limit` - Items por página (default: 20)
- `category` - Filtrar por categoría (slug)
- `type` - Filtrar por tipo (fisico/digital)
- `minPrice` - Precio mínimo
- `maxPrice` - Precio máximo
- `search` - Búsqueda textual
- `featured` - Solo destacados (true/false)

### Autores
| Método | Endpoint | Auth | Descripción |
|--------|----------|------|-------------|
| GET | `/api/authors` | ❌ | Lista con paginación |
| GET | `/api/authors/:id` | ❌ | Detalle de autor |
| POST | `/api/authors` | ❌ | Crear autor |
| PUT | `/api/authors/:id` | ❌ | Actualizar autor |
| DELETE | `/api/authors/:id` | ❌ | Eliminar autor (soft delete) |

### Categorías
| Método | Endpoint | Auth | Descripción |
|--------|----------|------|-------------|
| GET | `/api/categories` | ❌ | Lista con paginación |
| GET | `/api/categories/:id` | ❌ | Detalle de categoría |
| POST | `/api/categories` | ❌ | Crear categoría |
| PUT | `/api/categories/:id` | ❌ | Actualizar categoría |
| DELETE | `/api/categories/:id` | ❌ | Eliminar categoría (soft delete) |

### Editoriales
| Método | Endpoint | Auth | Descripción |
|--------|----------|------|-------------|
| GET | `/api/publishers` | ❌ | Lista con paginación |
| GET | `/api/publishers/:id` | ❌ | Detalle de editorial |
| POST | `/api/publishers` | ❌ | Crear editorial |
| PUT | `/api/publishers/:id` | ❌ | Actualizar editorial |
| DELETE | `/api/publishers/:id` | ❌ | Eliminar editorial (soft delete) |

### Pedidos
| Método | Endpoint | Auth | Descripción |
|--------|----------|------|-------------|
| GET | `/api/orders` | ✅ | Lista del usuario |
| GET | `/api/orders/:id` | ✅ | Detalle de pedido |
| POST | `/api/orders` | ✅ | Crear pedido |
| PUT | `/api/orders/:id/status` | ✅ | Actualizar estado |
| PUT | `/api/orders/:id/cancel` | ✅ | Cancelar pedido |

### Reseñas
| Método | Endpoint | Auth | Descripción |
|--------|----------|------|-------------|
| GET | `/api/reviews/book?bookId=` | ❌ | Reseñas de un libro |
| GET | `/api/reviews/my-reviews` | ✅ | Reseñas del usuario |
| POST | `/api/reviews` | ✅ | Crear reseña |
| PUT | `/api/reviews/:id` | ✅ | Actualizar reseña |
| DELETE | `/api/reviews/:id` | ✅ | Eliminar reseña |

### Wishlist
| Método | Endpoint | Auth | Descripción |
|--------|----------|------|-------------|
| GET | `/api/wishlist` | ✅ | Lista del usuario |
| POST | `/api/wishlist` | ✅ | Añadir libro |
| DELETE | `/api/wishlist/:bookId` | ✅ | Eliminar libro |
| GET | `/api/wishlist/check?bookId=` | ✅ | Verificar si está |

## Paginación

Todas las listas usan paginación con el siguiente formato:

```javascript
// Request
GET /api/books?page=2&limit=10

// Response
{
  "status": "success",
  "data": [...],
  "pagination": {
    "total": 50,
    "page": 2,
    "limit": 10,
    "totalPages": 5,
    "hasNextPage": true,
    "hasPrevPage": true
  }
}
```

## Autenticación

- JWT en header: `Authorization: Bearer <token>`
- Access token expira en 15 minutos
- Refresh token expira en 7 días
- Rutas protegidas usan middleware `authenticateToken`

## Seed

El seed se ejecuta automáticamente al iniciar el servidor si la base de datos está vacía. Para ejecutarlo manualmente:

```bash
cd backend/api
pnpm seed
```

## Modelos de Datos

### Book
```javascript
{
  isbn: String (unique, required),
  name: String (required),
  description: String,
  price: Number (required),
  unit_stock: Number,
  language: String (es/en/jp/fr/de/it/pt/zh/ko/ru),
  type_book: String (fisico/digital),
  publisher: ObjectId (ref: Publisher),
  authors: [ObjectId] (ref: Author),
  categories: [ObjectId] (ref: Category),
  image: String (URL),
  featured: Boolean,
  averageRating: Number,
  totalReviews: Number,
  isActive: Boolean
}
```

### User
```javascript
{
  first_name: String (required),
  last_name: String (required),
  username: String (unique, required),
  email: String (unique, required),
  password: String (hashed, required),
  birthdate: Date,
  phone_number: String,
  avatar: String,
  address: [{
    address_name: String,
    city: String,
    zipcode: String,
    country: String,
    isDefault: Boolean
  }],
  role: String (user/admin),
  isActive: Boolean,
  refreshToken: String
}
```

## Imágenes

- Multer configurado en `src/middleware/upload.js`
- Extensiones permitidas: jpeg, png, gif, webp
- Tamaño máximo: 5MB
- Se sirven desde `/uploads` (estático)
