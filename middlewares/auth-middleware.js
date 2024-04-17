import  jwt from "jsonwebtoken";
import userModel from "../models/user-model.js";
export const requiredSignIn=async(req,res,next)=>{
    
    try { 
 const decode =jwt.verify(req.headers.authorization,process.env.JWT_SECRET)
 req.user=decode;
      next();
    }
    catch(error){
console.log(error)
    }
}

export const isAdmin=async (req,res,next)=>{ //role 1 is admin
try {
    const user=await userModel.findById(req.user._id);
    console.log(user)
    if(user.role!==1){
        return res.status(401).json({
            success:false,
            message:"unauthorized Access",
        })
        
    } else{
        next();
    }
} catch (error) {
    console.log(error)
    res.status(401).send({
        success:false,
        error,
        message:"error in admin middleware"
    })
}
}