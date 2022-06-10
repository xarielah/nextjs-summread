import User from '../../../models/userSchema'
import ConnectDB from '../../../utils/connect'
import bcrypt from 'bcryptjs'

export default async function handleLogin(req, res) {
    const { email, password } = req.body
    await ConnectDB()
    try {
        const getUser = await User.find({ email })
        if (getUser.length === 0) {
            return res.status(401).json()
        } else {
            const validLogin = await bcrypt.compare(password, getUser[0].password)
            if (validLogin) {
                return res.status(200).json({ message: 'Logged successfuly!' })
            } else {
                return res.status(401).json()
            }
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json()
    }
}
