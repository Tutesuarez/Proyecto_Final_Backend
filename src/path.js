import { fileURLToPath } from "url"
import { dirname } from "path"
import multer from "multer"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const storage = multer.diskStorage({
  destination: function (request, file, cb) {
    const { type } = request.headers
    if (type === 'products' ) cb(null, `${__dirname}/public/images/products`);
    if (type === 'profile' ) cb(null, `${__dirname}/public/images/profile`);
    if (type === 'documents' ) cb(null, `${__dirname}/public/images/documents`);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  },
});

const uploader = multer({ storage })

export { __dirname, uploader }