import { resetRecoverPass, urlCheckReset } from "../services/session.service.js"
import CustomError from "../middleware/errors/CustomError.js"
import { logger } from '../utils/logger.js'
import{ getProducts as getProductsServices} from '../services/product.service.js'
import { getCart } from "../services/cart.service.js"


export const newProductView = async (req, res) => {
    res.render("realTimeProducts", {
      title: "Product Loader",
      style: "home",
      logued: true,
    })
  }

  export const productViewer = async (req, res) => {
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
            cart: user.cart
        })
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
      

  export const loginView = async(req, res)=>{
    res.render("login",{ 
        title: "LogIn",
        style:"home"
    })
  }

  export const singUpView = async(req, res)=>{
    res.render("register", {
        title: "SingUp",
        style :"home"
    })
  }

  export const perfilView =  async (req, res) => { 
    const user = req.session.user
    res.render('perfil',
    {
      user,
      title: "User",
      style: "home",
      logued: true,
    })
  }

  export const errorLoginView =async (req,res)=>{
    res.render('errorLogin')
  }

  export const errorSingUpView =async (req,res)=>{
    res.render('errorSingup')
  }

  export const chatView = async (req, res) => {
    res.render("chat", {
        title: 'Chat Rooms',
         style: "chatStyles" 
    })
  }

  export const resetPasswordView = async (req, res) => {
    let { idurl } = req.params
    let result = await urlCheckReset(idurl);
    if(!result?.email) {
      res.redirect("/recoverpassword")
      return
    }
    let create = new Date(result.recover_password.createTime);
    let now = new Date();
    let minutes = (now.getTime()-create.getTime()) / 1000 / 60;
    if(minutes > 60) {
      await resetRecoverPass(result.email)
      res.redirect("/login")
      return
    }
    res.render('resetpassword', {
      title: "Reset Password",
      style: "home",
      logued: false,
      email: result.email,
      idurl: result.recover_password.id_url
    })
  }
  
  export const recoverPassword = async (req, res) => {
    res.render('recoverpassword', {
      title: "Recover Password",
      style: "home",
      logued: false,
    })
  }
  
  export const registerView = async (req, res) => {
    if (req.user?.email) return res.redirect("/products")
    res.render('register', {
      title: "Registro",
      style: "home",
      logued: false,
    })
  }

  export const cartView = async (req, res) => {
    const {user} = req.user;
    const cid = user.cart;
    let { products, _id } = await getCart(cid);
    let prod = JSON.stringify(products)

    res.render("cart", {
      title: "FASHION | CART",
      style: "home",
      products: JSON.parse(prod),
      cid:_id,
      display: products.length > 0 ? true : false,
      logued: true,
    });
  };
  