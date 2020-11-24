window.onload = init;

function init()
{
    document.querySelector(".btn-secondary").addEventListener("click", function()
    {
        window.location.href = "login.html"
    });
    document.querySelector(".btn-primary").addEventListener("click", signin);
}

function signin()
{
    var name = document.getElementById("input-name").value;
    var mail = document.getElementById("input-mail").value;
    var password = document.getElementById("input-password").value;

    console.log(mail, password);

    axios({
        method: "post",
        url: "http:localhost:3000/user/signin",
        data: {
            user_name: name,
            user_email: mail,
            user_password: password
        }
    }).then(function(res) {
        alert("Usuario registrado correctamente");
        window.location.href = "login.html"
    }).catch(function(err) {
    console.log(err)
    })
}
