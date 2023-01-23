// llamada a express
const express = require("express")
const app = express()

//import
import index from './index.js'

// middleware
app.use(express.urlencoded({extended: true}));

// rutas
app.get('/', (req, res) => {
res.send('Raiz del proyecto!!!')
})

app.get('/products', (req, res) => {
res.send('Total de productos')
})

app.get('/products/:pid', (req, res) => {
let productId = req.params.productId;
let product = products.find(product => product.id == productId)
// if (product) return res.send(product)
product ? res.send(product) : res.send("producto no encontrado")
})

// chequeo de servidor y manejo de error
const server = app.listen(8080, () => console.log("server listening on port 8080"));
server.on("error", error => console.log(error));




