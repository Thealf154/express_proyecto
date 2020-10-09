//Load dependencies
const express = require("express");
const app = express();
const { pokemon }= require("./pokedex.json");

app.get("/", (req, res, next) => {
    res.status(200); //Todo corrió de manera correcta
    res.send("Bienvenido a la Pokedex");
}); //get(url, function)

app.get("/pokemon", (req, res, next) => {
    res.status(200);
    res.send(pokemon);
});

app.get("/pokemon/:id", (req, res, next) => {
    res.status(200);
    res.send(pokemon[req.params.id - 1]);
});

//Load a local server
app.listen(process.env.PORT || 3000, () => {
    console.log("Server is running...");
});