import { Router } from "express"
import {getProducts} from '../controller/product.controller.js'
import {  publicAccess, authorizationRole } from "../middleware/session..middleware.js";
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


router.get("/", authorizationRole(["admin", "user"]), getProducts)

router.get("/realtimeproducts", authorizationRole(["admin"]), newProductView)

router.get('/',publicAccess,loginView)

router.get('/register',publicAccess, singUpView)

router.get('/login',publicAccess, loginView)

router.get('/perfil', authorizationRole(["admin", "user"]), perfilView)

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

router.get("/chat", authorizationRole(["user"]), chatView)

export default router;