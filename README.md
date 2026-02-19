# Integrating With HubSpot I – Practicum

## Descripción

Este proyecto consiste en una aplicación desarrollada en Node.js utilizando Express que se integra con la API REST de HubSpot.

La aplicación permite:

- Listar registros de un Custom Object.
- Crear nuevos registros mediante un formulario web.
- Visualizar la información en una tabla HTML utilizando Pug.

El caso simula la integración de un bot de admisiones que captura solicitudes de aspirantes y las almacena en HubSpot para garantizar trazabilidad operativa.

---

## Tecnologías utilizadas

- Node.js
- Express
- Axios
- Pug
- HubSpot Private App (autenticación mediante token)

---

## Estructura del proyecto

public/css/style.css  
views/homepage.pug
views/updates.pug 
index.js
package.json
.gitignore
README.md

---

## Custom Object

Nombre del objeto:
Solicitudes Bot Admisiones

Propiedades:

- Name (string obligatorio)
- programa_interes (string)
- canal_origen (string)

Vista del Custom Object:

https://app.hubspot.com/contacts/51096549/objects/2-57873272/views/all/list?prefetch=

---

## Instalación

1. Instalar dependencias:

npm install

2. Crear archivo `.env` con la siguiente variable:
HUBSPOT_TOKEN=tu_token_privado

3. Ejecutar la aplicación:

node index.js

La aplicación se ejecuta en:

http://localhost:3000

---

## Endpoints implementados

### GET /

Obtiene los registros del Custom Object desde HubSpot y los muestra en una tabla.

### GET /update-cobj

Renderiza el formulario para crear un nuevo registro.

### POST /update-cobj

Envía la información del formulario a HubSpot para crear un nuevo registro y redirige al homepage.

---

## Consideraciones técnicas

- Se utiliza el fully qualified object name para garantizar consistencia en la API.
- El token de acceso se maneja mediante variables de entorno.
- La validación se realiza en entorno local según lo solicitado en la prueba.
