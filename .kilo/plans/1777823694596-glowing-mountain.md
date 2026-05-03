# Plan: Implementar página NotFound (404)

## Objetivo
Crear una página 404 para manejar rutas no existentes en el frontend, con un botón que redirija al usuario a la página principal.

## Pasos

### 1. Crear el componente NotFound.jsx
- Ubicación: `frontend/src/pages/NotFound.jsx`
- Diseño:
  - Título "404 - Página no encontrada"
  - Mensaje descriptivo
  - Botón "Volver al inicio" que redirige a `/`
  - Icono/ilustración simple (usar Phosphor Icons o similar)
- Estilos con Tailwind CSS, siguiendo el estilo existente

### 2. Agregar ruta catch-all en main.jsx
- Archivo: `frontend/src/main.jsx`
- Agregar al final del `<Routes>`:
  ```jsx
  <Route path="*" element={<NotFound />} />
  ```

## Consideraciones técnicas
- Usar el hook `useNavigate` de react-router-dom para el botón de volver
- Mantener consistencia con el diseño existente (colores, fuentes, estructura)
- El componente debe ser simple y no requerir lógica compleja

## Archivos a modificar/crear
1. **Crear**: `frontend/src/pages/NotFound.jsx` (nuevo archivo)
2. **Editar**: `frontend/src/main.jsx` (agregar ruta 404)