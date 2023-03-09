import { Router } from "express";
import { ecommerceModel } from "../dao/models/user.model";

const router = Router();

router.get('/',async(req,res) => { // al trabajar con mongoose la función SIEMPRE debe ser asíncrona
try {
    let users = await ecommerceModel.find()
    res.send({result:"succes",payload:users})
} catch (error) {
    console.log("Cannot get users with mongoose: " + error)
}
})  

router.post('/',async(req,res) => {
    let {nombre,apellido,email} = req.body // 1ro obtengo los datos establecidos en el schema de mongoose
    if (!nombre || !apellido || !email || !dni) return res.send({status:"error", error:"Incomplete values"}); //evaluo que existan los valores sino devuelve el error
    try {
        let result = await ecommerceModel.create({
            nombre,
            apellido,
            email
          });
          res.send({status:"succes",payload:result}) //devuelve el usuario recién creado
      } catch (error) {
        res.send(error)
      }
  });
  
  
  router.put('/:uid',async(req,res) => {
    let {uid} = req.params; // obtiene el userId desde los params
    let UserToReplace = req.body; //toma a todo el cuerpo del usuario
    if(!UserToReplace.nombre || !UserToReplace.apellido || !UserToReplace.email || !!UserToReplace.dni) return res.send({status:"error", error:"Incomplete values"})
    try {
      let result = await ecommerceModel.updateOne({_id:uid},UserToReplace) // Mongo maneja internamente _id
      res.send({status:"succes",payload:result})  
    } catch (error) {
      console.log(error);
    }
  })
  
  router.delete('/:uid',async(req,res) => {
    let {uid} = req.params; // obtiene el userId desde los params
    try {
      let result = await ecommerceModel.deleteOne({_id:uid}) // Mongo maneja internamente _id
      res.send({status:"succes",payload:result})  
    } catch (error) {
     console.log(error);
     res.send({status:"error",error})
    }
  })

  export default router;