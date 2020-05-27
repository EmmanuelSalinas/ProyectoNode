    //Dependencies
//const bodyParser = require('body-parser') //ya no se usa por el bodyparser.json y el segundo siguiente
const morgan = require('morgan');
const express = require('express');   //aqui se importa la libreria express
const app = express();  //se crea una instancia 
    //Routers
const pokemon = require('./routes/pokemon');
const user = require('./routes/user');

    //middleware

const auth = require('./middleware/auth');
const notFound = require('./middleware/notFound');
const index = require('./middleware/index');
const cors = require('./middleware/cors');

app.use(cors);
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended : true }));
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({extended: true}));

app.get("/" , index);
app.use("/user",user);
app.use(auth);
app.use("/pokemon", pokemon);
app.use(notFound);

app.listen(process.env.PORT ||3000, () => {
    console.log("Server is running... ;)")
});//uso de funcion flecha
