// llamada a express
const express = require("express")
const app = express()

//import
//import ProductManager from "./scripts/ProductManager"
//const ProductManager = require ('./scripts/ProductManager')

// middleware --> sin estas líneas el servidor no sabe cómo interpretar el archivo JSON que se envía
app.use(express.json())
app.use(express.urlencoded({extended: true}));

// rutas
app.get('/', (req, res) => {
res.send('Raiz del proyecto!!!')
})

app.get('/products', (req, res) => {
//res.send(ProductManager.getProducts()) //debería mostrar el array completo
})

app.get('/products/:id', (req, res) => {
let productId = req.params.id;
let product = products.find(product => product.id == productId) // busca un producto cuyo id sea igual a productId
// if (product) return res.send(product)
product ? res.send(product) : res.send("producto no encontrado")
})

let users = [] 
let cantidadElementos = users.length

app.post('/user', (req, res) => {
let user = req.body;
// user.id ? user.id = users.length + 1 : user.id = 1 // no funciona el generador de ID 
user.id = cantidadElementos + 1
user.name ? console.log(user) : res.status(400).send({status: "error", error: "incomplete value name"})
users.push(user)
res.send(`el usuario ${JSON.stringify(user)} está ok`)
})

app.get('/user', (req, res)=>{
    res.send(users)
})

app.put('/user/:id',(req,res) => {
let id = req.params.id; // trae el id que viene por params
let user = req.body; // trae toda la info que viene en el body
let showUser = users.findIndex(elem => elem.id == id) // busca si el id se encuentra en algún objeto del array
showUser ? console.log(user) : res.status(400).send({status: "error", error: "Id no encontrado"}) ; // si hay una coincidencia de id muestra al usuario sino lanza un error
})

app.delete('/user/:id', (req,res) => {
    let id = req.params.id;
    users = users.filter(elem => elem.id != id)
    console.log(`se elimina el id ${id}`);
    res.send('Objeto eliminado')
    console.log(`nuevo array ${JSON.stringify(users)}`);
})

// chequeo de servidor y manejo de error
const server = app.listen(8080, () => console.log("server listening on port 8080"));
server.on("error", error => console.log(error));




