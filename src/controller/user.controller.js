import { findall, createOne, findById, uploadDocument,deleteInactiveUser} from "../services/user.service.js"
import moment from "moment"


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

export const deleteUsers = async (req, res) => { 
  let date = moment();
  let users_result = await findall()
  if (users_result?.error)
    return res
      .status(500)
      .send({ status: "error", payload: users_result.error });
  users_result.forEach(async (user) => {
    let diff = 'last_connection' in user ? date.diff(moment(user.last_connection), "days") : null;
      if (diff > 2 || diff === null) {
      let user_delete = await deleteInactiveUser(user._id)
      if (user_delete?.error)
        return res
          .status(500)
          .send({ status: "error", payload: users_result.error });
        else {
          await transport.sendMail({                           
            from: "FASHION <be.creativedesing@gmail.com>",
            to: user.email,
            subject: "Your account was deleted for stagnation",
            html: `<div>
              <p><strong>${user.first_name} ${user.last_name}</strong> Your account was deleted since there was no activity for more than 2 days.</p>
            </div>`,
          });
        }
      }
  });
  res.send({ status: "success", payload: "All of the innactive users were deleted" });
};
