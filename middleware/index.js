module.exports = (req, res, next) => {
  return res.status(200).send.json({code: 1, message: "Bienvenido a la Pokedex"}); //También es válido
}