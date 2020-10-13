//Load dependencies
const bodyParser = require("body-parser");
const express = require('express');
const app = express();
const { pokemon } = require("./pokedex.json");

//Required to interact with POSTMAN
//"use" will put a function for every petition to the server 
//Known better as a middleWare
app.use(bodyParser.json()); //For every petition it will be passed to a json
app.use(bodyParser.urlencoded({extended: true})); //This will put the json as a urlenconded

app.get("/", (req, res, next) => {
  return res.status(200).send("Bienvenido a la Pokedex"); //También es válido
}); //get(url, function)

app.get("/pokemon", (req, res, next) => {
  return res.send(pokemon).status(200);
});

//This route can't be accessed by normal browsers since they can only do GET requests
app.post("/pokemon", (req, res, next) => {
  return res.status(200).send(req.body);
});

//Expresión regular que acepta un grupo de tres números
app.get("/pokemon/:id([0-9]{1,3})", (req, res, next) => {
  const id = req.params.id - 1;
  if (id >= 0 && id < 150) {
    res.status(200);
    return res.send(pokemon[req.params.id - 1]);
  }
  res.status(404);
  return res.send("Pokemón no enctontrado");
});

//This only receives text requests
app.get("/pokemon/:name([A-Za-z]+)", (req, res, next) => {
  const name = req.params.name;
  //Return the pokemon that the user wants
  const pk = pokemon.filter((p) => {
    return (p.name.toUpperCase() == name.toUpperCase()) ? p : null;
  });
  //If it didn't find th pokemon, we return a 404 error
  pk.length > 0 ? res.status(200).send(pk) : res.status(404).send("Pokémon no encontrado");
});

//Load a local server
app.listen(process.env.PORT || 3000, () => {
  console.log("Server is running...");
});