import { findall, findOne, createOne, findById } from "../services/user.service.js"

import { userModel } from "./models/user.model.js"

// export const createUser = async (req, res) => {
//     try {
//         const newUser = new userModel({
//           first_name: req.body.first_name,
//           last_name: req.body.last_name,
//           email: req.body.email,
//           gender: req.body.gender,
//           password: req.body.password,
//         });
//         let result = await userModel.updateOne(
//           { $push: {first_name, last_name, email, gender, password } } 
//         )
//         await newUser.save()
//         res.redirect('/')
//       } catch (error) {
//         console.error(error)
//         res.status(500).send('Hubo un error al crear el usuario');
//       }
//     res.send({ status: "success", message: "Usuario creado" }).redirect('/login')
// }

export const findAllUsers = async (req, res) => {
  try {
    const users = await findall()
    users.lenght ? res.status(200).json({ message: 'Users found', users }) : res.status(200).json({ message: 'Not users founded' })

  } catch (error) {
    res.status(500).json({ error })
  }
}

export const findOneUser = async (req, res) => {
  const { id } = req.params
  try {
    const user = await findById(id)
    if (user) {
      res.status(200).json({ message: 'User found: ', user })
    } else {
      res.status(400).json({ message: 'User not Found' })
    }
  } catch (error) {
    res.status(500).json({ error })
  }
}
export const createOneUser = async (req, res) => {
  const { first_name, last_name, email, gender, password } = req.body
  if (!first_name || !last_name || !email || !gender || !password) {
    return res.status(400).json({ message: ' Data missing' })
  }

  try {
    const newUser = await createOne(req.body)
    res.status(200).json({ message: 'User created', user: newUser })
  } catch (error) {
    res.status(500).json({ error })
  }
}


// Chequear luego si esto queda
export const getUser = async (req, email) => {
  try {
    let user = await userModel.findOne({ email: email }, { __v: 0 }).lean()
    if (!user) throw new Error(`User not exists.`)
    return res.json(user);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
}
