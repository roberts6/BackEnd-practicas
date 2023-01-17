const fs = require('fs');

class ProductManager {
    products;

    constructor(path){
        //this.products = []
        this.path = path;
    }
    
//     newId(){
// return this.products.length + 1
//     }

    // addProduct(title, description, price, thumbnail, code, stock){
    //   if (title && description && price > 0 && thumbnail && code && stock && this.CodeValidation(code)) {
    //     let product = {
    //         id: this.newId(),
    //         title,
    //          description,
    //          price,
    //          thumbnail,
    //          code,
    //          stock
    //     }  
    //     this.products.push(product)
    //   } else {
    //       console.log("Validar campos");         
    //   }  
    // }

    async addProduct(title, description, price, thumbnail, code, stock) {
        try {
            if (!title || !description || !price || !thumbnail || !code || !stock) throw new Error('All fields are required');

            let products = await this.getProducts();
            let maxId = 0;

            if (!products == []){
                if (products.some(product => product.code === code)) throw new Error("Code already exists.");
                products.forEach(product => { if (product.id > maxId) maxId = product.id} );
            }

            maxId++
            
            let newProduct = { id: maxId, title, description, price, thumbnail, code, stock };
            products.push(newProduct);
            await fs.promises.appendFile(this.path, JSON.stringify(products));
            return console.log("successfully added");
        } catch (error) {
            console.error(error);
        }
    }

//     CodeValidation(code) {
//         let resultado = true;
//         let equalCode = this.path.find(product => product.code == code)
// if (equalCode) {
//     resultado = false
//     console.log(`el código ${code} ya está ingresado y corresponde a ${equalCode.title}`)
// } else {
//     return resultado;
// }
//     }

    // getProductById (id){
    //     let product = this.products.find( product => product.id == id)
    //     product ? console.log(`El ID seleccionado corresponde a: ${product.title}`): console.log("Product not found");
    // }

    async getProductById(id) {
        try {
            let products = await this.getProducts();
            let product = products.find(product => product.id === id);
            if (!product) throw new Error("Not found.");
            return product;
        } catch (error) {
            console.error(error)
        }
    }

    // getProduct(){
    //     console.log(this.products);
    //}
    async getProducts() {
        try {
            let products = await fs.promises.readFile(this.path, "utf8");
            return JSON.parse(products);
        } catch (error) {
            console.error(error);
        }
    }

    async updateProduct(id, { title, description, price, thumbnail, code, stock }) {
        try {
            let products = await this.getProducts();
            let index = products.findIndex(product => product.id === id);
            if (index === -1) throw new Error("Not found.");
            if (products.some(product => product.code === code)) throw new Error("Code already exists.");
            let productToUpdate = { id, title, description, price, thumbnail, code, stock }
            products[index] = productToUpdate;
            await fs.promises.writeFile(this.path, JSON.stringify(products));
            return console.log("successfully updated");
        } catch (error) {
            console.error(error);
        }
    }

    async deleteProduct(id) {
        try {
            let products = await this.getProducts();
            let index = products.findIndex(product => product.id === id);
            if (index === -1) throw new Error("Not found.")
            products.splice(index, 1);
            await fs.promises.writeFile(this.path, JSON.stringify(products));
            return console.log("successfully deleted");
        } catch (error) {
            console.error(error);
        }
    }
}

let productManager = new ProductManager("product.json");

// productManager.addProduct("Coca-Cola","Bebida gaseosa",300,"---",30098123,100),
// productManager.addProduct("Seven-up","Bebida gaseosa",280,"---",30098124,120),
// productManager.addProduct("Paso de los toros","Bebida gaseosa",280,"---",30098123,120),
// productManager.addProduct("Mirinda","Bebida gaseosa",280,"---",30098127,120),
// productManager.addProduct("Pan con salame","Panadería",280,"---",30098121),
// productManager.getProduct()
// productManager.getProductById(2)

productManager.addProduct(
  "Coca-Cola",
  "Bebida gaseosa",
  300,
  "----",
  30098123,
  100
);



//productManager.deleteProduct(1)