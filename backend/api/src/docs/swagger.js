const swaggerJSDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "E-commerce API",
      version: "1.0.0",
      description: "Documentació de l'API del projecte e-commerce",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        User: {
          type: "object",
          properties: {
            id: { type: "string", description: "ID del usuario" },
            first_name: { type: "string", description: "Nombre del usuario" },
            last_name: { type: "string", description: "Apellido del usuario" },
            username: { type: "string", description: "Nombre de usuario" },
            email: { type: "string", format: "email", description: "Correo electrónico" },
            birthdate: { type: "string", format: "date", description: "Fecha de nacimiento" },
            phone_number: { type: "string", description: "Número de teléfono" },
            avatar: { type: "string", description: "URL del avatar" },
            role: { type: "string", enum: ["user", "admin"], description: "Rol del usuario" },
            isActive: { type: "boolean", description: "Estado del usuario" },
          },
        },
        AuthTokens: {
          type: "object",
          properties: {
            accessToken: { type: "string", description: "Token de acceso JWT (15 min)" },
            refreshToken: { type: "string", description: "Token de refresh JWT (7 días)" },
          },
        },
        AuthResponse: {
          type: "object",
          properties: {
            status: { type: "string", example: "success" },
            data: {
              type: "object",
              properties: {
                accessToken: { type: "string" },
                refreshToken: { type: "string" },
                user: { $ref: "#/components/schemas/User" },
              },
            },
          },
        },
        ErrorResponse: {
          type: "object",
          properties: {
            status: { type: "string", example: "error" },
            message: { type: "string", description: "Descripción del error" },
          },
        },
        Pagination: {
          type: "object",
          properties: {
            total: { type: "integer", description: "Total de items" },
            page: { type: "integer", description: "Página actual" },
            limit: { type: "integer", description: "Items por página" },
            totalPages: { type: "integer", description: "Total de páginas" },
            hasNextPage: { type: "boolean" },
            hasPrevPage: { type: "boolean" },
          },
        },
        Book: {
          type: "object",
          properties: {
            isbn: { type: "string", description: "ISBN único del libro" },
            name: { type: "string", description: "Título del libro" },
            description: { type: "string", description: "Descripción del libro" },
            price: { type: "number", description: "Precio del libro" },
            unit_stock: { type: "integer", description: "Unidades en stock" },
            language: { type: "string", enum: ["es", "en", "jp", "fr", "de", "it", "pt", "zh", "ko", "ru"], description: "Idioma" },
            type_book: { type: "string", enum: ["digital", "fisico"], description: "Tipo de libro" },
            publisher: { type: "string", description: "ID de la editorial" },
            authors: { type: "array", items: { type: "string" }, description: "IDs de autores" },
            categories: { type: "array", items: { type: "string" }, description: "IDs de categorías" },
            image: { type: "string", description: "URL de la imagen" },
            featured: { type: "boolean", description: "Libro destacado" },
            averageRating: { type: "number", description: "Promedio de reseñas" },
            totalReviews: { type: "integer", description: "Total de reseñas" },
            isActive: { type: "boolean", description: "Estado activo" },
          },
        },
        BookListResponse: {
          type: "object",
          properties: {
            status: { type: "string", example: "success" },
            data: { type: "array", items: { $ref: "#/components/schemas/Book" } },
            pagination: { $ref: "#/components/schemas/Pagination" },
          },
        },
        Author: {
          type: "object",
          properties: {
            id: { type: "string", description: "ID del autor" },
            name: { type: "string", description: "Nombre del autor" },
            slug: { type: "string", description: "Slug URL-friendly" },
            biography: { type: "string", description: "Biografía del autor" },
            nationality: { type: "string", description: "Nacionalidad" },
            photo: { type: "string", description: "URL de la foto" },
            isActive: { type: "boolean", description: "Estado activo" },
          },
        },
        Category: {
          type: "object",
          properties: {
            id: { type: "string", description: "ID de la categoría" },
            name: { type: "string", description: "Nombre de la categoría" },
            slug: { type: "string", description: "Slug URL-friendly" },
            description: { type: "string", description: "Descripción" },
            image: { type: "string", description: "URL de la imagen" },
            isActive: { type: "boolean", description: "Estado activo" },
          },
        },
        Publisher: {
          type: "object",
          properties: {
            id: { type: "string", description: "ID de la editorial" },
            name: { type: "string", description: "Nombre de la editorial" },
            country: { type: "string", description: "País" },
            website: { type: "string", description: "Sitio web" },
            active: { type: "boolean", description: "Estado activo" },
          },
        },
        OrderItem: {
          type: "object",
          properties: {
            book: { type: "string", description: "ID del libro" },
            title: { type: "string", description: "Título del libro" },
            quantity: { type: "integer", description: "Cantidad" },
            price: { type: "number", description: "Precio unitario" },
          },
        },
        Order: {
          type: "object",
          properties: {
            id: { type: "string", description: "ID del pedido" },
            order_code: { type: "string", description: "Código del pedido" },
            user: { type: "string", description: "ID del usuario" },
            items: { type: "array", items: { $ref: "#/components/schemas/OrderItem" } },
            total_price: { type: "number", description: "Precio total" },
            status: { type: "string", enum: ["Pending", "Paid", "Shipped", "Delivered", "Cancelled"], description: "Estado del pedido" },
            shippingAddress: {
              type: "object",
              properties: {
                street: { type: "string" },
                city: { type: "string" },
                zipcode: { type: "string" },
                country: { type: "string" },
              },
            },
          },
        },
        Review: {
          type: "object",
          properties: {
            id: { type: "string", description: "ID de la reseña" },
            rating: { type: "integer", minimum: 1, maximum: 5, description: "Puntuación (1-5)" },
            comment: { type: "string", description: "Comentario" },
            book: { type: "string", description: "ID del libro" },
            user: { type: "string", description: "ID del usuario" },
            verified_purchase: { type: "boolean", description: "Compra verificada" },
            isActive: { type: "boolean", description: "Estado activo" },
          },
        },
        WishlistItem: {
          type: "object",
          properties: {
            id: { type: "string", description: "ID del item" },
            user: { type: "string", description: "ID del usuario" },
            book: { $ref: "#/components/schemas/Book" },
            addedAt: { type: "string", format: "date-time", description: "Fecha de añadir" },
          },
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./src/routes/*.js"],
};
const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;
