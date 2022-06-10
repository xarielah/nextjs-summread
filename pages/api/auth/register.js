import User from '../../../models/userSchema'
import ConnectDB from '../../../utils/connect'
import bcrypt from 'bcryptjs'


export default async function handleRegister(req, res) {
    const { firstName, lastName, password, email, isPrivate } = req.body
    const hash = await bcrypt.hash(password, 10)
    await ConnectDB()
    try {
        const save = await User.create({
            firstName, lastName, password: hash, email, isPrivate
        })
        return res.status(200).json(save)
    } catch (error) {
        console.log(error)
        return res.json({ error })
    }
}