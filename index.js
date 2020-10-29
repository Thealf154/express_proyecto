//Load dependencies
const morgan = require("morgan")
const express = require('express');
const app = express();
const pokemonRoutes = require("./routes/pokemonRoutes")
const user = require("./routes/user")

//Required to interact with POSTMAN
//"use" will put a function for every petition to the server 
//Known better as a middleWare
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
//app.use(bodyParser.json()); //For every petition it will be passed to a json
//app.use(bodyParser.urlencoded({extended: true})); //This will put the json as a urlenconded

app.get("/", (req, res, next) => {
  return res.status(200).send.json({code: 1, message: "Bienvenido a la Pokedex"}); //También es válido
}); //get(url, function)

//This is a reference to all the routes in pokemonRoutes
app.use("/pokemon", pokemonRoutes);
//This is to manage the user database requests
app.use("/user", user);

app.use((req, res, next) => {
  return res.status(404).json({ code: 404, message: "URL no encontrada"})
});

//Load a local server
app.listen(process.env.PORT || 3000, () => {
  console.log("Server is running...");
});