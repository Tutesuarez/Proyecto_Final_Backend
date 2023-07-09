import ProductManager from "../persistence/MongoDbManagers/ProductManager.js"

const productManager = new ProductManager()

// export const addProduct = async()=>{
//     try {
//         const product = productModel.addProduct()
//     } catch (error) {
//         return error
//     }
// }

// export const findallproducts = async ()=>{
//     try {
//         const products = productManager.getProducts()
//         return products
//     } catch (error) {
//         return error
//     }
// }

// export const findProductByID = async(id)=>{
//     try {
//         const product = productManager.getProductById(id)
//     } catch (error) {
//         return error
//     }
// }


////  nuevo ///
const getProducts = async (limit, page, sort) =>{
    const products = await productManager.getProducts(limit, page, sort);
    return products;
};

const addProduct = async (newProduct) =>{
    const productAdded = await productManager.addProduct(newProduct);
    return productAdded;
};

const getProductsById = async (id) =>{
    const product = await productManager.getProductsById(id)
    return product;
};

const updateProduct = async (id, updateProduct) =>{
    const prodMod =  await productManager.updateProduct(id, updateProduct);
    return prodMod;
};

const deleteProduct = async (id) =>{
    const deletedProduct = await productManager.deleteProduct(id)
    return deletedProduct;
};

export {
    getProducts,
    addProduct,
    getProductsById,
    updateProduct,
    deleteProduct
};