const express=require('express');
const cookieParser=require('cookie-parser');
const cors=require('cors');

const app=express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))
const authRoutes=require("./routes/auth.routes.js");
const foodRoutes=require("./routes/food.routes.js");

app.get("/",(req,res)=>{
    res.send("hello world!!")
})

app.use('/api/auth',authRoutes);

app.use('/api/food',foodRoutes);

module.exports=app;