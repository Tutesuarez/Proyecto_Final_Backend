export const publicAccess = (req, res, next) =>{
    if(req.session.user) return res.redirect('/')
    next();
  }
  
  // ELIMINAR antes de entregar 
  // export const privateAccess = (req, res, next) =>{
  //   if(!req.session.user) return res.redirect('/login')
  //   next();
  // }

  //REVISAR COMO EJECUTAR CORRECTAMENTE CONTROL DE ROLES
  export const authorizationRole = (role) => {
    return async (req, res, next) => {
      const user = req.session.user;
      if (!user) {
        next();
      } else {
        if (!Array.isArray(role)) role = [role];
        if (role.includes(user.role)) {
          next(); // Pasar al siguiente middleware o ruta
        } else {
          res.status(401).send({ error: 'Unauthorized' });
        }
      }
    };
  };
  
  