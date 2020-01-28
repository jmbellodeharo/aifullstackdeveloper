# aifullstackdeveloper

## Frontend
Para el frontend y la lógica que conlleva he usado HTML, <a href="https://getbootstrap.com/docs/4.3/getting-started/download/">Bootstrap</a> y <a href="https://code.jquery.com/">JQuery (javascript)</a>. Simplemente se ha de abrir el archivo "index.html" en un navegador. Únicamente lo he probado en Chrome.

## Backend
He usado los módulos Express, Helmet y MongoDB, además de Nodemon para las pruebas durante el desarrollo, el body-parser para la información que llega, http para crear el servidor y child_process para la ejecución de scripts escritos en Python.
Para ejecutarlo se ha de usar el comando
```
npm start 
```
En el caso de tener instalado nodemon, que se instala con `npm install --save-dev nodemon`, ejecutar el comando
```
npm run start-dev
```
## BBDD
Como BBDD he usado <a href="https://www.mongodb.com/download-center/community">MongoDB</a>, la cual he instalado de manera local y he ejecutado mediante el uso del daemon "mongod". Lo he configurado de tal manera que escucha en "localhost:27017".
He creado una BBDD cuyo nombre es "frases" y una colección llamada "frasesColl".

## Python
Para la parte de python he instalado el paquete de cifrado césar con el comando
```python
pip install caesarcipher
```
Tanto la BBDD como la colección las he creado usando la interfaz gráfica de ___MongoDB Compass Community___