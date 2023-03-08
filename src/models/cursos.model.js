import mongoose from "mongoose";

const cursosCollection = "cursos"

const cursosSchema = new mongoose.Schema({ //aquí se escriben todas las propiedades que quiero que tenga mi usuario en mi DB
nombre:{type: String, require:true, max:100}, // --> verificaciones
descripcion:{type: String, require:true, max:500},
topico:{ // solo si hay que especificar más detalles se colocan como un objeto
    type:{type: Array, require:true, max:100},
    unique:true,
    index: true, // al colocar el index va a tomar a esta propiedad como índice para la búsqueda. Solo va a buscar en los email, lo que mejora la performance considerablemente. Importante a la hora de tener una cantidad grande de registros.
    // lo mejor es usarlo en un valor que sea relevante para la búsqueda, como un ID
    default:[]
},
profesor:{type: String, require:true, max:100},
//en toda esta estructura lo que hago es, bajo el concepto de Population, decretar que cada elemento que se ingrese al arreglo debe tener un campo "curso", que será el _id que va a ser referencia a la colección "cursos"
estudiantes: {
    type:[{
        estudiante:{
            type:Array,
            default:[]
        }
    }],
}
}) 


export const cursosModel = mongoose.model(cursosCollection,cursosSchema)
// se crea el userModel se genera el modelo funcional de los cursos conectado a la DB, el cursosSchema es el cuerpo del mismo