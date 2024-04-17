import express from 'express';
import dotenv from "dotenv";
import colors from 'colors';
import cors from "cors";
import morgan from 'morgan';
import connectDB from './utlis/db.js';
import categoryRoutes from './routes/category-routes.js';
import productRoutes from './routes/product-routes.js';
import authRoutes from './routes/auth-route.js';
import razopayRoutes from "./routes/razopay-routes.js"

const app = express();


dotenv.config();
const port = process.env.PORT;

const corsOptions = {
    origin: "http://localhost:5173",
    methods: "GET,POST,PUT,DELETE,PATCH,HEAD",
    credentials: true,
};
app.use(cors(corsOptions));

connectDB();

// Middleware
app.use(express.json({ limit: '10mb' })); // Adjust the limit as needed
app.use(morgan('dev'));
app.use("/api", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);
app.use("/api/razopay",razopayRoutes);



app.get("/", (req, res) => {
    res.send("hjgfjhygjhg");
});

app.listen(port, console.log(`${process.env.DEV_MODE} mode running on ${port}`.bgYellow.white));
