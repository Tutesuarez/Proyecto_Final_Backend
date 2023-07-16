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
    updateProduct as updateProductServices
} from '../services/product.service.js'
import {sendMessage} from '../controller/message.controller.js'

export const addCart = async (req, res) => {
    let resp = await addCartServices();
    resp?.error
        ? res.status(404).send({ status: res.error })
        : res.send({
            status: `The cart was created succesfully.`,
            payload: resp,
        });
}

export const addProductToCart = async (req, res) => {
    const { cid, pid } = req.params;
    let resp = await addProductToCartServices(cid, pid);
    resp?.error
        ? res.status(400).send({ ...resp })
        : res.send({ ...resp });
};


export const getCart = async (req, res) => {
    const { cid } = req.params
    let resp = await getCartServices(cid);
    let resp2 = resp.products
    let prod = JSON.stringify(resp2)
    resp?.error
        ? res.status(404).send(res)
        : res.render('cart',{ products: JSON.parse(prod),cid: cid, title:"FASHION | CART" , style:"home" })
}

export const deleteCart = async (req, res) => {
    const { cid } = req.params;
    let resp = await deleteCart(cid);
    resp?.error
        ? res.status(400).send({ ...resp })
        : res.send({ ...resp });
};

export const updateProduct = async (req, res) => {
    const {cid} = req.params
    const { products } = req.body
    let resp = await updateProductsServices(cid, products);
    resp?.error
        ? res.status(400).send({ ...resp })
        : res.send({ ...resp });
};

// export const updateCart = async (request, response) => {
//     const { cid } = request.params;
//     const { products } = request.body;
//     let res = await CART_SERVICES.updateCart(cid, products);
//     res?.error
//       ? response.status(400).send({ ...res })
//       : response.send({ ...res });
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
//  aca hay que ponerpara que ejecute la ruta de envir email
export const preCheckOut = async (req, res) => {
    const { cid } = req.params
    console.log(cid);
    const {user} = req.session.user;
    const cart = await getCartServices(cid);

    if (cart.products.length > 0) {
        let amount = 0;
        const nonStockProduct = [];
        const purchaser = req.session.user.email;

        for (const { product, quantity } of cart.products) {
            if (product?.stock >= quantity) {
                amount += product.price * quantity;
                product.stock -= quantity;
                console.log(product);
                await updateProductServices(product._id, product);
            } else {
                nonStockProduct.push({ product: product._id, quantity });
            }
        }

        if (amount > 0) {
            code = codeGenerator()
            const resp = await createTicket({ amount, purchaser, code })  
            if (resp?.error) {
                const codigo = resp.code 
                await sendMessage(codigo)
                return res.status(400).send({ ...resp })
            } else {
                await updateProductsServices(cid, nonStockProduct)
                return res.send({ resp, payload: nonStockProduct });
            }
        } else {
            return res.send({ resp: "No products available." })
        }
    } else {
        return res.send({ resp: "There are no products in the cart." })
    }
}
