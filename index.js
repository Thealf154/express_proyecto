//Load dependencies
const express = require("express");
const app = express();

/*
    Verbos HTTP:
    Son maneras que puedes obtener recursos de internet:
    GET: Obtener un recurso. Usado comunmente en navegadores.
    POST: Guardar o publicar algo en un servidor web.
    PATCH: A la actualización de un recurso específico.
    PUT: Modificar todos los elementos
    DELETE: Eliminar un recurso.
*/

//Ejemplo de GET
//La diagonal nos sirve para obtener la url local: localhost:3000/
// Req es la petición que nos hace el cliente
// Res es la respuesta
app.get("/", (req, res, next) => {
    res.send("Hola Mundo");
    res.status(200); //Todo corrió de manera correcta
}); //get(url, function)

//Load a local server
app.listen(3000, () => {
    console.log("Server is running...");
});