const { Router } = require ('express')
const cartRouter = Router();

const { cartManager } = require("../scripts/cartManager");

cartRouter.get("/:cid", function (req, res) {
  let cart = cartManager
    .readFile()
    .find((e) => e.id === Number(req.params.cid));
  res.send(cart);
});

cartRouter.post("/", (req, res) => {
   cartManager.addCart();
      res.send("Cart Add success");
  });

  cartRouter.post("/:cid/product/:pid", (req, res) => {
    const carritoId = +req.params.cid;
    const productoId = +req.params.pid;
    let cart = cartManager.readFile().find((e) => e.id === carritoId);
    
     cart ? cartManager.addProductCart(carritoId,productoId) && res.send("Cart Add success") : res.send("No cart to add")
    } 


module.exports = cartRouter;