class ProductManager {
    products;
    constructor(title, description, price, thumbnail, code, stock){
        this.title = title;
        this.description = description;
        this.price = price;
        this.thumbnail = thumbnail;
        this.code = code;
        this.stock = stock;
        this.products = []
    }
    
    newId(){
return this.products.length ++
    }

    addProduct(title, description, price, thumbnail, code, stock){
        let newProduct = { 
            id = this.newId(),
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        }
        this.products.push(newProduct)
    }

    codeSearch(code){
        let codigo = this.products.find( elem => elem.code == code)
        return codigo;
    }

    validateCode(code) {
if (this.codeSearch() == code) {
    console.log(`el código ${code} ya está ingresado`)
} else {
    this.addProduct()
}
    }

    getProductById (id){
        if (this.products.find( elem => elem.id == id)) {
            return productId;
        } else {
            console.log("Product not found");     
        }
    }

    getProduct(){
        console.log(this.products);
    }
}

const product1 = new ProductManager("Coca-Cola","Bebida gaseosa",300,"---",30098123,100);

product1.addProduct()