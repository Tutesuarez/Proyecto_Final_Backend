import { Router } from "express"
import { authorizationRole } from "../middleware/session..middleware.js";
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

router.get("/:cid", authorizationRole(["user","premium"]), getCart)

router.post("/:cid/products/:pid", authorizationRole(["user", "premium"]), addProductToCart)

router.put("/:cid", authorizationRole(["user", "premium"]), updateProduct);

router.put("/:cid/products/:pid", authorizationRole(["user", "premium"]), updateProductQuantity);

router.delete("/:cid/products/:pid", authorizationRole(["user", "premium"]), productDelete);

router.get('/:cid/empty', authorizationRole(["user","premium"]), emptyCart)

router.get('/:cid/purchase', authorizationRole(["user","premium"]), preCheckOut)


export default router