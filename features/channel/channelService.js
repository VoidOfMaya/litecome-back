import { prisma } from "../../lib/prisma.js"

//gets channel info only for authenticated memebrs NO messages or members
const getChannelInfo = async (id) =>{
    const result = await prisma.channel.findUnique({
        where: {id: id},
        include:{
            members:{
                select:{
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
// ======[MEMBERS ONLY]============
const getChannelbyId = async (id) =>{
    const result = await prisma.channel.findUnique({
        where: {id: id},
        include:{
            members:{
                select:{
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
const leaveChannel = async(channelId, userId) =>{
    await prisma.channelMember.update({
        where:{ 
            AND:[
                {channelId},
                {userId}
            ]
        },
        data:{
            isMember: false,
            isMod: false
        }
    })
    return 'Connection Terminated'
}
// ======[MODS ONLY]============

const service ={
    newChannel,
    getChannelbyId,
    getChannelInfo,
    leaveChannel

}
export{
    service
}