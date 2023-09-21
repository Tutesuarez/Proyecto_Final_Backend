import { Router } from "express"
import {authorizationRole, passportCall, passportCallRedirect } from "../middleware/session..middleware.js"
import { 
  chatView, 
  errorLoginView, 
  errorSingUpView, 
  loginView, 
  newProductView, 
  perfilView, 
  singUpView,
  resetPasswordView,
  recoverPassword,
  productViewer,
  cartView,
  usersView
} from "../controller/view.controller.js"



const router = Router();


router.get('/', passportCallRedirect("jwt"), loginView)

router.get('/login', passportCallRedirect("jwt"), loginView)

router.get("/products", authorizationRole(["admin", "user", "premium"]), productViewer)

router.get("/realtimeproducts",passportCall("jwt"), authorizationRole(["admin", "premium"]), newProductView)

router.get('/register',passportCallRedirect("jwt"), singUpView)

router.get('/perfil', passportCall("jwt"), authorizationRole(["admin", "user", "premium"]), perfilView)

router.get("/carts", passportCall("jwt"), authorizationRole(["user", "admin","premium"]), cartView);

router.get('/errorlogin', errorLoginView) 

router.get('/errorsingup', errorSingUpView)

router.get("/resetpassword/:idurl", resetPasswordView)

router.get("/recoverpassword", recoverPassword)

router.get("/users", passportCall("jwt"), authorizationRole(["admin"]), usersView)

router.get("/chat",passportCall("jwt"), authorizationRole(["user", "premium"]), chatView)


export default router;