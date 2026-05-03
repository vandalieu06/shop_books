## ACT 18

## 4.1 Crear un dashboard per usuaris

Implementar el dashboard d’usuaris:

1. Fer una proposta d'elements que ha de tenir (gestió d’usuari, compres fetes, …)
2. Protegir ruta per només poder accedir amb l’usuari

### Propuesta

- Todas las paginas mecionadas en al propuesta deben estar protegidas con el role de usario, para mostrar la informacion debemos obtener el user_id y comprobar tanto los datos de session como del backend que el usuario es un usuario.
- Pagina de historial de compras con el listado y estado de cadad pedido. Al seleccionar un pediod ver infromacion completa del pedido: productos, precio, meteodo de pagos, direccion, codigo, ...
- Como funcioanlidad extra añadir en la pagian de info del pedido añadir un btn de comprar de nuevo y que se aañdan los productos (ids) al carrito y reederigir al carrito para realizar la compra.
- Añadir la opcion de poder editar y actualizar la infromación personal en perfil de usuario

## 4.2 Crear un dashboard per admin

Implementar el dashboard d’administradors:

1. Fer una proposta d'elements que ha de tenir (gestió d’usuari, gestio d’usuaris, grafics, …)
2. Portegir ruta per només poder accedir amb administrador

### Propuesta

- Crear nueva ruta dashboard protegigda donde solo podran acceder los usuarios con el role admin
- Crear o reutilizar la logica del login de la tienda para acceder al panel.
- Dividir los pages y componentes segun si pertecen a **/shop** o a **/admin** para diferenciar tanto las paginas como los componentes
- Crear nueva pagian con ruta **/dashboard** o **/admin** para la pagian utiliza r **shdcn**
- Añadir al menu del panel las opciones de listado de usuarios y pedidos
- En la pagina inical del panel de admin crear un mini resmen en garficas y divs con numero de :
  - Usarios registrados (role de user)
  - Compras totales hechas
  - Ganacia total
  - Grafico de compras por mmes con la librerioa chart.js
- En la pagian de usaurios del dahsboard mostar lisatdo de usarios en tabla con infor basica + acciones, en cada podemos realizar acciones como eliminar usuaior o actualizar datos personales.
- En la pagian de pedidos del dahsboard mostarr un lisatdo de todos los pedidos realizados en total
