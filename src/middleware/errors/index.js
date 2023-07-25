import EErrors from "./enumeration.js";

export default (error, req, res, next) => {
  switch (error.code) {
    case EErrors.INVALID_TYPE_ERROR:
      res.status(400).send({
        status: "error",
        error: error.name,
        description: error.cause,
      });
      break;
    case EErrors.ID_NOT_FOUND:
      res.status(404).send({
        status: "error",
        error: error.name,
        description: error.cause,
      });
      break;
    default:
      res.status(500).send({
        status: "error",
        error: error.name,
        description: error.cause,
      });
      break;
  }
  next();
};