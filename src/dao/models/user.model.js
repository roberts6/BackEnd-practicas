import mongoose from "mongoose";

const ecommerceCollection = "ecommerce"

const ecommerceSchema = new mongoose.Schema({ //aquí se escriben todas las propiedades que quiero que tenga mi usuario en mi DB
nombre:{type: String, required:true, max:100}, // --> verificaciones
apellido:{type: String, required:true, max:100},
email:{ // solo si hay que especificar más detalles se colocan como un objeto
    type:{type: String, required:true, max:100},
    unique:true,
    index: true // al colocar el index va a tomar a esta propiedad como índice para la búsqueda. Solo va a buscar en los email, lo que mejora la performance considerablemente. Importante a la hora de tener una cantidad grande de registros.
    // lo mejor es usarlo en un valor que sea relevante para la búsqueda, como un ID
},
//en toda esta estructura lo que hago es, bajo el concepto de Population, decretar que cada elemento que se ingrese al arreglo debe tener un campo "curso", que será el _id que va a ser referencia a la colección "cursos"
cursos: {
    type:[{
        curso:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'cursos'
        }
    }],
    default:[]
}
}) 


export const ecommerceModel = mongoose.model(ecommerceCollection, ecommerceSchema)
// se crea el ecommerceModel se genera el modelo funcional de un producto,usuario o lo que sea conectado a la DB, el ecommerceSchema es el cuerpo del mismo