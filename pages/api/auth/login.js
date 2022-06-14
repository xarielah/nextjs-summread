import User from '../../../models/userSchema'
import ConnectDB from '../../../utils/connect'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const generateToken = (getUser) => {
    const JWT_KEY = process.env.JWT_KEY

    const payload = {
        name: getUser.firstName,
        lastName: getUser.lastName,
        fullName: `${getUser.firstName} ${getUser.lastName}`,
        id: getUser._id
    }

    const token = jwt.sign(payload, JWT_KEY)
    return token
}

export default async function handleLogin(req, res) {
    const { email, password } = req.body
    await ConnectDB()
    try {
        const getUser = await User.find({ email })
        if (getUser.length === 0) return res.status(401).json()
        const isPasswordOk = await bcrypt.compare(password, getUser[0].password)

        if (isPasswordOk) {
            const token = generateToken(getUser[0])
            return res.status(200).json({ token })
        } else return res.status(401).end()

    } catch (error) {
        console.log(error)
        return res.status(500).end()
    }
}
