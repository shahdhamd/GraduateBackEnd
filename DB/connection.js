
import mongoose from "mongoose";

const connectDB=async()=>{

    return await mongoose.connect(process.env.DBURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000, // Set a timeout value in milliseconds
      })
    .then (res=>{
        console.log("sucess connect")
    }).catch(error=>{
        console.log(`fail connect ${error}`)
    })
}

export default connectDB
