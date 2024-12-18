import dotenv from 'dotenv'
import express from 'express';
import router from './routes/index.js';
import cors from 'cors';
import bodyParser from 'body-parser';
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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json());
app.get('/', (req, res) => {
    res.status(200).json({
        message: {
            endpoint: [
                {
                    table: [
                        {
                            path: "/tables",
                            desc: "get all tables",
                            method: "GET"
                        },
                        {
                            path: "/add-table",
                            desc: "post table",
                            method: "POST"
                        },
                    ]
                },
                {
                    review: [
                        {
                            path: "/reviews",
                            desc: "get all reviews",
                            method: "GET"
                        },
                        {
                            path: "/create-review",
                            desc: "Post Review",
                            method: "POST"
                        }
                    ]
                },
                {
                    order: [
                        {
                            path: "/orders",
                            desc: "get all orders by status",
                            method: "GET"
                        },
                        {
                            path: "/total-income",
                            desc: "get total orders income",
                            method: "GET"
                        },
                        {
                            path: "/create-order",
                            desc: "Post new order",
                            method: "POST"
                        },
                        {
                            path: "/update-order",
                            desc: "Update existing order",
                            method: "PUT"
                        },
                        {
                            path: "/delete-order",
                            desc: "Delete existing order",
                            method: "DELETE"
                        }
                    ]
                },
                {
                    menu: [
                        {
                            path: "/menus",
                            desc: "Get all menus",
                            method: "GET"
                        },
                        {
                            path: "/create-menu",
                            desc: "Create menu",
                            method: "POST"
                        },
                        {
                            path: "/menus/category/:category",
                            desc: "Get all menus by category",
                            method: "GET"
                        },
                        {
                            path: "/menus/search",
                            desc: "Search menu by name",
                            method: "GET"
                        }
                    ]
                }
            ]
        }
    })
});

app.use(router)

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})