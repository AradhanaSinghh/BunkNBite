const mongoose=require("mongoose");

function connectDB(){
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.group("✅MongoDB connected successfully!");
    })
    .catch((err)=>{
        console.log("❌MongoDB connection failed : "+err)
    })
}


module.exports={
    connectDB
}