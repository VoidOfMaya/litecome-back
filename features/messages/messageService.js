import { prisma } from "../../lib/prisma.js"
//services:
/*
[]get messages by channelId with 
{ id, content, createdAt, parentId:{content, userId},userId} 
 gets both messages and response messages
   
*/
const getChatlog = async (channelId)=>{
    console.log("chatlog service:-")
    console.log(typeof channelId)
    const result = await prisma.message.findMany({
        where: {channelId : channelId},
        select:{
            id: true,
            userId: true,
            content: true,
            createdAt: true,
            parent:{
                select:{
                    userId: true,
                    content: true
                }
            }
        }
    })
    return result
}
const createMessage = async (channelId,userId, content, parentId = null) =>{
    await prisma.message.create({
        data:{
            userId: userId,
            channelId: channelId,
            content: content,
            parentId
        }
    })

}
const editMessage =async (content, id) =>{
    await prisma.message.update({
        where:{ id: id},
        data:{
            content: content
        }
    })
}
const deleteMessage = async(id) =>{
    await prisma.message.delete({
        where:{id: id}
    })
}
const service = {
    getChatlog,
    createMessage,
    editMessage,
    deleteMessage
}

export{
    service
}