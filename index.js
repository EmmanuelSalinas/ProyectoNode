const bodyParser = require('body-parser')
const express = require('express');   //aqui se importa la libreria express
const app = express();  //se crea una instancia 
const {pokemon} = require('./pokedex.json');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));



/*
tipos de metodos en REST:
    get-->obtener recursos
    post-->almacenar recursos(crear)
    put-->modificar una parte de un recurso
    patch-->modificar un recurso
    delete-->borrar un recurso

*/


//metodo para atender a peticiones get
//que son los parametros 
//req = request (la peticion que nos hace el cliente)
//res = response(lo que enviamos )
//:(nombre) es para poner en la url y mandar un parametro


//expresion regular    [0-9]valores entre 0 y 9 para id  { porque puede tener entre 1 y 3 digitos}

app.get("/" , (req, res ,next) =>{  
    res.status(200).send("Bienvenido al POKEDEX");
});


app.post('/pokemon' , (req, res, next)=>{
    return res.status(200).send(req.body);
})

app.get('/pokemon' , (req,res,next)=>{
    res.status(200).send(pokemon);
    
});


app.get('/pokemon/:id([0-9]{1,3})',(req, res, next)=>{
    const id = req.params.id-1;
    if(id >= 0 && id <= 150){
        res.status(200).send(pokemon[req.params.id - 1 ]);
    }
    else{
        res.status(404).send("Pokemón no encontrado");
    }
});


app.get('/pokemon/:name([A-Za-z]+)', (req,  res, next)=>{
    const name = req.params.name;
/*
    Esta es otra forma de hacerlo

    for( i = 0; i < pokemon.length; i++){
        if(pokemon[i].name.toUpperCase() == name.toUpperCase()){
            res.status(200).send(pokemon[i]);
        }
    }
*/  
    const pk = pokemon.filter((p) => {
        //  condicion ? valor si verdadero : valor si falso
        return(p.name.toUpperCase() == name.toUpperCase()) ? p : null;
    });

    console.log(pk);

    (pk.length > 0) ? res.status(200).send(pk) : res.status(404).send("Pokemon no encontrado");    
});




app.listen(process.env.PORT ||3000, () => {
    console.log("Server is running... ;)")
});//uso de funcion flecha
