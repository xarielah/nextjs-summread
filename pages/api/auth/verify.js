import { verify } from "jsonwebtoken"

export default async function verifyHandler(req, res) {
    const { method } = req
    if (method !== 'POST') return res.status(405).send('Method Not Allowed')

    const { token } = req.body
    const KEY = process.env.JWT_KEY

    if (token) {
        try {
            const payload = verify(token, KEY)
            return res.status(200).json(payload)
        }
        catch (err) {
            return res.json(401).end()
        }
    }

    return res.status(404).send("No token found")
}