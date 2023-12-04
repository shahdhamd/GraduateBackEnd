import { herbModel } from "../../../../DB/model/Herb.model.js"
import cloudinary from "../../../services/cloudinary.js"
import { pagination } from "../../../services/pagination.js"

export const createHerb=async(req,res)=>{
    try{
        const {name,description,benefit,image,effect,place}=req.body
        const findHerb=await herbModel.findOne({name:name})
        if(findHerb){
            return res.json({message:'herb already exist'})
        }
        req.body.createdBy=req.user._id
        if(!req.file){
            return res.json({message:'upload image please'})
        }

        const {secure_url,public_id}=await cloudinary.uploader.upload(req.file.path,{folder:`plant/herb/${req.user._id}`})
        // res.json(secure_url)
        req.body.publicId=public_id
        // res.json(public_id)
        req.body.image=secure_url
        const herb=await herbModel.create(req.body)
        if(!herb){
            return res.json({message:'fail'})
        }
        res.status(200).json({message:'sucess',herb})
    }catch(error){
        return res.json({message:`catch error ${error}`})
    }
    
}
export const deleteHerb=async(req,res)=>{
    const {id}=req.params
    const herb=await herbModel.findByIdAndDelete(id)
    if(!herb){
        return res.json({message:'fail'})
    }
    return res.status(200).json({message:'sucess'})
}
export const updateHerb=async(req,res)=>{
    try{
    const {name,description,benefit,image,effect,place}=req.body
    const {id}=req.params
    const findHerb=await herbModel.findById(id)
    if(!findHerb){
        return res.json({message:'invalid id'})
    }
    if(req.file){
        const {secure_url,public_id}=await cloudinary.uploader.upload(req.file.path,{folder:`plant/herb/${req.user._id}`})
        req.body.publicId=public_id
        req.body.image=secure_url
    }
    const updateuser=await herbModel.findByIdAndUpdate(id,req.body,{new:false})
    if(!updateuser){
        return res.json({messagee:'fail update'})
    }
    await cloudinary.uploader.destroy(updateuser.publicId)
    return res.status(200).json({message:'sucess update',updateuser})
    }catch(error){
        return res.json({message:`catch error ${error}`})
    }
}
export const searchByName=async(req,res)=>{
    try{
        const {name}=req.body
        const user=await herbModel.findOne({name:name})
        if(!user){
            res.json({message:'not find herb'})
        }
        res.status(200).json({message:'sucess',user})
    }catch(error){
        return res.json({message:`catch error ${error}`})
    }
}
export const getAllHerb=async(req,res)=>{
    try{
        let {page,size}=req.query
        let {limit, skip}=pagination(page,size)
       
        if(!size || size<=0){
            limit=8;
            size=8;
        }
        if(!page || page<=0){
            console.log('ttruee')
            page=1;
        }
        let startIndex=(page-1)*limit;
        let lastIndex=(page)*limit;
        // const herb=await herbModel.find({}).limit(limit).skip(skip)

        const herb=await herbModel.find({})
        let result={}
        const totalUser=herb.length
        const pageCount=Math.ceil(herb.length/limit)

        if(lastIndex<herb.length){
        result.next={
            page:page+1,
        }}

        if(startIndex>herb.length){
            result.prev={
            page:page-1,
         }
        }
        result=herb.slice(startIndex,lastIndex)
        if(!result){
            return res.status(400).json({message:'fail'})
        }
        return res.status(200).json({message:'sucess',totalUser,pageCount,result})
    }catch(error){
        return res.status(400).json({message:`catch error ${error}`})
    }
}


