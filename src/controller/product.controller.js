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
import { findById } from '../services/user.service.js';
import { transporter } from '../utils/nodemailer.js';



const getProducts = async (req, res) => {
    try {
        let keyword = req.query.keyword
        let limit = parseInt(req.query.limit, 10) || 10
        let page = parseInt(req.query.page, 10) || 1
        const sort = req.query.sort

        console.log(keyword);
        const {docs} = await getProductsServices(keyword, limit, page, sort)

        res.send({ status:'success', products: docs})
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

const getProductsById =async (id, res) => {
   //let pid = req.params
  
   console.log('recibo',id);
    try {
        const result = await getProductsByIdServices(id)
        return result
       // res.send({status:'success', product: result })
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
        //res.status(500).send({ error })
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

const deleteProduct = async (req, res) => {
  const {user}= req.session
  let id = req.params.pid
  try {
    let product_by_id = await getProductsById(id) 
    if(user.role === "premium") { 
      if(product_by_id.owner.toString() !== user._id) {
        return res.status(401).send({ error: 'You do not have permissions to perform this action'})
      }
    }
        const product = await deleteProductServices(id)
        // res.send({ status: "success", payload: product })
        if(product?.error) {
          res.send({ status: "error", payload: product.error });
        } else {
          let owner = await findById(product_by_id.owner);
          if (owner.role === "premium") {
            await transporter.sendMail({
              from: "FASHION <be.creativedesing@gmail.com>",
              to: owner.email,
              subject: "Producto eliminado.",
              html: `<p>Your product ${product_by_id.title} has been removed.</p>`,
            });
          }
          res.send({
            status: "success",
            payload: "The product was successfully removed",
          })
    }} catch (error) {
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
       // res.status(500).send({ error })
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