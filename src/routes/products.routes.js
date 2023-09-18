import { Router } from "express";
import { uploader } from "../path.js";
import { authorizationRole,passportCall } from "../middleware/session..middleware.js";
import {
  getProducts,
  addProduct,
  getProductsById,
  updateProduct,
  deleteProduct,
} from '../controller/product.controller.js'
import errorHandler from '../middleware/errors/index.js'

const router = Router();

router.get('/:pid', authorizationRole(["user", "admin", "premium"]), getProductsById)

router.delete('/:pid',passportCall("jwt"), authorizationRole(["admin", "premium"]), deleteProduct)

router.put('/:pid', authorizationRole(["admin", "premium"]), updateProduct)

router.post('/', authorizationRole(["admin", "premium"]), uploader.array("thumbnails"), addProduct)

router.get('/', authorizationRole(["user", "admin", "premium"]),getProducts)

router.use(errorHandler)



export default router