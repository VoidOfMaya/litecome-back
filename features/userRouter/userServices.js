import { prisma } from "../../lib/prisma.js"

const populateDashboard = async (userId) =>{
    const result = await prisma.user.findUnique({
        where:{id: userId},
        include: {            
            channels:{
                include:{channel: true}
            },
            friendSent:{
                where:{status: 'ACTIVE'},
                include:{friend: true}
            },
            friendsRecieved:{
                where:{status: 'ACTIVE'},
                include:{
                    user: true
                }
            }
        }
    })
    const sanitizedUserData = () =>{
        return {id: result.id, name: result.name, bio: result.bio,photo: result.photo}
    }
    const sanitizedChannelData = () =>{
        let array =[];
        result.channels.forEach(relation =>{
            const channel= relation.channel;
            array.push({
                id: channel.id, 
                name: channel.name,
                type: channel.type})
        })
        return array;
    }
    const sanitizedFriendData = () =>{
        let array =[];
        result.friendSent.forEach(connection =>{
            const friend = connection.friend;
            array.push({
                id: friend.id, 
                name: friend.name,
                photo: friend.photo,
                bio: friend.bio,
                onlineStatus: friend.isOnline? friend.isOnline : friend.lastOnline,
            })
        })
        
        result.friendsRecieved.forEach(connection =>{
            const friend = connection.user
            //checks for friendship duplication!
            array.forEach(connection =>{
                if(connection.id === friend.id)return
                array.push({
                    id: friend.id,
                    name: friend.name,
                    photo: friend.photo,
                    bio: friend.bio,
                    onlineStatus: friend.isOnline? friend.isOnline : friend.lastOnline,
                })                
            })

            
        })

        return array
    }
    const outboundData ={
        user: sanitizedUserData(),
        channels: sanitizedChannelData(),
        friends: sanitizedFriendData()
    } 
    //requires data normalization
    return outboundData
}
const getUser= async(id)=>{
    return await prisma.user.findUnique({
        where:{id: id},
        select:{
            email:true,
            name:true,
            bio:true,
            photo:true,
            lastOnline:true,
            isOnline: true,
            createdAt:true
        }
    })
}
const editCurrentUser = async( id, data) =>{
    const user = await prisma.user.findUnique({where:{id: id}})
    await prisma.user.update({
        where: {id: id},
        data:{
            name: data.name ===''? user.name: data.name,
            bio:   data.bio === ''? user.bio : data.bio,
            photo: data.photo === ''? user.photo: data.photo
        }
    })

}
const service = {
    populateDashboard,
    getUser,
    editCurrentUser,
}
export{service}