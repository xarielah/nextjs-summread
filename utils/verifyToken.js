import { verify } from "jsonwebtoken"
import { Router } from "next/router"

export default async function verifyJWToken(token) {
    const JWT_KEY = process.env.JWT_KEY

    if (token) {
        try {
            verify(token, JWT_KEY)
            return true
        } catch (error) {
            return false
        }
    }
}
