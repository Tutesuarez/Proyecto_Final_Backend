import { Router } from "express"
import {getProducts} from '../controller/product.controller.js'
import { privateAccess, publicAccess } from "../middleware/session..middleware.js";
import { 
  chatView, 
  errorLoginView, 
  errorSingUpView, 
  loginView, 
  newProductView, 
  perfilView, 
  singUpView 
} from "../controller/view.controller.js"


const router = Router();


router.get("/", privateAccess, getProducts)

router.get("/realtimeproducts",privateAccess, newProductView)

router.get('/', publicAccess,loginView)

router.get('/register', publicAccess, singUpView)

router.get('/login', publicAccess, loginView)

router.get('/perfil', perfilView)

router.get('/errorlogin', errorLoginView) 

router.get('/errorsingup', errorSingUpView)

//  router.get("/realtimeproducts",privateAccess, async (req, res) => {
// //   const io = req.app.get("socketio")
// //   const products = await productManager.getProducts();
  
//    res.render("realTimeProducts", {
//     title: "FASHION - Load your products",
//     style: "home",
//   })
// //   io.on("connection", (socket) => {
// //     console.log("Client Conected")
// //     socket.emit("products", products)
// //   })
//  })




// rever como implificar ruta

router.get("/chat",privateAccess, chatView)

export default router;