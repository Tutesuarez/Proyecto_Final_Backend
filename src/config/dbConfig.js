import mongoose from "mongoose"
import config from "./config.js"

const URI = config.url_mongodb_atlas

try {
    await mongoose.connect(URI)
        .then('DB is Connected')
  } catch (error) {
    console.log(error)
  }