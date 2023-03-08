const express = require("express");
const { userModel } = require("../models/user.model");
const app = express();
const productsRouter = express.Router();
const { productManager } = require("../scripts/ProductManager");


// productsRouter.get("/", (req, res) => {
//     const limit = req.query.limit;
//     let data = productManager.readFile();
//     if (!data.length) {
//       res.send([]);
//   }
//     if (limit && !isNaN(Number(limit))) {
//       data = data.slice(0, limit);
//     }
//     res.send(data);
//   });
  
//   productsRouter.get("/:id", (req, res) => {
//     let product = productManager
//       .readFile()
//       .find((e) => e.id === Number(req.params.id));
//     res.send(product);
//   });
  
//   productsRouter.post("/add", (req, res) => {
//     let item = req.body;
//    productManager.addProduct(item);
//     item ? res.send("Product Add success") : res.status("400").send("Server Error");
//   });
  
//   productsRouter.put('/update/:id', (req, res) => {
//       productManager.updateProduct(Number(req.params.id), req.body);
//           res.send(`Product ${req.body.title} Update success`);	
//   });
  
//   productsRouter.delete('/delete/:id', (req, res) => {
//       productManager.deleteProduct(Number(req.params.id));
//           res.send("Product Delete success");	
//   });
  
//   productsRouter.delete('/deleteAll', (req, res) => {
//       productManager.deleteAll();
//           res.send("All Product Delete success");	
//   });
  

productsRouter.post('/',async(req,res) => {
  let {nombre,apellido,email} = req.body // 1ro obtengo los datos establecidos en el schema de mongoose
  if (!nombre || !apellido || !emamil || !dni) return res.send({status:"error", error:"Incomplete values"}); //evaluo que existan los valores sino devuelve el error
let result = await userModel.create({
  nombre,
  apellido,
  email
});
res.send({status:"succes",payload:result}) //devuelve el usuario recién creado
});

productsRouter.put('/:uid',async(req,res) => {
  let {uid} = req.params; // obtiene el userId desde los params
  let UserToReplace = req.body; //toma a todo el cuerpo del usuario
  if(!UserToReplace.nombre || !UserToReplace.apellido || !UserToReplace.email || !!UserToReplace.dni) return res.send({status:"error", error:"Incomplete values"})
  try {
    let result = await userModel.updateOne({_id:uid},UserToReplace) // Mongo maneja internamente _id
    res.send({status:"succes",payload:result})  
  } catch (error) {
    console.log(error);
  }
})

productsRouter.delete('/:uid',async(req,res) => {
  let {uid} = req.params; // obtiene el userId desde los params
  try {
    let result = await userModel.deleteOne({_id:uid}) // Mongo maneja internamente _id
    res.send({status:"succes",payload:result})  
  } catch (error) {
   console.log(error);
   res.send({status:"error",error})
  }
})


  module.exports = productsRouter;