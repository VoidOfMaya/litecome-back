import { prisma } from "../../lib/prisma.js"
import { validationResult, matchedData, param } from "express-validator";

const author = async (req, res, next) =>{
    console.log('author premission midlleware:-')

    const errors = validationResult(req);
    if(!errors.isEmpty()) return res.status(400).json({errors : errors.array()})
    const {id} = matchedData(req); 
    const result = await prisma.message.findUnique({
        where:{id : Number(id)}
    })

    if(!result) return res.status(404).json({msg: 'connection does not exist'})
    if(!Number(result.userId) === Number(req.user.id)) return res.status(403).json({msg: 'Access Denied!'})
    next();
}
//validates both  membership and mod status as mode has to be a member!
const mod = async (req, res, next) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()) return res.status(400).json({errors : errors.array()})
    const {channelId} = matchedData(req); 
    console.log(`user id: ${req.user.id}, connection id: ${channelId}`)
    const result = await prisma.channelMember.findFirst({
        where:{AND:[
                {channelId:channelId},
                {userId: Number(req.user.id)}
            ]   
        }
    })
    console.log(result)
    if(!result) res.status(403).json({msg: 'unauthorized'})
    if(!result) res.status(404).json({msg: 'connection does not exist'})
    if(!result.isMember)res.status(403).json({msg: 'Access Denied!'})
    if(!result.isMod)res.status(403).json({msg: 'requires mod privillage'})
    next();
}

const authorize ={
    author,
    mod
}
export{
    authorize
}