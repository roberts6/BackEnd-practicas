import mongoose from "mongoose";

const userCollection = "users"

const userSchema = new mongoose.Schema({ //aquí se escriben todas las propiedades que quiero que tenga mi usuario en mi DB
nombre:{type: String, require:true, max:100}, // --> verificaciones
apellido:{type: String, require:true, max:100},
email:{ // solo si hay que especificar más detalles se colocan como un objeto
    type:{type: String, require:true, max:100},
    unique:true,
    index: true // al colocar el index va a tomar a esta propiedad como índice para la búsqueda. Solo va a buscar en los email, lo que mejora la performance considerablemente. Importante a la hora de tener una cantidad grande de registros.
    // lo mejor es usarlo en un valor que sea relevante para la búsqueda, como un ID
}
})


export const userModel = mongoose.model(userCollection,userSchema)
// se crea el userModel se genera el modelo funcional de un usuario conectado a la DB, el userSchema es el cuerpo del mismo