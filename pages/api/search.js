import mongoose from "mongoose";
mongoose.connect(process.env.DB_HOST)

export default function getSearchResults(req, res) {
    res.status(200).json({ msg: 'hi' })
}