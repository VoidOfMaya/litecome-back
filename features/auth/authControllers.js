import { validationResult, matchedData } from "express-validator";
import { 
    register, 
    login, 
    createAToken, 
    createRToken,
    validateRToken, 
    getUser
    } from "./authServices.js";

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
// accepts Refresh token string,if valid derives user by token string
const tokenController = async (req, res)=>{
    //if refresh token valid  create new access token & refresh token
    //if refresh token invalid return error
    try{
        const refreshToken = await validateRToken(req.body.rToken)
        if(refreshToken){
            console.log(req.user)
            const newRToken = await createRToken(refreshToken.userId, refreshToken.token)
            const newAToken = await createAToken(refreshToken.userId)
            const user = await getUser(refreshToken.userId)
            return res.status(201).json({user ,accessToken: newAToken, refreshToken: newRToken})
        }
        throw new Error('err: at token controller')

    }catch(err){
        console.log(err)
        res.status(err.status).json({code: err.code})
    }
}
export{
    newUserController,
    loginController,
    tokenController
}