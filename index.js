import dotenv from 'dotenv'
import express from 'express';
import router from './routes/index.js';
dotenv.config()
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send("Hello World")
});

app.use(router)

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})