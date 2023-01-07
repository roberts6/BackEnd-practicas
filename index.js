class ProductManager {
    products;

    constructor(){
        this.products = []
    }
    
    newId(){
return this.products.length + 1
    }

    addProduct(title, description, price, thumbnail, code, stock){
      if (title && description && price > 0 && thumbnail && code && stock && this.CodeValidation(code)) {
        let product = {
            id: this.newId(),
            title,
             description,
             price,
             thumbnail,
             code,
             stock
        }  
        this.products.push(product)
      } else {
          console.log("Validar campos");         
      }  
    }

    CodeValidation(code) {
        let resultado = true;
        let equalCode = this.products.find(product => product.code == code)
if (equalCode) {
    resultado = false
    console.log(`el código ${code} ya está ingresado y corresponde a ${equalCode.title}`)
} else {
    return resultado;
}
    }

    getProductById (id){
        let product = this.products.find( product => product.id == id)
        // if (product) {
        //     console.log(`El ID seleccionado corresponde a: ${product.title}`);
        // } else {
        //     console.log("Product not found");     
        // }
        product ? console.log(`El ID seleccionado corresponde a: ${product.title}`): console.log("Product not found");
    }

    getProduct(){
        console.log(this.products);
    }
}

let productManager = new ProductManager();

productManager.addProduct("Coca-Cola","Bebida gaseosa",300,"---",30098123,100),
productManager.addProduct("Seven-up","Bebida gaseosa",280,"---",30098124,120),
productManager.addProduct("Paso de los toros","Bebida gaseosa",280,"---",30098123,120),
productManager.addProduct("Mirinda","Bebida gaseosa",280,"---",30098127,120),
productManager.addProduct("Pan con salame","Panadería",280,"---",30098121),
productManager.getProduct()
productManager.getProductById(2)