import { resetRecoverPass, urlCheckReset } from "../services/session.service.js"


export const newProductView = async (req, res) => {
    res.render("realTimeProducts", {
      title: "Product Loader",
      style: "home",
    })
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

  // export const logoutView = async (request, response) => {
  //   response.clearCookie("tokenBE").redirect("/login");
  // };