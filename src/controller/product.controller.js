import {
    getProducts as getProductsServices,
    addProduct as addProductServices,
    getProductsById as getProductsByIdServices,
    updateProduct as updateProductServices,
    deleteProduct as deleteProductServices
} from '../services/product.service.js'

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

        res.render('index', {
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
    } catch (error) {
        console.log(error)
        res.status(500).send({ error })
    }
}


const addProduct = async (req, res) => {
    const io = req.app.get("socketio")
    const{files, body} = req
    let product = {...body, stusus:true}
    let thumbnails = files.map((file) => file.originalname)
    product.thumbnails = thumbnails
try {
    const result =  await addProductServices(product)
    const result2 = await getProductsServices()
    res.send(result)
    io.emit("products", result2)
} catch (error) {
        console.log(error)
        res.status(500).send({ error })
    }

}

const getProductsById = async (req, res) => {
    let id = req.params.pid
    try {
        const result = await getProductsByIdServices(id)
        res.send({ result:'success', payload: result })
    } catch (error) {
        console.log(error)
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
        console.log(error)
        res.status(500).send({ error })
    }
}

const deleteProduct = async (req, res) => {
    let id = req.params.pid
    try {
        const product = await deleteProductServices(id)
        res.send({ status: "success", payload: product })
    } catch (error) {
        console.log(error)
        res.status(500).send({ error })
    }
}

export {
    getProducts,
    addProduct,
    getProductsById,
    updateProduct,
    deleteProduct
}