window.onload = init;

function init (){
    if(!localStorage.getItem("token")){

        document.querySelector('.btn-secondary').addEventListener('click', function(){
            window.location.href = "signin.html";
        });
    
        document.querySelector('.btn-primary').addEventListener('click' , login);
    }
    else{
        window.location.href = "pokedex.html";
    }
}

function login(){
    var mail = document.getElementById('input-mail').value;
    var pass = document.getElementById('input-password').value;

    axios({
        method:  'post',
        url: 'http://localhost:3000/user/login',
        data:{
            user_mail: mail,
            user_password: pass
        }
    }).then(function(res){
        //console.log(res.data);
        if(res.data.code == 200){
            //alert("Inicio Exitoso")
            localStorage.setItem("token" , res.data.message);
            window.location.href="pokedex.html";
        }
        else{
            alert("Usuario y/o Contraseña Incorrectos")
        }
    }).catch(function(err){
        console.log(err); 
    });
    

}