# Librería Akiba - アキバ書店

![React](https://img.shields.io/badge/React-19-61DAFB?style=flat&logo=react)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?style=flat&logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?style=flat&logo=tailwind-css)
![Node.js](https://img.shields.io/badge/Node.js-22-339933?style=flat&logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-7-47A248?style=flat&logo=mongodb)
![Docker](https://img.shields.io/badge/Docker-24249CE?style=flat&logo=docker)

> Tienda online de libros construida con un enfoque moderno, escalable y centrado en la experiencia del usuario.

- **Dominio**: [libreríaakiba.com](https://libreríaakiba.com)
- **Plataforma**: Docker y Podman (Containerized)

## Tabla de Contenidos

- [Características](#características)
- [Stack Tecnológico](#stack-tecnológico)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Requisitos Previos](#requisitos-previos)
- [Instalación](#instalación)
- [Variables de Entorno](#variables-de-entorno)
- [Scripts Disponibles](#scripts-disponibles)
- [API REST](#api-rest)
- [Contribuir](#contribuir)
- [Licencia](#licencia)

## Características

- Catálogo de productos dinámico con búsqueda y filtros
- Carrito de compras persistente
- Sistema de autenticación de usuarios
- Panel de administración para gestión de productos
- Diseño responsivo y accesible
- Optimizado para SEO

## Stack Tecnológico

### Frontend

| Tecnología | Propósito |
|-------------|-----------|
| React 19 | Biblioteca de interfaces de usuario |
| Vite 7 | Build tool y servidor de desarrollo |
| React Router 7 | Enrutamiento del lado del cliente |
| Tailwind CSS 4 | Framework de estilos utility-first |

### Backend

| Tecnología | Propósito |
|-------------|-----------|
| Node.js 22 | Entorno de ejecución JavaScript |
| Express.js | Framework para APIs REST |
| Mongoose | ODM para MongoDB |

### Infraestructura

| Tecnología | Propósito |
|-------------|-----------|
| Docker | Containerización |
| Docker Compose | Orquestación de contenedores |
| MongoDB | Base de datos documental |

## Estructura del Proyecto

```
shop_books/
├── docker-compose.dev.yaml     # Compose desarrollo
├── docker-compose.prod.yaml    # Compose producción
├── backend/                    # API REST - Node.js + Express
│   └── api/
│       ├── src/               # Código fuente
│       ├── Dockerfile         # imagen multi-stage
│       └── .env               # Variables (ignoradas en git)
├── frontend/                   # Aplicación React + Vite
│   ├── src/
│   ├── Dockerfile
│   ├── nginx.conf
│   └── .env
└── README.md
```

## Requisitos Previos

- Node.js >= 22.x
- Docker >= 24.x
- Docker Compose >= 2.x
- Git

## Instalación

```bash
# Clonar el repositorio
git clone https://github.com/tuusuario/shop_books.git
cd shop_books
```

### Desarrollo

```bash
# Iniciar servicios en segundo plano
docker compose -f docker-compose.dev.yaml up --build -d

# Los servicios estarán disponibles en:
# - Frontend: http://localhost:8080
# - Backend API: http://localhost:3000/api
# - MongoDB: mongodb://localhost:27017
```

### Producción

```bash
# Copiar variables de entorno de producción
cp docker/.env.prod.example .env.prod

# Iniciar servicios en segundo plano
docker compose -f docker-compose.prod.yaml --env-file .env.prod up --build -d
```

### Comandos de Docker

```bash
# Desarrollo
docker compose -f docker-compose.dev.yaml up --build -d      # Iniciar
docker compose -f docker-compose.dev.yaml down                # Detener
docker compose -f docker-compose.dev.yaml logs -f            # Ver logs
docker compose -f docker-compose.dev.yaml down -v            # Detener + eliminar volúmenes

# Producción
docker compose -f docker-compose.prod.yaml --env-file .env.prod up --build -d
docker compose -f docker-compose.prod.yaml --env-file .env.prod down
docker compose -f docker-compose.prod.yaml --env-file .env.prod logs -f
```

## Variables de Entorno

### Desarrollo

**Archivo:** `.env`

```env
MONGO_ROOT_USERNAME=admin
MONGO_ROOT_PASSWORD=admin
```

### Producción

**Archivo:** `.env.prod`

```env
MONGO_ROOT_USERNAME=admin
MONGO_ROOT_PASSWORD=<password-seguro>
```

### Backend API

**Archivo:** `backend/api/.env` (autogenerado por el seed en producción)

```env
PORT=3000
MONGO_URI=mongodb://admin:admin@mongodb:27017/ecommerce?authSource=admin
JWT_SECURE_KEY=<generado-automaticamente>
JWT_REFRESH_KEY=<generado-automaticamente>
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
FRONTEND_URL=http://localhost:8080
```

> **Nota:** En desarrollo, el seed poblará la base de datos automáticamente al iniciar si está vacía.

### Frontend

**Archivo:** `frontend/.env`

```env
VITE_API_URL=http://localhost:3000/api
VITE_STRIPE_PUBLIC_KEY=pk_test_...
```

## Scripts Disponibles

### Root

| Comando | Descripción |
|---------|-------------|
| `make up` | Iniciar servicios |
| `make down` | Detener servicios |
| `make rebuild` | Reconstruir contenedores |

### Backend

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Iniciar en modo desarrollo |
| `npm run build` | Construir para producción |
| `npm start` | Iniciar en producción |
| `npm run lint` | Ejecutar linter |

### Frontend

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Iniciar servidor de desarrollo |
| `npm run build` | Construir aplicación |
| `npm run start` | Iniciar en producción |
| `npm run lint` | Verificar código |
| `npm run typecheck` | Verificar tipos |

## API REST

### Endpoints Principales

```
POST   /api/auth/register    # Registrar usuario
POST   /api/auth/login       # Iniciar sesión
GET    /api/products        # Listar productos
GET    /api/products/:id   # Obtener producto
POST   /api/products      # Crear producto (admin)
PUT    /api/products/:id   # Actualizar producto (admin)
DELETE /api/products/:id  # Eliminar producto (admin)
POST   /api/cart          # Agregar al carrito
GET    /api/cart          # Obtener carrito
```

> Consulta la documentación completa en `/api/docs` una vez iniciado el servidor.

## Herramientas de Desarrollo

| Herramienta | Propósito |
|-------------|-----------|
| [Hoppscotch](https://hoppscotch.io/) | Testing de API REST |
| [VSCode](https://code.visualstudio.com/) | Editor de código |
| [Draw.io](https://app.diagrams.net/) | Diagramas de arquitectura |
| [ADR Templates](https://github.com/joelparkerhenderson/architecture-decision-record) | Documentación arquitectónica |

## Contribuir

1. Fork el repositorio
2. Crea una rama feature (`git checkout -b feature/nueva-caracteristica`)
3. Commit tus cambios (`git commit -am 'Agregar nueva característica'`)
4. Push a la rama (`git push origin feature/nueva-caracteristica`)
5. Abre un Pull Request

## Licencia

MIT License - 见 LICENSE
