// llamada a express
const express = require("express")
const app = express()

// rutas
app.get('/', (req, res) => {
res.send('Raiz del proyecto')
})

app.get('/products', (req, res) => {
res.send('Raiz del proyecto')
})

// chequeo de servidor y manejo de error
const server = app.listen(8080, () => console.log("server listening on port 8080"));
server.on("error", error => console.log(error));




