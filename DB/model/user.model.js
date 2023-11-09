import {Types,Schema, model } from "mongoose";
import moment from 'moment';
let now=moment()
 const userSchema=new Schema({
    userName:{
        type:String,
        required:[true,'user name is required'],
        min:[3,'min length is 3'],
        max:[25,'max length is 25']
    },
    email:{
        type:String,
        required:[true,'email is required'],
        unique:[true,'email exist'],
    },
    passward:{
        type:String,
        required:[true,'passward is required']
    },
    role:{
        type:String,
        default:'user',
        enum:['user','admin']
    },
    confirmEmail:{
        type:Boolean,
        default:false
    },
    sendCode:{
        type:String,
        default:null
    },
    lastOpenDate: {
        type:Date,
        default:now
    },
    image:String

},{timestamps:true})

const userModel=model('user',userSchema)

export {userModel}