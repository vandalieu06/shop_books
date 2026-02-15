# AGENTS.md - Frontend

## Stack
- React 19
- Vite 7
- React Router 7
- Tailwind CSS 4
- Lucide React (iconos)

## Estructura de Carpetas

```
src/
├── api/                    # Clientes API
│   ├── client.js          # ApiClient base con auth
│   ├── books.js          # Endpoints de libros
│   └── auth.js           # Endpoints de autenticación
├── components/
│   ├── Home/             # Componentes de homepage
│   │   ├── Hero.jsx
│   │   ├── FeaturedBooks.jsx
│   │   ├── Categories.jsx
│   │   ├── Features.jsx
│   │   └── Newsletter.jsx
│   └── ui/               # Componentes globales
│       ├── Header.jsx
│       └── Footer.jsx
├── contexts/              # Contextos React
│   ├── AuthContext.jsx    # Autenticación
│   ├── CartContext.jsx    # Carrito de compras
│   ├── authHooks.js      # Hooks de auth
│   └── cartHooks.js      # Hooks de cart
├── data/                  # Datos estáticos
│   ├── categories.js
│   └── books.js
├── hooks/                 # Custom hooks
│   ├── useBooks.js       # Fetch libros (useBooks, useBookById, useSearchBooks)
│   ├── useProducts.js    # Fetch + filtros (useProducts, useProductFilters)
│   └── useLocalStorage.js
├── pages/                 # Páginas
│   ├── Home.jsx
│   ├── Products.jsx
│   ├── ProductDetail.jsx
│   ├── Login.jsx
│   └── Register.jsx
├── App.jsx               # Router principal
└── main.jsx              # Entry point
```

## Convenciones

### Naming
- Componentes: PascalCase (`FeaturedBooks.jsx`, `Header.jsx`)
- Hooks: camelCase con prefijo `use` (`useBooks.js`, `useProducts.js`)
- Estilos: Clases Tailwind CSS inline

### Patrones

#### Fetch de datos
```javascript
// hooks/useBooks.js
const { books, loading, error, refetch } = useBooks();

// hooks/useProducts.js
const { products, loading, error } = useProducts();
const { filters, updateFilter, filteredProducts, categories } = useProductFilters(products);
```

#### Transformación de datos del backend
El backend devuelve autores y categorías como objetos con `_id` y `name`. El frontend transforma:

```javascript
const transformBook = (book) => ({
  ...book,
  authors: book.authors?.map(a => a.name) || [],
  category: book.categories?.[0]?.name || '',
  image: book.image || `https://images.placeholders.dev/?width=400&height=600&text=${encodeURIComponent(book.name)}`,
});
```

#### Carrito (localStorage)
```javascript
const { cartItems, addToCart, updateQuantity, removeItem } = useCart();
```

#### Autenticación
```javascript
const { user, isAuthenticated, login, register, logout } = useAuth();
```

## API Client

### Configuración
- Base URL: `VITE_API_URL` (default: `http://localhost:3000/api`)
- Token: Automático en localStorage (`auth_token`)
- Content-Type: JSON

### Métodos
```javascript
import { booksApi, authApi } from './api';

// Books
booksApi.getAll()                    // GET /books
booksApi.getById(isbn)              // GET /books/:isbn
booksApi.search(query)               // GET /books/search?q=
booksApi.getByCategory(category)     // GET /books?category=
booksApi.getFeatured()               // GET /books/featured

// Auth
authApi.login(credentials)           // POST /auth/login
authApi.register(userData)           // POST /auth/register
authApi.logout()                     // POST /auth/logout
authApi.me()                         // GET /auth/me
authApi.refreshToken()               // POST /auth/refresh
```

## Hooks Principales

### useBooks
```javascript
// Obtener todos los libros
const { books, loading, error, refetch } = useBooks();

// Obtener libro por ISBN
const { book, loading, error } = useBookById(isbn);

// Buscar libros
const { results, loading, error, search } = useSearchBooks(query);
```

### useProducts
```javascript
// Fetch productos
const { products, loading, error } = useProducts();

// Filtros
const { 
  filters,              // { search, category, priceRange, sortBy, typeBook }
  updateFilter,        // (key, value) => void
  resetFilters,        // () => void
  filteredProducts,    // productos filtrados
  categories,          // categorías únicas
  typeBooks,           // tipos de libro
  priceRange           // [min, max]
} = useProductFilters(products);
```

### useCart
```javascript
const { 
  cartItems,           // [{ id, title, price, quantity, image }]
  isCartOpen,          // boolean
  setIsCartOpen,       // (boolean) => void
  addToCart,           // (book, openCart?) => void
  updateQuantity,      // (id, delta) => void
  removeItem           // (id) => void
} = useCart();
```

### useAuth
```javascript
const { 
  user,                // objeto usuario
  isAuthenticated,    // boolean
  loading,            // boolean
  error,              // string | null
  login,              // (email, password) => Promise
  register,           // (userData) => Promise
  logout,             // () => void
  clearError          // () => void
} = useAuth();
```

## Página Inicial (Home)

### Componentes actuales
1. **Hero** - Banner con búsqueda y botones CTA
2. **Features** - Iconos de beneficios (envío, etc.)
3. **Categories** - Grid de categorías (estático)
4. **FeaturedBooks** - Libros destacados
5. **Newsletter** - Formulario de suscripción

### Pendientes / Mejoras
- [ ] FeaturedBooks debe usar endpoint `/books/featured` o filtrar por `featured: true`
- [ ] Categories debe obtener datos de `/api/categories` en lugar de datos estáticos
- [ ] Mostrar rating con estrellas en los libros (usar `book.averageRating`)
- [ ] Añadir link a `/products/:isbn` en las cards de libros

## Imágenes

El backend devuelve `book.image`. Si es null, usar fallback:

```javascript
const fallbackImage = `https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop`;
// O
const fallbackImage = `https://images.placeholders.dev/?width=400&height=600&text=${encodeURIComponent(book.name)}`;
```

## Rutas

```javascript
/                       // Home
/products               // Catálogo con filtros
/products/:isbn         // Detalle de producto
/login                  // Login
/register               // Registro
```

## Ejemplo de Componente con Fetch

```javascript
import { useState, useEffect } from 'react';
import { booksApi } from '../api';

const MiComponente = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    booksApi.getFeatured()
      .then(res => setBooks(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Cargando...</div>;

  return (
    <div>
      {books.map(book => (
        <div key={book.isbn}>{book.name}</div>
      ))}
    </div>
  );
};
```

## Build y Desarrollo

```bash
# Desarrollo
cd frontend
pnpm dev

# Build producción
pnpm build

# Preview producción
pnpm preview

# Lint
pnpm lint
```

## Environment Variables

```bash
VITE_API_URL=http://localhost:3000/api
```
