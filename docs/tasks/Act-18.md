## ACT 18

## 4.1 Crear un dashboard per usuaris

Implementar el dashboard d’usuaris:

1. Fer una proposta d'elements que ha de tenir (gestió d’usuari, compres fetes, …)  
2. Protegir ruta per només poder accedir amb l’usuari  

### Proposta

- Totes les pàgines del dashboard han d’estar protegides amb autenticació i autorització amb rol **user**.  
  Cal validar tant la sessió (token/cookie) com al backend que l’usuari autenticat és vàlid i té permisos.

- **Perfil d’usuari**:
  - Visualitzar dades personals (nom, email, adreça, etc.)
  - Editar i actualitzar la informació personal

- **Historial de compres**:
  - Llistat de comandes amb estat (pendent, enviat, completat, etc.)
  - Detall de cada comanda: productes, preu total, mètode de pagament, adreça d’enviament, codi de comanda

- **Funcionalitat extra**:
  - Botó de “tornar a comprar” dins del detall de la comanda
  - Aquesta acció ha d’afegir els productes al carret (via IDs) i redirigir a la pàgina del carret

---

## 4.2 Crear un dashboard per admin

Implementar el dashboard d’administradors:

1. Fer una proposta d'elements que ha de tenir (gestió d’usuaris, gràfics, …)  
2. Protegir ruta per només poder accedir amb administrador  

### Proposta

- Crear una ruta protegida (**/admin** o **/dashboard**) accessible només per usuaris amb rol **admin**

- Reutilitzar la lògica d’autenticació existent (login) per controlar l’accés al panell

- Separar clarament l’estructura de l’aplicació:
  - **/shop** → funcionalitat de client
  - **/admin** → panell d’administració

- **Dashboard principal (admin)**:
  - Resum general amb mètriques:
    - Nombre d’usuaris registrats (rol user)
    - Nombre total de comandes
    - Ingressos totals
  - Gràfic de comandes per mes (per exemple amb Chart.js)

- **Gestió d’usuaris**:
  - Taula amb informació bàsica (nom, email, rol, etc.)
  - Accions: editar dades, eliminar usuari

- **Gestió de comandes**:
  - Llistat de totes les comandes del sistema
  - Visualització de detall de cada comanda

- Opcional:
  - Possibilitat de canviar l’estat de les comandes (pendent, enviat, completat)
