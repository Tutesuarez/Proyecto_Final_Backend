import { Router } from "express";
import { uploader } from "../path.js";
import { authorizationRole } from "../middleware/session..middleware.js";
import {
  getProducts,
  addProduct,
  getProductsById,
  updateProduct,
  deleteProduct
} from '../controller/product.controller.js'

const router = Router();

router.get('/:pid', authorizationRole(["user", "admin"]), getProductsById)

router.delete('/:pid', authorizationRole(["admin"]), deleteProduct)

router.put('/:pid', authorizationRole(["admin"]), updateProduct)

router.post('/', authorizationRole(["admin"]), uploader.array("thumbnails"), addProduct)

router.get('/', authorizationRole(["user", "admin"]),getProducts)



export default router