// llamada a express
const express = require("express")
const app = express()

const productsRouter = require('./routes/products')
const cartRouter = require('./routes/carts')

// middleware --> sin estas líneas el servidor no sabe cómo interpretar el archivo JSON que se envía
app.use(express.json())
app.use(express.urlencoded({extended: true}));

// rutas
app.use('/api/product', productsRouter)

app.use('/api/carts', cartRouter)

// chequeo de servidor y manejo de error
const server = app.listen(8080, () => console.log("server listening on port 8080"));
server.on("error", error => console.log(error));




