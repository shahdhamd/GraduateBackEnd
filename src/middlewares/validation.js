const dataMethod=['query','body','params','headers']

export const validation=(schema)=>{
    return (req,res,next)=>{
        try{
            const validationArr=[]; 
            dataMethod.forEach((key)=>{
            if(schema[key]){
                const validationResult=schema[key].validate(req[key],{abortEarly:false}) // بلف على كل نوع ميثود وبعمل فاليديت عليه
                if(validationResult.error){
                    validationArr.push(validationResult.error.details)
                }else{
                    next()
                }
            }
        })
        if(validationArr.length){
            return res.status(400).json({message:'validation error',validationArr})
        }
        }catch(error){
            return res.status(500).json({message:'catch error',error})
        }
    }
}
