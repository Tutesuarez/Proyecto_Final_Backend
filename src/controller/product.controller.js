import {
    getProducts as getProductsServices ,
    addProduct as addProductServices,
    getProductsById as getProductsByIdServices,
    updateProduct as updateProductServices,
    deleteProduct as deleteProductServices
} from '../services/product.service.js';

// const getProducts = async (req, res)=>{
//     try {
//         const products = await getProductsServices();
//         res.send({ result: 'success', payload: products});
       
//     } catch (error) {
//         console.log(error);
//         res.status(500).send({ error });
//     }
// };

const getProducts = async(req, res)=>{
    try {
        let keyword = req.query.keyword
        let limit = parseInt(req.query.limit, 10) || 10
        let page = parseInt(req.query.page, 10) || 1
        const sort = req.query.sort
    
        console.log(keyword);
        const{docs,hasPrevPage, hasNextPage, nextPage, prevPage }=await getProductsServices(keyword,limit, page, sort)
    
        const products = JSON.stringify(docs)
        const user = req.session.user
        let admin=''
        if (user.isAdmin===true){
           admin='Admin'
        } else {
          admin='User'
        }
        
        res.render('index',{
          name: req.session.user.first_name,
          admin:admin,
          products:JSON.parse(products),
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


const addProduct =  async (req,res) =>{
    res.render("realTimeProducts", {
        title: "FASHION - Load your products",
        style: "home",
      })
    const {title,description,price,thumbnail,code,stock,category} = req.body
    try {
        const result = await addProductServices(
        {
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
            category,
            status:true,
        }
    )
        res.send({ result: 'success', payload: result});
        
    } catch (error) {
        console.log(error)
        res.status(500).send({ error })
    }
  
}

const getProductsById =  async (req,res) =>{
    let id = req.params.pid;
    try {
        const result = await getProductsByIdServices(id);
        res.send({ result: 'success', payload: result});
    } catch (error) {
        console.log(error);
        res.status(500).send({ error });
    }
};

const updateProduct =  async (req,res)=>{
    let id = req.params.pid;
    const updateObj = req.body;
    try {
        const result = await updateProductServices(id,updateObj);
        res.send({status:"success", payload: result})
    } catch (error) {
        console.log(error);
        res.status(500).send({ error });
    }

};

const deleteProduct = async (req,res) =>{
    let id = req.params.pid;    
    try {
        const product = await deleteProductServices(id);
        res.send({status: "success", payload: product})
    } catch (error) {
        console.log(error);
        res.status(500).send({ error });
    }
}

export {
    getProducts,
    addProduct,
    getProductsById,
    updateProduct,
    deleteProduct
};