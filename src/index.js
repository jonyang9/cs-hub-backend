import app from "./server.js";
import 'dotenv/config'

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log("Server running!")
})