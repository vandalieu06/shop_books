const express = require("express");
const router = express.Router();
const bookController = require("../controllers/bookController");

/**
 * @swagger
 * /api/books:
 *   get:
 *     summary: Obtener todos los libros
 *     tags: [Books]
 *     description: Lista libros con paginación y filtros. No requiere autenticación.
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Número de página
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 20
 *         description: Items por página
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filtrar por categoría (slug)
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *           enum: [fisico, digital]
 *         description: Filtrar por tipo de libro
 *       - in: query
 *         name: minPrice
 *         schema:
 *           type: number
 *         description: Precio mínimo
 *       - in: query
 *         name: maxPrice
 *         schema:
 *           type: number
 *         description: Precio máximo
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Búsqueda textual
 *       - in: query
 *         name: featured
 *         schema:
 *           type: boolean
 *         description: Solo libros destacados
 *     responses:
 *       200:
 *         description: Lista de libros
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/BookListResponse"
 *       400:
 *         description: Error en la solicitud
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorResponse"
 */

/**
 * @swagger
 * /api/books/search:
 *   get:
 *     summary: Buscar libros
 *     tags: [Books]
 *     description: Busca libros por título, autor o ISBN. Mínimo 2 caracteres.
 *     parameters:
 *       - in: query
 *         name: q
 *         required: true
 *         schema:
 *           type: string
 *         description: Término de búsqueda
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 20
 *     responses:
 *       200:
 *         description: Resultados de búsqueda
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/BookListResponse"
 *       400:
 *         description: Query muy corta
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorResponse"
 */

/**
 * @swagger
 * /api/books/featured:
 *   get:
 *     summary: Obtener libros destacados
 *     tags: [Books]
 *     description: Lista libros destacados. No requiere autenticación.
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 8
 *         description: Número de libros a retornar
 *     responses:
 *       200:
 *         description: Lista de libros destacados
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: "#/components/schemas/Book"
 */

/**
 * @swagger
 * /api/books/{isbn}:
 *   get:
 *     summary: Obtener un libro por ISBN
 *     tags: [Books]
 *     description: Retorna los detalles de un libro específico.
 *     parameters:
 *       - in: path
 *         name: isbn
 *         required: true
 *         schema:
 *           type: string
 *         description: ISBN del libro
 *     responses:
 *       200:
 *         description: Datos del libro
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 data:
 *                   $ref: "#/components/schemas/Book"
 *       404:
 *         description: Libro no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorResponse"
 */

/**
 * @swagger
 * /api/books/add:
 *   post:
 *     summary: Crear un nuevo libro
 *     tags: [Books]
 *     description: Crea un nuevo libro. Requiere autenticación de admin.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Book"
 *     responses:
 *       201:
 *         description: Libro creado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 data:
 *                   $ref: "#/components/schemas/Book"
 *       400:
 *         description: Error al crear libro
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorResponse"
 */

/**
 * @swagger
 * /api/books/{isbn}:
 *   put:
 *     summary: Actualizar un libro
 *     tags: [Books]
 *     description: Actualiza un libro por ISBN. Requiere autenticación de admin.
 *     parameters:
 *       - in: path
 *         name: isbn
 *         required: true
 *         schema:
 *           type: string
 *         description: ISBN del libro
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Book"
 *     responses:
 *       200:
 *         description: Libro actualizado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 data:
 *                   $ref: "#/components/schemas/Book"
 *       404:
 *         description: Libro no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorResponse"
 */

/**
 * @swagger
 * /api/books/{isbn}:
 *   delete:
 *     summary: Eliminar un libro
 *     tags: [Books]
 *     description: Elimina (soft delete) un libro por ISBN. Requiere autenticación de admin.
 *     parameters:
 *       - in: path
 *         name: isbn
 *         required: true
 *         schema:
 *           type: string
 *         description: ISBN del libro
 *     responses:
 *       200:
 *         description: Libro eliminado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 message:
 *                   type: string
 *                   example: "Libro eliminado"
 *       404:
 *         description: Libro no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorResponse"
 */

/**
 * @swagger
 * /api/books/add-many:
 *   post:
 *     summary: Crear múltiples libros
 *     tags: [Books]
 *     description: Crea varios libros a la vez. Requiere autenticación de admin.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               $ref: "#/components/schemas/Book"
 *     responses:
 *       201:
 *         description: Libros creados
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: "#/components/schemas/Book"
 *       400:
 *         description: Error al crear libros
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorResponse"
 */

router.get("/", bookController.getAllBooks);
router.get("/search", bookController.searchBooks);
router.get("/featured", bookController.getFeaturedBooks);
router.get("/:isbn", bookController.getBook);
router.post("/add", bookController.createBook);
router.put("/:isbn", bookController.updateBook);
router.delete("/:isbn", bookController.deleteBook);
router.post("/add-many", bookController.createManyBooks);

module.exports = router;
