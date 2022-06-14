import * as jose from 'jose'

export default async function handler(req, res) {
    const { token } = req.cookies
    const JWT_KEY = new CryptoKey(process.env.JWT_KEY).type('secret')

    if (token) {
        const verifyToken = await jose.jwtVerify(token, JWT_KEY)
        console.log(verifyToken)
    }
}