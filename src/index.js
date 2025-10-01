import 'dotenv/config'
import app from "./server.js";
import mongoose from 'mongoose';

const PORT = process.env.PORT || 3000

const startServer = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        app.listen(PORT, () => {
            console.log("Server running!")
        })
    } catch (err) {
        console.log(err.message)
        process.exit(1)
    }
}

startServer()

