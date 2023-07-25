import { Router } from "express";
import { getMocksProducts} from '../controller/product.controller.js'

const routerFakeProducts = Router()

routerFakeProducts.get('/', getMocksProducts)

export default routerFakeProducts