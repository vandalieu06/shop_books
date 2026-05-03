# ACT 18

- Repo: https://github.com/vandalieu06/shop_books
## 4.1 Crear un dashboard per usuaris

Implementar el dashboard d’usuaris:

1. Fer una proposta d'elements que ha de tenir (gestió d’usuari, compres fetes, …)
2. Protegir ruta per només poder accedir amb l’usuari

### Propuesta

- Todas las paginas mencionadas en al propuesta deben estar protegidas con el role de usario, para mostrar la información debemos obtener el user_id y comprobar tanto los datos de sesión como del backend que el usuario es un usuario.
- Pagina de historial de compras con el listado y estado de cada pedido. Al seleccionar un pedido ver información completa del pedido: productos, precio, método de pago, dirección, código, ...
- Como funcionalidad extra añadir en la pagian de info del pedido añadir un btn de comprar de nuevo y que se añaden los productos (ids) al carrito y reedirigir al carrito para realizar la compra.
- Añadir la opción de poder editar y actualizar la información personal en perfil de usuario

### Resultado

![[Pasted image 20260503194632.png]]
![[Pasted image 20260503194639.png]]
![[Pasted image 20260503194646.png]]
![[Pasted image 20260503194654.png]]
![[Pasted image 20260503194700.png]]

## 4.2 Crear un dashboard per admin

Implementar el dashboard d’administradors:

1. Fer una proposta d'elements que ha de tenir (gestió d’usuari, gestio d’usuaris, grafics, …)
2. Portegir ruta per només poder accedir amb administrador

### Propuesta

- Crear nueva ruta dashboard protegida donde solo podrán acceder los usuarios con el role admin
- Crear o reutilizar la lógica del login de la tienda para acceder al panel.
- Dividir los pages y componentes según si pertenecen a **/shop** o a **/admin** para diferenciar tanto las paginas como los componentes
- Crear nueva pagian con ruta **/dashboard** o **/admin** para la pagian utilizar **shdcn**
- Añadir al menu del panel las opciones de listado de usuarios y pedidos
- En la pagina inicial del panel de admin crear un mini resumen en gráficos y divs con numero de :
  - Usuarios registrados (role de user)
  - Compras totales hechas
  - Ganancia total
  - Gráfico de compras por mes con la librería charter
- En la pagina de usuarios del dahsboard mostrar listado de usuarios en tabla con información basica + acciones, en cada podemos realizar acciones como eliminar usuaior o actualizar datos personales.
- En la pagina de pedidos del dahsboard mostrar un listado de todos los pedidos realizados en total
### Resultado

![[Pasted image 20260503194220.png]]
![[Pasted image 20260503194234.png]]
![[Pasted image 20260503194308.png]]
![[Pasted image 20260503194240.png]]
![[Pasted image 20260503194247.png]]