// llamada a express
const express = require("express")
const app = express()

//import
//import ProductManager from "./scripts/ProductManager"
const ProductManager = require ('./scripts/ProductManager')

// middleware
app.use(express.urlencoded({extended: true}));
app.use(express.json())

// rutas
app.get('/', (req, res) => {
res.send('Raiz del proyecto!!!')
})

app.get('/products', (req, res) => {
res.send(ProductManager.getProducts()) //debería mostrar el array completo
})

app.get('/products/:pid', (req, res) => {
let productId = req.params.id;
let product = products.find(product => product.id == productId) // busca un producto cuyo id sea igual a productId
// if (product) return res.send(product)
product ? res.send(product) : res.send("producto no encontrado")
})

// chequeo de servidor y manejo de error
const server = app.listen(8080, () => console.log("server listening on port 8080"));
server.on("error", error => console.log(error));




