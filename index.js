const express = require('express');   //aqui se importa la libreria express
const app = express();  //se crea una instancia 
const {pokemon} = require('./pokedex.json');
 

app.get("/" , (req, res ,next) =>{
    res.status(200);
    res.send("Bienvenido al POKEDEX");

});

app.get('/pokemon/:id([0-9]{1,3})',(req, res, next)=>{
    const id = req.params.id-1;
    if(id >= 0 && id <= 150){
        res.status(200);
        res.send(pokemon[req.params.id - 1 ]);
    }
    else{
        res.status(404);
        res.send("Pokemón no encontrado");
    }
});
app.get('/pokemon/all' , (req,res,next)=>{
    
    res.status(200);
    res.send(pokemon);
    
});//metodo para atender a peticiones get
//que son los parametros 
//req = request (la peticion que nos hace el cliente)
//res = response(lo que enviamos )
//:(nombre) es para poner en la url y mandar un parametro

//expresion regular    [0-9]valores entre 0 y 9 para id  { porque puede tener entre 1 y 3 digitos}
app.get('/pokemon/:name', (req,  res, next)=>{
    const name = req.params.name;
    for( i = 0; i < pokemon.length; i++){
        if(pokemon[i].name == name){
            res.status(200);
            res.send(pokemon[i]);
        }
    }
    res.status(404);
    res.send("Pokemon no encontrado")
    
});



app.listen(process.env.PORT ||3000, () => {
    console.log("Server is running... ;)")
});//uso de funcion flecha


