const express = require("express");
const pokemon = express.Router();
const bd = require('../config/database')

pokemon.post('/' , (req, res, next)=>{
    return res.status(200).send(req.body);
});

pokemon.get('/' , async(req,res,next)=>{
    const pkmn = await bd.query("SELECT * FROM pokemon"); 
    return res.status(200).json(pkmn);
});

pokemon.get('/:id([0-9]{1,4})',async(req, res, next)=>{
    
    const id = req.params.id;

    if(id >= 0 && id <= 150){
    
        const pkmn = await bd.query("SELECT * FROM pokemon where pok_id ='"+ id + "';");
        return res.status(200).json(pkmn);
        //res.status(200).send(pk[req.params.id - 1 ]);
    }
    else{
        return res.status(404).send("Pokemón no encontrado");
    }
});

/*
pokemon.get('/:id([0-9]{1,3})',(req, res, next)=>{
    const id = req.params.id-1;
    if(id >= 0 && id <= 150){
        res.status(200).send(pk[req.params.id - 1 ]);
    }
    else{
        res.status(404).send("Pokemón no encontrado");
    }
});
*/

pokemon.get('/:name([A-Za-z]+)', async(req,  res, next)=>{
    const name = req.params.name;
/*
    Esta es otra forma de hacerlo
    for( i = 0; i < pokemon.length; i++){
        if(pokemon[i].name.toUpperCase() == name.toUpperCase()){
            res.status(200).send(pokemon[i]);
        }
    }
*/  

    const pkmn = await bd.query("SELECT * FROM pokemon WHERE pok_name='" + name.toLowerCase() +"';")
    if (pkmn.length !=0){
        return res.status(200).json(pkmn)
    }
    else{
        return res.status(404).send("Pokemon no encontrado")
    }

    /*
    const pkmn = pk.filter((p) => {
        //  condicion ? valor si verdadero : valor si falso
        return(p.name.toUpperCase() == name.toUpperCase()) ? p : null;
    });
    console.log(pk);
    (pkmn.length > 0) ? res.status(200).send(pkmn) : res.status(404).send("Pokemon no encontrado");    
    */
});

module.exports= pokemon;

/*
tipos de metodos en REST:
    get-->obtener recursos
    post-->almacenar recursos(crear)
    put-->modificar una parte de un recurso
    patch-->modificar un recurso
    delete-->borrar un recurso

metodo para atender a peticiones get que son los parametros 
    req = request (la peticion que nos hace el cliente)
    res = response(lo que enviamos )
    :(nombre) es para poner en la url y mandar un parametro

expresion regular    [0-9]valores entre 0 y 9 para id  { porque puede tener entre 1 y 3 digitos}
*/