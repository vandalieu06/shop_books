# Base de Datos Esquema

Este 

## Entidades

- Usuario
- Direccion
- Libro
- Autor
- Editorial
- Categoria
- Reseñas
- Favoritos
- Pedido
- Carrito
- Carrito Item

### User

- user_id
- first_name
- last_name
- username
- birthdate
- phone_number
- email
- password

### Address

- address_id
- address_name
- city
- zipcode
- country

### Book

- book_id
- name
- description
- num_pages
- language
- year
- type
- price
- unitStock

### Author

- author_id
- name

### Editorial

- publisher_id
- name
- country
- website

### Category

- category_id
- name
- description

### Review

- review_id
- rating
- comment
- created_at

### Wishlist

- wishlist_id
- date_add

### Cart

- cart_id
- total_price (computed)

### Cart Item

- cart_item_id
- quantity
- price (computed)

### Order

- order_id
- order_code
- state
- date
- total_price

## Relaciones

- User -> Addres (1 - N)
- User -> Order (1 - N)
- User -> Cart (1 - 1)
- User -> Review (1 - N)
- Book -> Category (N - N)
- Book -> Author (N-N)
- Book -> Editorial (N-1)
- Book -> Review (1-N)
- (Wishlist) User <-> Book (N - N)
- Order -> Cart (1 - 1)
- Cart -> Card Item (1 - N)
- Card Item -> Book (1 - 1)

## Diagram

La siguiente imagen es una muestra de como serian las relaciones de las entidades

![image_diagram](/backend/docs/diagrams/diagram_entity_relation.drawio.png)
