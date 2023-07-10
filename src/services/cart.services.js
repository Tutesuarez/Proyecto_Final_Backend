import CartManager from "../persistence/MongoDbManagers/CartManager.js"


const cartManager = new CartManager()

export const addCart = async () => {
    const creatcart = await cartManager.addCart()
    return creatcart
}

export const getCarts = async () => {
    const getcarts = await cartManager.getCarts()
    return getcarts
}

export const getCart = async (id) => {
    const getcarts = await cartManager.getCart(id)
    return getcarts
}

export const addProductToCart = async (cid, pid, quantity) => {
    const addproducttocart = await cartManager.addProductToCart(cid, pid, quantity)
    return addproducttocart
}

export const updateProducts = async (cid, products) => {
    const updateproducts = await cartManager.updateProducts(cid, products)
    return updateproducts
}

export const updateProductQuantity = async (cid, pid, quantity) => {
    const updateproductquantity = await cartManager.updateProductQuantity(cid, pid, quantity)
    return updateproductquantity
}

export const productDelete = async (cid, pid) => {
    const deletproduct = await cartManager.productDelete(cid, pid)
    return deletproduct
}

export const emptyCart = async (cid) => {
    const emptycart = await cartManager.emptyCart(cid)
    return emptycart
}