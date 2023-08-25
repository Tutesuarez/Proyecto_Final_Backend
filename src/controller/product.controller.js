import {
    getProducts as getProductsServices,
    addProduct as addProductServices,
    getProductsById as getProductsByIdServices,
    updateProduct as updateProductServices,
    deleteProduct as deleteProductServices
} from '../services/product.service.js'
import generateProduct from "../utils/faker.js"
import CustomError from "../middleware/errors/CustomError.js"
import { generateProductErrorAttributes } from "../middleware/errors/info.js";
import EErrors from '../middleware/errors/enumeration.js'
import { logger } from '../utils/logger.js';


const getProducts = async (req, res) => {
    try {
        let keyword = req.query.keyword
        let limit = parseInt(req.query.limit, 10) || 10
        let page = parseInt(req.query.page, 10) || 1
        const sort = req.query.sort

        console.log(keyword);
        const { docs, hasPrevPage, hasNextPage, nextPage, prevPage } = await getProductsServices(keyword, limit, page, sort)

        const products = JSON.stringify(docs)
        const user = req.session.user


        res.send({ products:docs}).render('index', {
            name: req.session.user.first_name,
            role: req.session.user.role,
            products: JSON.parse(products),
            title: "FASHION PRODUCTS",
            style: "home",
            hasPrevPage,
            hasNextPage,
            nextPage,
            prevPage,
            user: { email: req.session.email, rol: req.session.rol, name: req.session.name },
            logued: true,
        })
        //.send({ status:'success', products: docs})
    } catch (error) {
        if (CustomError.createError(error)) {
            // Registra el error personalizado con información adicional
            logger.error(`Error Personalizado: ${error.name} - ${error.message}`, {
              cause: error.cause,
              code: error.code,
            });
          } else {
            // Registra otros errores normalmente
            logger.error(error);
          }
    }
}


const addProduct = async (req, res) => {
  const {_id} = req.session.user
    const io = req.app.get("socketio")
    const { files, body } = req
    let product = { ...body, status: true }
    let thumbnails = files.map((file) => file.originalname)
    product.thumbnails = thumbnails
    product.owner =_id
    try {
    if (!product.title || !product.description || !product.price || !product.code || !product.status || !product.stock || !product.category) {
        throw CustomError.createError({
            name: "TYPE_ERROR",
            cause: generateProductErrorAttributes(body),
            message: "Error trying to create the product.",
            code: EErrors.INVALID_TYPE_ERROR
        })
    }
   
        const result = await addProductServices(product)
        const result2 = await getProductsServices()
        res.send(result)
        io.emit("products", result2)
    } catch (error) {
        if (CustomError.createError(error)) {
            // Registra el error personalizado con información adicional
            logger.error(`Error Personalizado: ${error.name} - ${error.message}`, {
              cause: error.cause,
              code: error.code,
            });
          } else {
            // Registra otros errores normalmente
            logger.error(error);
          }
    }

}

const getProductsById = async (req, res) => {
    let id = req.params.pid
    try {
        const result = await getProductsByIdServices(id)
        res.send({ status: `success`, product: result })
    } catch (error) {
        if (CustomError.createError(error)) {
            // Registra el error personalizado con información adicional
            logger.error(`Error Personalizado: ${error.name} - ${error.message}`, {
              cause: error.cause,
              code: error.code,
            });
          } else {
            // Registra otros errores normalmente
            logger.error(error);
          }
        res.status(500).send({ error })
    }
};

const updateProduct = async (req, res) => {
    let id = req.params.pid
    const updateObj = req.body
    try {
        const result = await updateProductServices(id, updateObj)
        res.send({ status: "success", payload: result })
    } catch (error) {
        if (CustomError.createError(error)) {
            // Registra el error personalizado con información adicional
            logger.error(`Error Personalizado: ${error.name} - ${error.message}`, {
              cause: error.cause,
              code: error.code,
            });
          } else {
            // Registra otros errores normalmente
            logger.error(error);
          }
        res.status(500).send({ error })
    }
}


// Revisar 
const deleteProduct = async (req, res) => {
  let id = req.params.pid
  const { user } = request.user;
  if(user.role === "premium") { 
    let res = await getProductsById(pid);
    if(res.owner.toString() !== user._id) {
      return response.status(401).send({ error: 'You do not have permissions to perform this action'})
    }
  }
    try {
        const product = await deleteProductServices(id)
        res.send({ status: "success", payload: product })
    } catch (error) {
        if (CustomError.createError(error)) {
            // Registra el error personalizado con información adicional
            logger.error(`Error Personalizado: ${error.name} - ${error.message}`, {
              cause: error.cause,
              code: error.code,
            });
          } else {
            // Registra otros errores normalmente
            logger.error(error);
          }
        res.status(500).send({ error })
    }
}

const getMocksProducts = async (req, res) => {
    let mockproducts = []
    for (let i = 0; i < 100; i++) {
        const product = generateProduct()
        mockproducts.push(product);
    };
    res.json({ sutatus: 'success', payload: mockproducts })
};

export {
    getProducts,
    addProduct,
    getProductsById,
    updateProduct,
    deleteProduct,
    getMocksProducts
}