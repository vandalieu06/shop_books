# Librería Akiba - アキバ書店

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat&logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?style=flat&logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-38B2AC?style=flat&logo=tailwind-css)
![Node.js](https://img.shields.io/badge/Node.js-22-339933?style=flat&logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-7-47A248?style=flat&logo=mongodb)
![Docker](https://img.shields.io/badge/Docker-24249CE?style=flat&logo=docker)

> Tienda online de libros construida con un enfoque moderno, escalable y centrado en la experiencia del usuario.

- **Dominio**: [libreríaakiba.com](https://libreríaakiba.com)
- **Plataforma**: Docker (Containerized)

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
| Next.js 15 | Framework React con Server Components |
| React 19 | Biblioteca de interfaces de usuario |
| Tailwind CSS | Framework de estilos utility-first |
| TypeScript | Tipado estático |

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
| MongoDB | Base de datos documental |

## Estructura del Proyecto

```
shop_books/
├── backend/               # API REST - Node.js + Express
│   ├── src/
│   │   ├── config/       # Configuraciones
│   │   ├── controllers/ # Lógica de negocio
│   │   ├── models/      # Modelos de datos
│   │   ├── routes/      # Rutas de API
│   │   └── middleware/  # Middlewares
│   └── package.json
├── frontend/             # Aplicación Next.js
│   ├── src/
│   │   ├── app/         # App Router
│   │   ├── components/ # Componentes React
│   │   ├── lib/        # Utilidades
│   │   └── styles/     # Estilos globales
│   └── package.json
├── docker-compose.yml    # Orquestación de contenedores
├── Makefile             # Scripts de automatización
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

# Iniciar los servicios con Docker
make up

# Los servicios estarán disponibles en:
# - Frontend: http://localhost:3000
# - Backend API: http://localhost:5000
# - MongoDB: mongodb://localhost:27017
```

### Comandos de Docker

```bash
make up     # Iniciar todos los servicios
make down  # Detener todos los servicios
make logs  # Ver logs en tiempo real
make rebuild # Reconstruir contenedores
```

## Variables de Entorno

### Backend (.env)

```env
PORT=5000
MONGO_URI=mongodb://mongo:27017/akiba
JWT_SECRET=tu_secret_aqui
NODE_ENV=development
```

### Frontend (.env.local)

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_APP_URL=http://localhost:3000
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
