import { Router } from "express"
import { authorizationRole, passportCall } from "../middleware/session..middleware.js";
import {
  addCart, 
  getCart, 
  addProductToCart, 
  updateProductQuantity, 
  productDelete,
  emptyCart,
  updateProduct,
  preCheckOut
} from '../controller/cart.controller.js'

const router = Router()


router.post("/", authorizationRole(["user", "premium"]), addCart)

router.get("/:cid?",passportCall("jwt"), authorizationRole(["user","premium"]), getCart)

router.post("/:cid/products/:pid",passportCall("jwt"), authorizationRole(["user", "premium"]), addProductToCart)

router.put("/:cid",passportCall("jwt"), authorizationRole(["user", "premium"]), updateProduct);

router.put("/:cid/products/:pid",passportCall("jwt"), authorizationRole(["user", "premium"]), updateProductQuantity);

router.delete("/:cid/products/:pid",passportCall("jwt"), authorizationRole(["user", "premium"]), productDelete);

router.get('/:cid/empty',passportCall("jwt"), authorizationRole(["user","premium","admin"]), emptyCart)

router.get('/:cid/purchase',passportCall("jwt"), authorizationRole(["user","premium"]), preCheckOut)


export default router