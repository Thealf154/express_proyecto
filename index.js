//Load dependencies
const morgan = require("morgan")
const express = require('express');
const app = express();
//Routes
const pokemonRoutes = require("./routes/pokemonRoutes")
const user = require("./routes/user");
//Middleware
const auth = require("./middleware/auth")
const notFound = require("./middleware/notFound");
const index = require("./middleware/index");
const cors = require("./middleware/cors")

//Required to interact with POSTMAN
//"use" will put a function for every petition to the server 
//Known better as a middleWare
app.use(cors);
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true}));


//This is to manage the user database requests
app.get("/", index);
app.use("/user", user);
app.use(auth);
//This is a reference to all the routes in pokemonRoutes
app.use("/pokemon", pokemonRoutes);
app.use(notFound);

//Load a local server
app.listen(process.env.PORT || 3000, () => {
  console.log("Server is running...");
});