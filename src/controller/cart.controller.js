import {
    addCart as addCartServices,
    getCart as getCartServices,
    addProductToCart as addProductToCartServices,
    updateProducts as updateProductsServices,
    updateProductQuantity as updateProductQuantityServices,
    productDelete as productDeleteServices,
    emptyCart as emptyCartServices
} from '../services/cart.service.js'
import { createTicket } from '../services/ticket.service.js'
import {
    getProductsById,
    updateProduct as updateProductServices
} from '../services/product.service.js'
import { sendMessage } from './message.controller.js'
import { codeGenerator } from "../controller/ticket.controller.js"
import { logger } from '../utils/logger.js';


export const addCart = async (req, res) => {
    let resp = await addCartServices(); 
    if (resp?.error) {
      req.logger.error(`ERROR => ${new Date()} - ${ resp.error }`);
      res.status(404).send({ status: resp.error });
    } else {
      return resp
    }
  }

export const addProductToCart = async (req, res) => {
    const { cid, pid } = req.params
    const user = req.session.user
    if(user.role === 'premium') { 
      let resp = await getProductsById(pid);
      if(resp.owner === user._id) {
        return res.status(401).send({error:'You do not have permissions to perform this action'})
      }
    }

    let resp = await addProductToCartServices(cid, pid);
    resp?.error
        ? res.status(400).send({ ...resp })
        : res.send({ ...resp });
};


export const getCart = async (req, res) => {
    const { cid } = req?.user?.cart || req?.params;
    let resp = await getCartServices(cid);
    let resp2 = resp.products
    let prod = JSON.stringify(resp2)
    resp?.error
        ? res.status(404).send(resp)
        : res.send({ status: `success`, payload: resp })
}

export const deleteCart = async (req, res) => {
    const { cid } = req.params;
    let resp = await deleteCart(cid);
    resp?.error
        ? res.status(400).send({ ...resp })
        : res.send({ ...resp });
};

export const updateProduct = async (req, res) => {
    const { cid } = req.params
    const { products } = req.body
    let resp = await updateProductsServices(cid, products);
    resp?.error
        ? res.status(400).send({ ...resp })
        : res.send({ ...resp });
};

// export const updateCart = async (req, res) => {
//     const { cid } = req.params;
//     const { products } = req.body;
//     let resp = await CART_SERVICES.updateCart(cid, products);
//     resp?.error
//       ? res.status(400).send({ ...res })
//       : res.send({ ...res });
//   };

export const updateProductQuantity = async (req, res) => {
    const { cid, pid } = req.params;
    const { quantity } = req.body;
    let resp = await updateProductQuantityServices(cid, pid, quantity);
    resp?.error
        ? res.status(400).send({ ...resp })
        : res.send({ ...resp });
};


export const productDelete = async (req, res) => {
    const { cid, pid } = req.params;
    let resp = await productDeleteServices(cid, pid);
    resp?.error
        ? res.status(400).send({ ...resp })
        : res.send({ ...resp });
};

export const emptyCart = async (req, res) => {
    const { cid } = req.params;
    let resp = await emptyCartServices(cid);
    resp?.error
        ? res.status(400).send({ ...resp })
        : res.render('cart');
};

export const preCheckOut = async (req, res) => {
    const { cid } = req.params;
    console.log(cid);
    try {
        const cart = await getCartServices(cid);
        if (cart.products.length === 0) {
            return res.send({ resp: "There are no products in the cart." });
        }

        let amount = 0;
        const nonStockProduct = [];
        const purchaser = req.session.user.email;

        const updateProductPromises = cart.products.map(async ({ product, quantity }) => {
            if (product?.stock >= quantity) {
                amount += product.price * quantity;
                product.stock -= quantity;
                await updateProductServices(product._id, product);
            } else {
                nonStockProduct.push({ product: product._id, quantity });
            }
        });

        await Promise.all(updateProductPromises);
        console.log('after promises');

        if (amount > 0) {
            const code = codeGenerator();
            logger.info(`INFO => ${new Date()} - New purchase: ${amount+purchaser+code}`);
            const resp = JSON.stringify(await createTicket({ amount, purchaser, code }))
            const resp2 = JSON.parse(resp)

            if (resp2?.error) {
                return res.status(400).send({ ...resp2 });
            } else {
                const { purchaser: email, code, amount } = resp2

                try {
                    await updateProductsServices(cid, nonStockProduct);
                    await sendMessage(email,code,amount)
                     return res.render('order', {resp2})
                } catch (error) {
                    return res.status(500).json({ message: error.message })
                }
            }
        } else {
            return res.send({ resp: "No products available." });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}
