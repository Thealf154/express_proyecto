const { json } = require('body-parser');
const express = require('express');
const pokemonRoutes = express.Router();
const db = require("../config/database");


pokemonRoutes.get("/", async (req, res, next) => {
  //This will wait for the database and won't execute
  //anything else until a response
  const pkmn = await db.query("SELECT * FROM pokemon");
  console.log(pkmn);
  //Sends the database as a json, but only if the format is already in a json
  return res.status(200).json(pkmn);
});

//This route can't be accessed by normal browsers since they can only do GET requests
pokemonRoutes.post("/", (req, res, next) => {
  return res.status(200).send(req.body);
});

//Expresión regular que acepta un grupo de tres números
pokemonRoutes.get("/:id([0-9]{1,3})", async(req, res, next) => {
  const pokemon = await db.query("SELECT * FROM pokemon");
  const id = req.params.id - 1;
  if (id >= 0 && id < 150) {
    res.status(200);
    return res.send(pokemon[id]);
  }
  res.status(404); 
  return res.send("Pokemón no enctontrado");
 });

//This only receives text requests
pokemonRoutes.get("/:name([A-Za-z]+)", async (req, res, next) => {
  const name = req.params.name;
  let pokemon = await db.query(`SELECT pok_name FROM pokemon WHERE pok_name LIKE '%${name}%'`);
  return res.status(200).send(pokemon);
});

module.exports = pokemonRoutes;