// llamada a express
const express = require("express")
const app = express()

// configuración de handlebars y socket.io
const { Server } = require ("socket.io");
const http = require ("http");

// llamado a recursos estáticos dentro de public
app.use(express.static("public"))

// importación de archivos
const productsRouter = require('./routes/products')
const cartRouter = require('./routes/carts')
const productManager = require('./database/productsDB.json')

// middleware --> sin estas líneas el servidor no sabe cómo interpretar el archivo JSON que se envía
app.use(express.json())
app.use(express.urlencoded({extended: true}));

// rutas
app.use('/api/product', productsRouter)
app.use('/api/carts', cartRouter)

// chequeo de servidor y manejo de error
//const server = app.listen(8080, () => console.log("server listening on port 8080"));
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

