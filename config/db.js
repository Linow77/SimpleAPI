const mongoose = require('mongoose')

const connectDB = async () => {
  const client = await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
}

module.exports = connectDB
