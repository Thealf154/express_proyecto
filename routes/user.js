const express = require("express");
const user = express.Router();
const db = require("../config/database");
//Authorization token
const jwt = require("jsonwebtoken");

user.post("/signin", async (req, res, next) => {
  const { user_name, user_email, user_password } = req.body;
  if (user_name && user_email && user_password) {
    let query = "INSERT INTO user(user_name, user_email, user_password) ";
    query += `VALUES ('${user_name}', '${user_email}', '${user_password}')`;

    const rows = await db.query(query);

    if (rows.affectedRows === 1)
      return res
        .status(201)
        .json({ code: 201, message: "Usuario registrado correctamente" });

    return res
      .status(500)
      .json({ code: 500, message: "Usuario registrado incorrectamente" });
  }
  return res.status(500).json({ code: 500, message: "Campos incompletos" });
});

user.get("/", async (req, res, next) => {
  const query = "SELECT * FROM user";
  const rows = await db.query(query);

  return res.status(200).json({ code: 200, message: rows });
});

//We use POST since the data taken is encoded in the body
user.post("/login", async (req, res, next) => {
  const { user_email, user_password } = req.body;
  const query = `SELECT * FROM user WHERE user_email = '${user_email}' AND user_password = '${user_password}';`;
  const rows = await db.query(query);

  if (user_email, user_password) {
    if (rows.length == 1)
    {
      //recieves the data to create an autentication token for the user
      const token = jwt.sign({
        user_id : rows[0].user_id,
        user_email : rows[0].user_email
      }, "debugkey"); //Debugkey is a varaiable not visible in the code but only in the server
      return res.status(200).json({ code: 200, message: token });
    }
    else
      return res.status(200).json({code : 200, message : "Usuario y/o contraseña equivocada"})
  }
    else
      return res
        .status(500)
        .json({ code: 500, message: "Campos incompletos" });
});

module.exports = user;