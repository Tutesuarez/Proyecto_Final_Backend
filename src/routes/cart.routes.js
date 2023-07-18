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



router.post("/", authorizationRole(["user"]), addCart)

router.get("/:cid", authorizationRole(["user"]), getCart)

router.post("/:cid/products/:pid", authorizationRole(["user"]), addProductToCart)

router.put("/:cid", authorizationRole(["user"]), updateProduct);

router.put("/:cid/products/:pid", authorizationRole(["user"]), updateProductQuantity);

router.delete("/:cid/products/:pid", authorizationRole(["user"]), productDelete);

router.get('/:cid/empty', authorizationRole(["user"]), emptyCart)

router.get('/:cid/purchase', authorizationRole(["user"]), preCheckOut)


export default router