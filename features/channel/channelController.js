import { service } from "./channelService.js"
import { validationResult, matchedData } from "express-validator"

const getChannelInfo = async (req, res) =>{
    try {
        const {connectionId} = req.params
        console.log(connectionId)
        const dm = await service.getChannelInfo(Number(connectionId))
        res.status(200).json(dm)
    } catch (err) {
        res.status(500).json({error: err.message || 'Internal Server Error'})
    }
}

const getDmChannel = async (req, res) =>{
    try {
        const {connectionId} = req.params

        const dm = await service.getChannelbyId(Number(connectionId))
        res.status(200).json(dm)
    } catch (err) {
        res.status(500).json({error: err.message || 'Internal Server Error'})
    }
}
const createNewChannel = async (req, res) =>{
    //requires user id and a channel name
    //validation handler
    const errors = validationResult(req);
    if(!errors.isEmpty()) return res.status(400).json({errors : errors.array()})
    const data = matchedData(req);  
    console.log(data)
    try {
        //use user.id to create a new channel, add them to members, and asign as mod
        const newChannel = await service.newChannel(req.user.id, data.name)
        res.status(200).json(newChannel)
    } catch (err) {
        res.status(500).json({error: err.message || 'Internal Server Error'})
    }
}
const leaveChannel = async (req, res) =>{
    try {
        const {connectionId} = req.params
        const {id} = req.user
        const request = await service.leaveChannel(connectionId, id)
        res.status(200).json(request)
    } catch (err) {
        res.status(500).json({error: err.message || 'Internal Server Error'})
    }    
}



const controller = {
    getDmChannel,
    createNewChannel,
    getChannelInfo,
    leaveChannel
}

export{
    controller
}