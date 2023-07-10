import {
    addCart as addCartServices,
    getCart as getCartServices,
    addProductToCart as addProductToCartServices,
    updateProducts as updateProductsServices,
    updateProductQuantity as updateProductQuantityServices,
    productDelete as productDeleteServices,
    emptyCart as emptyCartServices
} from '../services/cart.services.js'


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
    resp?.error
        ? res.status(404).send({ res })
        : res.send({ status: `success`, payload: resp });
}

export const deleteCart = async (req, res) => {
    const { cid } = req.params;
    let resp = await CART_SERVICES.deleteCart(cid);
    resp?.error
        ? res.status(400).send({ ...resp })
        : res.send({ ...resp });
};

export const updateProduct = async (req, res) => {
    const { cid } = req.params;
    const { products } = req.body;
    let resp = await updateProductsServices(cid, products);
    resp?.error
        ? res.status(400).send({ ...resp })
        : res.send({ ...resp });
};

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
        : res.send({ ...resp });
};