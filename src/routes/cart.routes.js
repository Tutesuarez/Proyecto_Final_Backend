import { Router } from "express"
import { authorizationRole } from "../middleware/session..middleware.js";
import {
  addCart, 
  getCart, 
  addProductToCart, 
  updateProductQuantity, 
  productDelete,
  emptyCart,
  updateProduct,
  preCheckOut
} from '../controller/cart.controller.js'

const router = Router()


// router.post("/", async (req, res) => {
//   let resp = await cartManager.addCart()
//   res.send({ resp })
// })

// router.get("/:cid", async (req, res) => {
//   let { cid } = req.params
//   let resp = await cartManager.getCart(cid)

//   resp?.error
//     ? res.status(404).send({ resp })
//     :res.send({ cart: resp }) 
// })

// router.post("/:cid/products/:pid", async (req, res) => {
//   let { cid, pid } = req.params
//   let resp = await cartManager.addProductToCart(cid, pid, req.body.quantity)
//   resp?.error
//     ? res.status(400).send({ ...resp })
//     : res.send({ ...resp })
// })

// router.put("/:cid", async (req, res) => {
//   const { cid } = req.params;
//   const { products } = req.body;
//   let resp = await cartManager.updateProducts(cid, products);
//   resp?.error
//     ? res.status(400).send({ ...resp })
//     : res.send({ ...resp });
// });

// router.put("/:cid/products/:pid", async (req, res) => {
//   const { cid, pid } = req.params;
//   const { quantity } = req.body;
//   let resp = await cartManager.updateProductQuantity(cid, pid, quantity);
//   resp?.error
//     ? res.status(400).send({ ...resp })
//     : res.send({ ...resp });
// });

// router.delete("/:cid/products/:pid", async (req, res) => {
//   const { cid, pid } = req.params;
//   let resp = await cartManager.productDelete(cid, pid);
//   resp?.error
//     ? res.status(400).send({ ...resp })
//     : res.send({ ...resp });
// });

// //Empty Cart
// router.delete('/:cid', async (req,res)=>{
//   const id = req.params.cid;
//   try {
//       const emptyCart = await cartManager.emptyCart(id);
//       res.send({result: 'success', payload: emptyCart});
//   } catch (error) {
//       console.log(error);
//       res.status(500).send({ error });
//   }
// })


/////

router.post("/", authorizationRole(["user"]), addCart)

router.get("/:cid", authorizationRole(["user"]), getCart)

router.post("/:cid/products/:pid", authorizationRole(["user"]), addProductToCart)

router.put("/:cid", authorizationRole(["user"]), updateProduct);

router.put("/:cid/products/:pid", authorizationRole(["user"]), updateProductQuantity);

router.delete("/:cid/products/:pid", authorizationRole(["user"]), productDelete);

router.get('/:cid/empty', authorizationRole(["user"]), emptyCart)

router.get('/:cid/pucharse', authorizationRole(["user"]), preCheckOut)


export default router