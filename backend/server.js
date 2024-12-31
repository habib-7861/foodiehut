import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js"
import foodRouter from "./routes/foodRoute.js"
import userRouter from "./routes/userRoute.js"
import cartRouter from "./routes/cartRoute.js"
import 'dotenv/config'
import orderRouter from "./routes/orderRoute.js"

// const express = require('express');
// const cors = require('cors');
const app = express();

// app.use(cors({
//     origin: 'https://food-del-uy7f.vercel.app', // Frontend URL
//     methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
//     credentials: true // Allow cookies and other credentials
// }));

app.get('/api/food/list', (req, res) => {
    res.json({ message: 'Food List Endpoint' });
});

// app.listen(3000, () => console.log('Server is running'));


//app config
// const app = express();
const port =process.env.PORT || 4000;


//middleware
app.use(express.json());
app.use(cors());

//db connection
connectDB();
// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', 'https://food-del-uy7f.vercel.app'); // Frontend URL
//     res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//     res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//     res.header('Access-Control-Allow-Credentials', 'true'); // Optional: For cookies
//     next();
// });
// app.use(cors());

//api endpoints
app.use("/api/food",foodRouter)
app.use("/images",express.static('uploads'))
app.use("/api/user",userRouter)
app.use("/api/cart",cartRouter)
app.use("/api/order",orderRouter)

app.get("/",(req,res)=>{
    res.json({message:"API Working"})
});

app.listen(port,()=>{
    console.log(`Server started on http://localhost:${port}`)  
});

