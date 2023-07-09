

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