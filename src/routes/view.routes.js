import { Router } from "express"
import {getProducts} from '../controller/product.controller.js'
import {authorizationRole, passportCall, passportCallRedirect } from "../middleware/session..middleware.js";
import { 
  chatView, 
  errorLoginView, 
  errorSingUpView, 
  loginView, 
  newProductView, 
  perfilView, 
  singUpView,
  resetPasswordView,
  recoverPassword
} from "../controller/view.controller.js"



const router = Router();


router.get("/", authorizationRole(["admin", "user", "premium"]), getProducts)

router.get('/', loginView)

router.get('/login', loginView)

router.get("/realtimeproducts", authorizationRole(["admin", "premium"]), newProductView)

router.get('/register', singUpView)

router.get('/perfil', authorizationRole(["admin", "user", "premium"]), perfilView)

router.get('/errorlogin', errorLoginView) 

router.get('/errorsingup', errorSingUpView)

router.get("/resetpassword/:idurl", resetPasswordView)

router.get("/recoverpassword", recoverPassword)

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

router.get("/chat", authorizationRole(["user", "premium"]), chatView)

export default router;