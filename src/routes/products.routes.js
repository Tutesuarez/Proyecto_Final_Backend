import { Router } from "express";
import { uploader } from "../path.js";
import {
  getProducts,
  addProduct,
  getProductsById,
  updateProduct,
  deleteProduct
} from '../controller/product.controller.js'

const router = Router();

router.get('/:pid', getProductsById)

router.delete('/:pid', deleteProduct)

router.put('/:pid', updateProduct)

router.post('/',uploader.array("thumbnails"), addProduct)

router.get('/', getProducts)



export default router