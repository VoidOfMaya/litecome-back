import { validationResult, matchedData } from "express-validator";
import {service} from "./authServices.js";

const newUser = async (req, res) =>{
    //validation handler
    const errors = validationResult(req);
    if(!errors.isEmpty()) return res.status(400).json({errors : errors.array()})
    const data = matchedData(req);
    //logic
    try{
        await service.register(data)
    }catch(err){
        res.status(500).json({error: err.message || 'Internal Server Error'})
    }
    res.status(201).json({message:'User  registered successfully'})
}
const login = async (req, res)=>{
    //validation handler
    const errors = validationResult(req);
    if(!errors.isEmpty()) return res.status(400).json({errors : errors.array()})
    const data = matchedData(req);  
    //logic
    try{
        const user = await service.login(data);
        res.status(200).json(user);
    }catch(err){
        res.status(500).json({error: err.message || 'Internal Server Error'})  
    }
}
// accepts Refresh token string,if valid derives user by token string
const token = async (req, res)=>{
    //if refresh token valid  create new access token & refresh token
    //if refresh token invalid return error

    try{
        const refreshToken = await service.validateRToken(req.body.rToken)
        //token validation happens in an auth midddleware
        const newRToken = await service.createRToken(refreshToken.userId,req.body.threadId,refreshToken.token)
        const newAToken = await service.createAToken(refreshToken.userId )
        const user = await service.getUserById(refreshToken.userId)
        return res.status(201).json({
            threadId: req.body.threadId,
            user:{
                id: user.id,
                email: user.email,
                name: user.name,
                bio: user.bio,
                photo: user.photo,
                lastOnline: user.lastOnline,
                isOnline: user.isOnline,
                createdAt: user.createdAt
            } ,
            accessToken: newAToken, 
            refreshToken: newRToken
        })
        throw new Error('err: at token controller')

    }catch(err){
        console.log(err)
        res.status(err.status).json({code: err.code})
    }
}
//requires a token thread uuid
const logout = async (req, res) =>{
    try{
        await service.removeTokenThread(req.body.threadId);
        res.status(200).json({message: 'A&T token thread removed'})
    }catch(err){
        res.status(500).json({code: err})
    }
}
const controller ={
    newUser,
    login,
    token,
    logout
}
export{
    controller
}