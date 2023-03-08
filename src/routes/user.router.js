import { Router } from "express";
import { userModel } from "../models/user.model";

const router = Router();

router.get('/',async(req,res) => { // al trabajar con mongoose la función SIEMPRE debe ser asíncrona
try {
    let users = await userModel.find()
    res.send({result:"succes",payload:users})
} catch (error) {
    console.log("Cannot get users with mongoose: " + error)
}
})