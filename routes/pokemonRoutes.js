const { json } = require("body-parser");
const express = require("express");
const pokemonRoutes = express.Router();
const db = require("../config/database");

pokemonRoutes.get("/", async (req, res, next) => {
  //This will wait for the database and won't execute
  //anything else until a response
  const pkmn = await db.query("SELECT * FROM pokemon");
  console.log(pkmn);
  //Sends the database as a json, but only if the format is already in a json
  return res.status(200).json({ code: 1, message: pkmn });
});

//This route can't be accessed by normal browsers since they can only do GET requests
pokemonRoutes.post("/", async (req, res, next) => {
  const { pok_name, pok_height, pok_weight, pok_base_experience } = req.body;

  if (pok_name && pok_height && pok_base_experience && pok_weight) {
    let query =
      "INSERT INTO pokemon (pok_name, pok_height, pok_weight, pok_base_experience)";
    query += ` VALUES('${pok_name}', ${pok_height}, ${pok_weight}, ${pok_base_experience})`;
    const rows = await db.query(query);
    if (rows.affectedRows == 1) {
      return res
        .status(200)
        .json({ code: 201, message: "Pokemon insertado correctamente" });
    }
    return res
      .status(500)
      .json({ code: 500, message: "Campos incompletos"});
  }
  return res
    .status(500)
    .json({ code: 500, message: "Pokemon insertado sin éxito" });
});

//Expresión regular que acepta un grupo de tres números
pokemonRoutes.get("/:id([0-9]{1,3})", async (req, res, next) => {
  const pokemon = await db.query("SELECT * FROM pokemon");
  const id = req.params.id - 1;
  if (id >= 0 && id < 722) {
    return res.status(200).json({ code: 200, message: pokemon[id] });
  }
  return res.status(404).json({ code: 404, message: "Pokemon no encontrado" });
});

//This only receives text requests
pokemonRoutes.get("/:name([A-Za-z]+)", async (req, res, next) => {
  const name = req.params.name;
  let pokemon = await db.query(
    `SELECT pok_name FROM pokemon WHERE pok_name LIKE '%${name}%'`
  );
  if (pokemon.length > 0)
    return res
      .status(404)
      .json({ code: 404, message: "Pokemon no encontrado" });
  return res.status(200).send(pokemon);
});

module.exports = pokemonRoutes;
