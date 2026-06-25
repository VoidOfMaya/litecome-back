import { prisma } from "../../lib/prisma.js";

//gets friends by id 
const getActiveFriends = async (id) =>{
   const result = await prisma.userFriends.findMany({
    where:{
        OR:[{friendId: id},{userId: id}],
        status: 'ACTIVE'
    },
    select:{
        id: true,
        friend:{
            select:{
                id: true,
                email: true,
                name: true,
                bio: true,
                photo: true,
                lastOnline: true,
                isOnline: true,
                createdAt: true
            }
        }
    }
   })
   return result
}
const getFriendConnectionById = async (id) =>{
   const result = await prisma.userFriends.findUnique({
    where:{id: id},
    select:{
        friend:{
            select:{
                id: true,
                email: true,
                name: true,
                bio: true,
                photo: true,
                lastOnline: true,
                isOnline: true,
                createdAt: true
            }
        }
    }
   })
   return result
}
//creates friend request rakes senderid , revieverId)
const sendFriendRequest = async (senderId, recieverId) =>{
    // insures that the smaller number is always first to prevent duplicates in db
    const normalizeId =(a,b)=>{
        return a < b? [a, b]: [b, a]; //insures the bigger number is always first
    }
    const [userId, friendId] = normalizeId(senderId, recieverId)
    const result = await prisma.userFriends.create({
        data:{        
            userId,    
            friendId
        }
    })
    return result 
}
//gets friend requests(friends request sent to user)
const getPendingFriends = async (id) =>{
    const result = await prisma.userFriends.findMany({
        where: {
            userId : id,
            status: 'PENDING'
        },
        select: {
            id: true,
            status: true,
            friend:{
                select:{
                    id: true,
                    email: true,
                    name: true,
                    photo: true
                }
            },
            user:{
                select:{
                    id: true
                }
            }
        }
    })
    return result
}
//accepts friend requests of status pending(takes friendship record id)
const acceptFriendRequest = async (recordId) =>{
    //creates a channel per connection
    const channelId = await prisma.channel.create({
        select:{
            id: true
        },
        data:{
            type: 'FRIEND',
            name: 'Direct Messages',
        },
    })
    // activates connection
    const result = await prisma.userFriends.update({
        where:{id: recordId},
        data:{
            status: 'ACTIVE',
            channelId: channelId.id

        }
    })    
    //joins both users to channel
    await prisma.channelMember.createMany({
        data:[
            {
                channelId: channelId.id,
                userId: result.userId,
                isMember: true
            },
            {
                channelId: channelId.id,
                userId: result.friendId,
                isMember: true
            }
        ]
    })

    return {result, channelId}
}
//rejects friends request of status pending(deletes request recoord by id)
const rejectFriendRequest = async (requestId) =>{
    const result = await prisma.userFriends.delete({where:{id: requestId}})
    return result 
}
const endFriendship = async (relationId, channelId) =>{
    
    await prisma.$transaction([
        // delets all messages in channel
        prisma.message.deleteMany({ 
            where: { channelId: channelId } 
        }),
        // delets friends from channel members list
        prisma.channelMember.deleteMany({ 
            where: { channelId: channelId } 
        }),
        //delets channel itself
        prisma.channel.delete({ 
            where: { id: channelId } 
        }),
        // delets friendship record
        prisma.userFriends.delete({ 
            where: { id: relationId } 
        })
    ]);

}

//terminates friendship
const service ={
    getActiveFriends,
    getFriendConnectionById,
    sendFriendRequest,
    getPendingFriends,
    acceptFriendRequest,
    rejectFriendRequest,
    endFriendship

}
export{
    service
}