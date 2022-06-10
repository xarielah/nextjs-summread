import mongoose from "mongoose";

const ConnectDB = async () => mongoose.connect(process.env.DB_HOST).then(() => console.log('Database connection establishd...'))

export default ConnectDB