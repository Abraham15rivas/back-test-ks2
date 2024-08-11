# back-test-ks2 - API RestFul - documentation

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run dev

```

1. Clonar Proyecto
2. Duplicar el archivo ```.env.template``` y renombralo a ```.env```
3. Sustituir el valor de las variables de entorno de acuerdo a su configuracion
4. crear una base de datos en postgreSql con el nombre: ```user_management```.
5. Levantar base de datos.

## Settings for requests

1. Se debe usar la baseUrl en el cliente rest.
2. Completar la baseUrl con el endpoint de usuarios ejemplo: ```http://domain:port/api/v1/users```.
3. Sustituir domain y port por los valores correspondientes ejemplo: ```http://localhost:3000/api/v1/users```
4. antes de ejecutar los request se debe definir el siguiente encabezado o header: Origin, ejemplo: ```Origin: http://localhost:3000``` para que la api responda correctamente y no retorne un error de CORS.

```
baseUrl: http://domain:port/api/v1
endpoint: /users
Origin: http://domain:port
```

## Documentation of PostMan

[link: https://documenter.getpostman.com/view/30198633/2sA3s3HXAN](https://documenter.getpostman.com/view/30198633/2sA3s3HXAN)