export const publicAccess = (req, res, next) =>{
    if(req.session.user) return res.redirect('/')
    next();
  }
  
  export const privateAccess = (req, res, next) =>{
    if(!req.session.user) return res.redirect('/login')
    next();
  }