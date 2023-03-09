// llamada a express
const express = require("express")
const app = express()

// configuración de handlebars y socket.io
const { Server } = require ("socket.io");
const http = require ("http");

// llamado a recursos estáticos dentro de public
app.use(express.static("public"))

// llamada a MONGOOSE
import userRouter from './routes/user.router.js'
import mongoose from 'mongoose';
import { userModel } from './models/user.model.js';

// importación de archivos
const productsRouter = require('./routes/products')
const cartRouter = require('./routes/carts')
const productManager = require('./database/productsDB.json');
const { error } = require("console");

// middleware --> sin estas líneas el servidor no sabe cómo interpretar el archivo JSON que se envía
app.use(express.json())
app.use(express.urlencoded({extended: true}));

// rutas
app.use('/api/product', productsRouter)
app.use('/api/carts', cartRouter)

// chequeo de servidor y manejo de error
//const PORT = process.env.PORT || 8080
//const server = app.listen(8080, () => console.log(`server listening on port 8080 ${server.adress().port}`));
//server.on("error", error => console.log(error));

//chequeo de servidor y manejo de error con socket.io
const httpserver = app.listen(8080, () => console.log("server listening on port 8080"));
const io = new Server(httpserver);


io.on ("connection", socket => {
console.log("cliente conectado")

io.sockets.emit('messagenewProducts', productManager)

socket.on('messagenewProduct', product =>{
    productManager.push(product)
io.sockets.emit('messagenewProducts', productManager)
})
});

// importo mongo copiando la url que saco de Mongo Atlas
mongoose.connect('mongodb+srv://Roberts6:BeniRoberts6@coderhouse-backend.daqwlwh.mongodb.net/CoderHouse-BackEnd?retryWrites=true&w=majority',(error) => {
    if (error) {
        console.log("Cannot connect to database: " + error)
        process.exit()
    }
})

const enviroment = async () => {
    let response = await userModel.find().explain('executionStats') // de esta manera trae toda la DB, pero si dentro de find colocamos un parámetro (ej: nombre:"Benicio") hace el filtro
    console.log(response);
}
enviroment();


app.use('/api/users', userRouter);