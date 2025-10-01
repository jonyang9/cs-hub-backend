import 'dotenv/config'
import jwt from 'jsonwebtoken'

// Will add userId to the request on successful token verification
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization']
    if (!authHeader?.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Authorization header missing" })
    }
    const token = authHeader.split(' ')[1]

    if (!token) return res.status(401).json({ message: "Token required" })

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(403).json({ message: "Invalid or expired token" })
        req.userId = decoded.userId
        next()
    })
}

export default authenticateToken