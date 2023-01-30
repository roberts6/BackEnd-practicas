const express = require("express");
const app = express();
const productsRouter = express.Router();
const { productManager } = require("../scripts/ProductManager");

// let products = [] 
// let productsId = products.forEach(element => element.id)
// let generadorId = productsId > 0 ? id = products.lastIndexOf(productsId) + 1 : id = 1;


// productsRouter.get('/api/product', (req, res)=>{
//     res.send(JSON.stringify(products))
// })

// productsRouter.post('/api/product', (req, res) => {
// let product = {
//     id : generadorId,
//     title: req.body.title,
//     description: req.body.description,
//     code: req.body.code,
//     price: req.body.price,
//     status: true,
//     stock: req.body.stock,
//     category: req.body.category
// };
// // product.id ? product.id = products.length + 1 : product.id = 1 // no funciona el generador de ID 
// product.id = generadorId 
// product.title ? console.log(product) : res.status(400).send({status: "error", error: "incomplete value name"})
// products.push(product)
// res.send(`el producto ${JSON.stringify(product)} está ok`)
// })

// productsRouter.put('/api/product/:id',(req,res) => {
// let id = req.params.id; // trae el id que viene por params
// let product = req.body; // trae toda la info que viene en el body
// let showProduct = products.findIndex(elem => elem.id == id) // busca si el id se encuentra en algún objeto del array
// showProduct ? console.log(product) : res.status(400).send({status: "error", error: "Id no encontrado"}) ; // si hay una coincidencia de id muestra al usuario sino lanza un error
// })

// productsRouter.delete('/api/product/:id', (req,res) => {
//     let id = req.params.id;
//     products = products.filter(elem => elem.id != id)
//     console.log(`se elimina el id ${id}`);
//     res.send('Objeto eliminado')
//     console.log(`nuevo array ${JSON.stringify(products)}`);
// })

// module.exports = productsRouter;

productsRouter.get("/", (req, res) => {
    const limit = req.query.limit;
    let data = productManager.readFile();
    if (!data.length) {
      res.send([]);
  }
    if (limit && !isNaN(Number(limit))) {
      data = data.slice(0, limit);
    }
    res.send(data);
  });
  
  productsRouter.get("/:id", (req, res) => {
    let product = productManager
      .readFile()
      .find((e) => e.id === Number(req.params.id));
    res.send(product);
  });
  
  productsRouter.post("/add", (req, res) => {
    let item = req.body;
   productManager.addProduct(item);
    item ? res.send("Product Add success") : res.status("400").send("Server Error");
  });
  
  productsRouter.put('/update/:id', (req, res) => {
      productManager.updateProduct(Number(req.params.id), req.body);
          res.send(`Product ${req.body.title} Update success`);	
  });
  
  productsRouter.delete('/delete/:id', (req, res) => {
      productManager.deleteProduct(Number(req.params.id));
          res.send("Product Delete success");	
  });
  
  productsRouter.delete('/deleteAll', (req, res) => {
      productManager.deleteAll();
          res.send("All Product Delete success");	
  });
  
  module.exports = productsRouter;