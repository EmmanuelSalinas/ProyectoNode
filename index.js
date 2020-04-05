const bodyParser = require('body-parser')
const morgan = require('morgan');
const express = require('express');   //aqui se importa la libreria express
const app = express();  //se crea una instancia 
const pokemon = require('./routes/pokemon')

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get("/" , (req, res ,next) =>{  
    res.status(200).send("Bienvenido al POKEDEX");
});

app.use("/pokemon", pokemon);

app.listen(process.env.PORT ||3000, () => {
    console.log("Server is running... ;)")
});//uso de funcion flecha
