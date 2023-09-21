import ProductDTO from "../DTO/product.dto.js"
import ProductManager from "../persistence/MongoDbManagers/ProductManager.js"

const productManager = new ProductManager()

const getProducts = async (keyword, limit, page, sort) =>{
    const products = await productManager.getProducts(keyword, limit, page, sort)
    return products
};

const addProduct = async (newProduct) =>{
    const productByDTO = new ProductDTO(newProduct)
    const productAdded = await productManager.addProduct(productByDTO)
    return productAdded
};

const getProductsById = async (id) =>{
    const product = await productManager.getProductById(id)
    return product
}

const updateProduct = async (id, updateProduct) =>{
    const prodMod =  await productManager.updateProduct(id, updateProduct)
    return prodMod
}

const deleteProduct = async (id) =>{
    const deletedProduct = await productManager.deleteProduct(id)
    return deletedProduct
}

export {
    getProducts,
    addProduct,
    getProductsById,
    updateProduct,
    deleteProduct
}