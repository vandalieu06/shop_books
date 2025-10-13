# Aquí tienes una guía rápida de comandos básicos de MongoDB:

## Autenticación y Conexión

```bash
mongosh                                    # Conectar localmente
mongosh "mongodb://user:pass@host:27017"  # Conectar con credenciales
use admin                                  # Cambiar a base de datos
db.auth('user', 'password')               # Autenticarse
```

## Bases de Datos

```bash
show dbs                    # Listar todas las bases de datos
use nombre_db               # Crear/usar base de datos
db                          # Mostrar base de datos actual
db.dropDatabase()           # Eliminar base de datos actual
```

## Colecciones

```bash
show collections            # Listar colecciones
db.createCollection('nombre')  # Crear colección
db.nombre.drop()           # Eliminar colección
db.nombre.renameCollection('nuevo_nombre')  # Renombrar
```

## Crear (INSERT)

```bash
db.users.insertOne({name: "Juan", age: 25})
db.users.insertMany([
  {name: "Ana", age: 30},
  {name: "Luis", age: 22}
])
```

## Leer (FIND)

```bash
db.users.find()                          # Todos los documentos
db.users.find({age: 25})                 # Con filtro
db.users.find({age: {$gt: 20}})          # Mayor que 20
db.users.findOne({name: "Juan"})         # Un solo documento
db.users.find().limit(5)                 # Limitar resultados
db.users.find().sort({age: -1})          # Ordenar (-1 desc, 1 asc)
db.users.find({}, {name: 1, age: 1})     # Proyección (solo campos)
db.users.countDocuments()                # Contar documentos
```

## Actualizar (UPDATE)

```bash
db.users.updateOne(
  {name: "Juan"},                        # Filtro
  {$set: {age: 26}}                      # Actualización
)

db.users.updateMany(
  {age: {$lt: 25}},
  {$set: {status: "joven"}}
)

db.users.replaceOne(
  {name: "Juan"},
  {name: "Juan", age: 27, city: "Madrid"}  # Reemplaza todo
)
```

## Eliminar (DELETE)

```bash
db.users.deleteOne({name: "Juan"})       # Eliminar uno
db.users.deleteMany({age: {$lt: 20}})    # Eliminar varios
db.users.deleteMany({})                  # Eliminar todos (¡cuidado!)
```

## Operadores Comunes

| Operador | Descripción | Ejemplo |
|----------|-------------|---------|
| `$eq` | Igual a | `{age: {$eq: 25}}` |
| `$ne` | No igual a | `{age: {$ne: 25}}` |
| `$gt` | Mayor que | `{age: {$gt: 25}}` |
| `$gte` | Mayor o igual | `{age: {$gte: 25}}` |
| `$lt` | Menor que | `{age: {$lt: 25}}` |
| `$lte` | Menor o igual | `{age: {$lte: 25}}` |
| `$in` | En array | `{age: {$in: [20, 25, 30]}}` |
| `$nin` | No en array | `{age: {$nin: [20, 25]}}` |
| `$and` | Y lógico | `{$and: [{age: 25}, {name: "Juan"}]}` |
| `$or` | O lógico | `{$or: [{age: 25}, {age: 30}]}` |
| `$exists` | Campo existe | `{email: {$exists: true}}` |
| `$regex` | Expresión regular | `{name: {$regex: /^J/}}` |

## 🔧 Operadores de Actualización

| Operador | Descripción | Ejemplo |
|----------|-------------|---------|
| `$set` | Establecer valor | `{$set: {age: 26}}` |
| `$unset` | Eliminar campo | `{$unset: {age: ""}}` |
| `$inc` | Incrementar | `{$inc: {age: 1}}` |
| `$push` | Añadir a array | `{$push: {hobbies: "leer"}}` |
| `$pull` | Quitar de array | `{$pull: {hobbies: "leer"}}` |
| `$rename` | Renombrar campo | `{$rename: {age: "edad"}}` |

## Utilidades

```bash
db.users.stats()                         # Estadísticas de colección
db.stats()                               # Estadísticas de BD
exit                                     # Salir de mongosh
cls                                      # Limpiar pantalla
```
