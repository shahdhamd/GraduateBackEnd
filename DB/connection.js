
import mongoose from "mongoose";

const connectDB=async()=>{

    return await mongoose.connect(process.env.DBURL)
    .then (res=>{
        console.log("sucess connect")
    }).catch(error=>{
        console.log(`fail connect ${error}`)
    })
}

export default connectDB