import passport from "passport";


  export const passportCall = (strategy) => {
    return async (req, res, next) => {
      passport.authenticate(
        strategy,
        { session: false },
        function (error, user, info) {
          if (error) return next(error);
          if (!user)
            return res
              .status(401)
              .send({ error: info.messages ? info.messages : info.toString() });
          req.user = user;
          next();
        }
      )(req, res, next);
    };
  };
  
  // ! Función para redireccionar si el usuario esta logueado.
  export const passportCallRedirect = (strategy) => {
    return async (req, res, next) => {
      passport.authenticate(
        strategy,
        { session: false },
        function (error, user, info) {
          if (user) {
            req.user = user;
            return res.redirect("/products");
          }
          next();
        }
      )(req, res, next);
    };
  };
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
  
