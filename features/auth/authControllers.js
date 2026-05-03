import { validationResult, matchedData } from "express-validator";
import { register, login } from "./authServices.js";

const newUserController = async (req, res) =>{
    //validation handler
    const errors = validationResult(req);
    if(!errors.isEmpty()) return res.status(400).json({errors : errors.array()})
    const data = matchedData(req);
    //logic
    try{
        await register(data)
    }catch(err){
        res.status(500).json({error: err.message || 'Internal Server Error'})
    }
    res.status(201).json({message:'User  registered successfully'})
}
const loginController = async (req, res)=>{
    //validation handler
    const errors = validationResult(req);
    if(!errors.isEmpty()) return res.status(400).json({errors : errors.array()})
    const data = matchedData(req);  
    console.log(data)
    //logic
    try{
        const user = await login(data);
        res.status(200).json(user);
    }catch(err){
        res.status(500).json({error: err.message || 'Internal Server Error'})  
    }
}
export{
    newUserController,
    loginController
}