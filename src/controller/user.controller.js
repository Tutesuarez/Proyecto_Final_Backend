import { findall, createOne, findById, uploadDocument } from "../services/user.service.js"


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
    user ? res.status(200).json({ message: 'User found: ', user }) : res.status(400).json({ message: 'User not Found' })
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

export const uploadDocuments = async (req, res) => {
  const { uid } = req.params;
  const { files } = req;
  try {
    let documents = [];
    files.forEach((file) => {
      documents.push({ name: file.fieldname, reference: file.filename });
    });
    let result = await uploadDocument(uid, documents)
    res.send({status: 'success',payload: result});
  } catch (error) {
    res.status(500).send({status: 'error', payload:"There was an error uploading the documents"});
  }
}

// // Limpiar
// export const getUser = async (req, email) => {
//   try {
//     let user = await userModel.findOne({ email: email }, { __v: 0 }).lean()
//     if (!user) throw new Error(`User not exists.`)
//     return res.json(user);
//   } catch (error) {
//     return res.status(400).json({ error: error.message });
//   }
// }
