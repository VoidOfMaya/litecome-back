import { service } from "./channelService.js"
import { validationResult, matchedData } from "express-validator"

//======= AUTHENTICATED CONTROLLER===========
const getChannelInfo = async (req, res) =>{
    // data validation
    const errors = validationResult(req);
    if(!errors.isEmpty()) return res.status(400).json({errors : errors.array()})
    const data = matchedData(req); 
    //main logic
    try {
        const dm = await service.getChannelInfo(data.channelId)
        res.status(200).json(dm)
    } catch (err) {
        res.status(500).json({error: err.message || 'Internal Server Error'})
    }
}
const createNewChannel = async (req, res) =>{

    const errors = validationResult(req);
    if(!errors.isEmpty()) return res.status(400).json({errors : errors.array()})
    const data = matchedData(req);  
    console.log(data)
    try {
        //use user.id to create a new channel, add them to members, and asign as mod
        const newChannel = await service.newChannel(Number(req.user.id), data.name)
        res.status(200).json(newChannel)
    } catch (err) {
        res.status(500).json({error: err.message || 'Internal Server Error'})
    }
}
//======= MEMBERS CONTROLLER===========
const getChannel = async (req, res) =>{
    // data validation
    console.log(`accessing channel getter controller`)
    const errors = validationResult(req);
    if(!errors.isEmpty()) return res.status(400).json({errors : errors.array()})
    const {channelId} = matchedData(req); 
    //main logic
    try {
        const dm = await service.getChannelbyId(channelId)
        res.status(200).json(dm)
    } catch (err) {
        res.status(500).json({error: err.message || 'Internal Server Error'})
    }
}
const leaveChannel = async (req, res) =>{
    // data validation
    const errors = validationResult(req);
    if(!errors.isEmpty()) return res.status(400).json({errors : errors.array()})
    const data = matchedData(req); 
    //main logic
    try {
        const request = await service.leaveChannel(data.relationId)
        res.status(200).json(request)
    } catch (err) {
        res.status(500).json({error: err.message || 'Internal Server Error'})
    }    
}
const joinRequest = async (req, res) =>{
    // data validation
    const errors = validationResult(req);
    if(!errors.isEmpty()) return res.status(400).json({errors : errors.array()})
    const data = matchedData(req); 
    //main logic
    try {
        const request = await service.joinRequest(data.channelId, Number(req.user.id))
        res.status(200).json(request)
    } catch (err) {
        res.status(500).json({error: err.message || 'Internal Server Error'})
    }    
}
//======= MODERATION CONTROLLER===========
const enableMod = async (req, res) =>{
    // data validation
    const errors = validationResult(req);
    if(!errors.isEmpty()) return res.status(400).json({errors : errors.array()})
    const data = matchedData(req); 
    //main logic
    try {
        await service.enableMod(data.relationId)
        res.status(200).json({ msg:'user has been granted Mod Primissions'})
    } catch (err) {
        res.status(500).json({error: err.message || 'Internal Server Error'})
    }    
}
const removeUser = async (req, res) =>{
    // data validation
    const errors = validationResult(req);
    if(!errors.isEmpty()) return res.status(400).json({errors : errors.array()})
    const data = matchedData(req); 
    //main logic
    try {
        await service.removeUser(data.relationId)
        res.status(200).json({msg: 'user removed'})
    } catch (err) {
        res.status(500).json({error: err.message || 'Internal Server Error'})
    }    
}
const getAllJoinRequests = async (req, res) =>{
    // data validation
    const errors = validationResult(req);
    if(!errors.isEmpty()) return res.status(400).json({errors : errors.array()})
    const data = matchedData(req); 
    //main logic
    try {
        const allRequest = await service.getAllJoinRequests(data.channelId)
        res.status(200).json(allRequest)
    } catch (err) {
        res.status(500).json({error: err.message || 'Internal Server Error'})
    }    
}
const acceptRequest = async (req, res) =>{
    // data validation
    const errors = validationResult(req);
    if(!errors.isEmpty()) return res.status(400).json({errors : errors.array()})
    const data = matchedData(req); 
    //main logic
    try {
        await service.acceptReques(data.relationId)
        res.status(200).json({msg: 'user accepted'})
    } catch (err) {
        res.status(500).json({error: err.message || 'Internal Server Error'})
    }    
}
const rejectRequest = async (req, res) =>{
    // data validation
    const errors = validationResult(req);
    if(!errors.isEmpty()) return res.status(400).json({errors : errors.array()})
    const data = matchedData(req); 
    //main logic
    try {
        await service.rejectRequest(data.relationId)
        res.status(200).json({msg: 'user rejected'})
    } catch (err) {
        res.status(500).json({error: err.message || 'Internal Server Error'})
    }    
}





const controller = {
    getChannel,
    createNewChannel,
    getChannelInfo,
    leaveChannel,
    joinRequest,
    enableMod,
    removeUser,
    getAllJoinRequests,
    acceptRequest,
    rejectRequest
}

export{
    controller
}