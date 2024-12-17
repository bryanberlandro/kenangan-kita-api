import dotenv from 'dotenv'
import express from 'express';
import router from './routes/index.js';
dotenv.config()
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors(
    {
        origin: ['http://localhost:5173', 'https://kenangan-kita-api.vercel.app/'],
        methods: ["POST", "GET", "PATCH", "DELETE"],
        credentials: true,
        allowedHeaders: ['Content-Type', 'Authorization', 'authorization']
    }
))
app.use(express.json());

app.get('/', (req, res) => {
    res.send("Hello World")
});

app.use(router)

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})