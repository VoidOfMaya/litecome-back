import { prisma } from "../../lib/prisma.js"
const member = async (req, res, next) =>{
    const {id} = req.user
    const {connectionId} = req.params
    console.log(`user id: ${id}, connection id: ${connectionId}`)
    const result = await prisma.channelMember.findFirst({
        where:{AND:[
                {channelId: Number(connectionId)},
                {userId: Number(id)}
            ]   
        }
    })
    console.log(result)
    if(!result) res.status(404).json({msg: 'connection does not exist'})
    if(!result.isMember)res.status(403).json({msg: 'Access Denied!'})
    next();
}
//validates both  membership and mod status as mode has to be a member!
const mod = async (req, res, next) =>{
    const {id} = req.user
    const {connectionId} = req.params
    console.log(`user id: ${id}, connection id: ${connectionId}`)
    const result = await prisma.channelMember.findFirst({
        where:{AND:[
                {channelId: Number(connectionId)},
                {userId: Number(id)}
            ]   
        }
    })
    if(!result) res.status(403).json({msg: 'unauthorized'})
    if(!result) res.status(404).json({msg: 'connection does not exist'})
    if(!result.isMember)res.status(403).json({msg: 'Access Denied!'})
    if(!result.isMod)res.status(403).json({msg: 'requires mod privillage'})
    next();
}

const authorize ={
    member,
    mod
}
export{
    authorize
}