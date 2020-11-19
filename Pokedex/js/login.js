window.onload = init;

function init()
{
    document.querySelector(".btn-secondary").addEventListener("click", function()
    {
        window.location.href = "signin.html"
    });
    document.querySelector(".btn-primary").addEventListener("click", login);
}

function login()
{
    var mail = document.getElementById("input-mail").value;
    var password = document.getElementById("input-password").value;

    console.log(mail, password);

    axios({
        method: "post",
        url: "http:localhost:3000/user/login",
        data: {
            user_email: mail,
            user_password: password
        }
    }).then(function(res) {
        console.log(res);
    }).catch(function(err) {
    console.log(err)
    })
}