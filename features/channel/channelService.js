import { prisma } from "../../lib/prisma.js"
// ======[AUTHENTICATED ONLY]============
//gets channel info only for authenticated memebrs NO messages or members
const getChannelInfo = async (id) =>{
    const result = await prisma.channel.findUnique({
        where: {id: id},
        select:{
            id: true,
            name: true,
            createdAt:true,
            type: true
        }
    })
    return result
}
const joinRequest = async (channelId, userId) =>{
    await prisma.channelMember.create({
        data:{
            channelId,
            userId
        }
    })
    return "request created"
}
// ======[MEMBERS ONLY]============
//returns channel relation intity id
const getChannelbyId = async (id) =>{
    const result = await prisma.channel.findUnique({
        where: {id: id},
        include:{
            members:{
                select:{
                    id: true,
                    isMod: true,
                    user:{ select:{
                            id: true,
                            name: true,
                            photo: true
                        }
                    }
                }
            },
            messages: true,
        }
    })
    return result
}
//creates new channel and adds creator with mod privilage to its memberslist
const newChannel = async(creatorId, name)=>{
    return await prisma.channel.create({
        data:{
            name: name,
            type: 'GROUP',
            members:{
                create:{
                    isMember: true,
                    isMod: true,
                    userId: creatorId
                }
            }
        }
    })
}
//takes channel relation intity id
const leaveChannel = async(relationId) =>{

    await prisma.channelMember.delete({
        where:{ id:relationId}
    })
    return 'Connection Terminated'
}
// ======[MODS ONLY]============
//enable mod mode
const enableMod = async (relationId) =>{
    await prisma.channelMember.update({
        where:{ id: relationId},
        data:{
            isMod: true
        }
    })
    return 'mod privillage enabled'
}
//remove from channel
const removeUser = async (relationId) =>{
    await prisma.channelMember.delete({
        where:{id: relationId}
    })
    return 'user removed!'
}
//get all 
const getAllJoinRequests = async (channelId) =>{
    return await prisma.channelMember.findMany({
        where: {
            AND:[
                {channelId},{isMember: false}
            ]
        }
    })
}
//reject join request
const rejectRequest = async (relationId) =>{
    await prisma.channelMember.delete({
        where:{id: relationId}
    })
    return 'request rejected'
}
//acept join request
const acceptRequest = async (relationId) =>{
    await prisma.channelMember.update({
        where:{id: relationId},
        data:{
            isMember: true
        }
    })
    return 'request accepted'
}

const service ={
    newChannel,
    getChannelbyId,
    getChannelInfo,
    leaveChannel,
    joinRequest,
    enableMod,
    removeUser,
    getAllJoinRequests,
    rejectRequest,
    acceptRequest


}
export{
    service
}