window.onload = init;
var url = "http://localhost:3000";

function init() 
{
    if (localStorage.getItem("token")) 
    {
       let token = localStorage.getItem("token");
       loadPokedex();
    }
    else
    {
        window.location.href = "index.html";
    }
}

function loadPokedex()
{
    axios.get("http://localhost:3000/pokemon", {
        headers: {
            "Authorization" : "bearer" + localStorage.getItem("token")
        }
    }).then(function(res) {
        console.log(res);
        displayPokemon(res.data.)
    }).catch(function(err) {
        console.log(err);
    })
}

function displayPokemon(pokemon) 
{
    var body = document.querySelector("body");
    for(var i = 0; i < pokemon.length; i++)
    {
        body.innerHTML += `<h3>${pokemon[i].pok_name}<h3>`
    }
}