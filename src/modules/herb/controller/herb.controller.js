import { herbModel } from "../../../../DB/model/Herb.model.js"
import cloudinary from "../../../services/cloudinary.js"
import { pagination } from "../../../services/pagination.js"

export const createHerb=async(req,res)=>{
    try{
        const {name,description,benefit,image,effect,place}=req.body
        const findHerb=await herbModel.findOne({name:name})
        if(findHerb){
            return res.status(400).json({message:'herb already exist'})
        }
        req.body.createdBy=req.user._id
        if(!req.file){
            return res.status(400).json({message:'upload image please'})
        }

        const {secure_url,public_id}=await cloudinary.uploader.upload(req.file.path,{folder:`plant/herb/${req.user._id}`})
        // res.json(secure_url)
        req.body.publicId=public_id
        // res.json(public_id)
        req.body.image=secure_url
        const herb=await herbModel.create(req.body)
        if(!herb){
            return res.status(400).json({message:'fail'})
        }
        res.status(200).json({message:'sucess',herb})
    }catch(error){
        return res.status(400).json({message:`catch error ${error}`})
    }
    
}
export const deleteHerb=async(req,res)=>{
    const {id}=req.params
    const herb=await herbModel.findByIdAndDelete(id)
    if(!herb){
        return res.status(400).json({message:'fail'})
    }
    return res.status(200).json({message:'sucess'})
}
export const updateHerb=async(req,res)=>{
    try{
    const {name,description,benefit,image,effect,place}=req.body
    const {id}=req.params
    const findHerb=await herbModel.findById(id)
    if(!findHerb){
        return res.status(400).json({message:'invalid id'})
    }
    if(req.file){
        const {secure_url,public_id}=await cloudinary.uploader.upload(req.file.path,{folder:`plant/herb/${req.user._id}`})
        req.body.publicId=public_id
        req.body.image=secure_url
    }
    const updateuser=await herbModel.findByIdAndUpdate(id,req.body,{new:false})
    if(!updateuser){
        return res.status(400).json({messagee:'fail update'})
    }
    await cloudinary.uploader.destroy(updateuser.publicId)
    return res.status(200).json({message:'sucess update',updateuser})
    }catch(error){
        return res.status(400).json({message:`catch error ${error}`})
    }
}
export const searchByName=async(req,res)=>{
    try{
        const {name}=req.body
        const user=await herbModel.findOne({name:name})
        if(!user){
            res.status(400).json({message:'not find herb'})
        }
        res.status(200).json({message:'sucess',user})
    }catch(error){
        return res.status(400).json({message:`catch error ${error}`})
    }
}
export const getAllHerb=async(req,res)=>{
    try{
        const {page}=req.query
        const{limit, skip}=pagination(page)
        const herb=await herbModel.find({})
        if(!herb){
            return res.status(400).json({message:'fail'})
        }
        return res.status(200).json({message:'sucess',herb})
    }catch(error){
        return res.status(400).json({message:`catch error ${error}`})
    }
}

