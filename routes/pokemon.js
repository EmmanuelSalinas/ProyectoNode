const express = require("express");
const pokemon = express.Router();
const bd = require('../config/database')

pokemon.post('/' , async(req, res, next)=>{
    const {pok_name, pok_height, pok_weight, pok_base_experience} = req.body;
    
    if(pok_name && pok_height && pok_weight && pok_base_experience){
        
        let query ="INSERT INTO pokemon(pok_name, pok_height, pok_weight, pok_base_experience)";
        query += ` VALUES('${pok_name}' , ${pok_height} , ${pok_weight} , ${pok_base_experience})`;

        const rows = await bd.query(query);
        console.log(rows);

        if(rows.affectedRows ==1 ){
            return res.status(201).json({code:201, message: "Pokemón insertado c:"});
        }

        return res.status(500).json({code:500, message:"oh ooh ocurrio un error"});
    }
    return res.status(500).json({code:500, message:"Campos incompletosm"})
});

pokemon.delete("/:id([0-9]{1,3})", async(req,res,next)=>{
    const query =`DELETE FROM pokemon WHERE pok_id = ${req.params.id}`;

    const rows = await bd.query(query);

    if(rows.affectedRows == 1){
        return res.status(200).json({code:200, message:"Pokemón borrado correctamente"})
    }
    return res.status(404).json({code:404, message:"Pokemón no encontrado"})

});

pokemon.put("/:id([0-9]{1,3})",  async(req, res, next) =>{
    const { pok_name, pok_height, pok_weight, pok_base_experience } = req.body;

    if(pok_name && pok_height && pok_weight && pok_base_experience){
        
        let query = `UPDATE pokemon SET pok_name='${pok_name}',pok_height=${pok_height},`;
        query += `pok_weight=${pok_weight},pok_base_experience=${pok_base_experience} WHERE pok_id=${req.params.id};`;

        const rows = await bd.query(query);
        console.log(rows);

        if(rows.affectedRows ==1 ){
            return res.status(200).json({code:200, message: "Pokemón actualizado correctamente c:"});
        }

        return res.status(500).json({code:500, message:"oh ooh ocurrio un error"});
    }
    return res.status(500).json({code:500, message:"Campos incompletosm"})
});

pokemon.patch("/:id([0-9]{1,3})",  async(req, res, next) =>{
    
    if(req.body.pok_name){
        let query = `UPDATE pokemon SET pok_name='${req.body.pok_name}' WHERE pok_id=${req.params.id};`;
        const rows = await bd.query(query);
        
        if(rows.affectedRows ==1 ){
            return res.status(200).json({code:200, message: "Pokemón actualizado correctamente c:"});
        }
        return res.status(500).json({code:500, message:"Ocurrio un error"});
    }
    return res.status(500).json({code:500, message:"Campos incompletos"});
});

pokemon.get('/' , async(req,res,next)=>{
    const pkmn = await bd.query("SELECT * FROM pokemon"); 
    return res.status(200).json({code: 200 , message: pkmn});
});

pokemon.get('/:id([0-9]{1,4})',async(req, res, next)=>{
    
    const id = req.params.id;

    if(id >= 1 && id <= 725){
    
        const pkmn = await bd.query("SELECT * FROM pokemon where pok_id ='"+ id + "';");
        return res.status(200).json({code: 200, message: pkmn});
        //res.status(200).send(pk[req.params.id - 1 ]);
    }
    else{
        return res.status(404).send({code: 404, message: "Pokemón no encontrado"});
    }
});

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
        return res.status(200).json({code: 200, message: pkmn});
    }
    else{
        return res.status(404).send({code: 404, message: "Pokemón no encontrado"});
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