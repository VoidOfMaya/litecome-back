import { service } from "./messageService.js";
import { matchedData, validationResult } from "express-validator";


const getChatLog = async (req, res) =>{
    // data validation
    const errors = validationResult(req);
    if(!errors.isEmpty()) return res.status(400).json({errors : errors.array()})
    const {channelId} = matchedData(req); 
    //main logic
    try {
        const chatlog = await service.getChatlog(channelId)
        return res.status(200).json(chatlog)
    } catch (err) {
        res.status(500).json({msg: err.message || 'Internal Server Error'})
    }
}
const submitMessage = async (req, res) =>{
    // data validation
    const errors = validationResult(req);
    if(!errors.isEmpty()) return res.status(400).json({errors : errors.array()})
    const {channelId, content, parentId} = matchedData(req); 
    //main logic
    try {
        await service.createMessage(channelId,Number(req.user.id), content, parentId)
        return res.status(200).json({msg: 'message created!'})
    } catch (err) {
        res.status(500).json({msg: err.message || 'Internal Server Error'})
    }   
}
const editMessage = async (req, res) =>{
    // data validation
    const errors = validationResult(req);
    if(!errors.isEmpty()) return res.status(400).json({errors : errors.array()})
    const {content, id} = matchedData(req); 
    //main logic
    try {
        await service.editMessage(content, id)
        return res.status(200).json({msg: 'message edit!'})
    } catch (err) {
        res.status(500).json({msg: err.message || 'Internal Server Error'})
    }     
}
const deleteMessage = async(req, res) =>{
    // data validation
    const errors = validationResult(req);
    if(!errors.isEmpty()) return res.status(400).json({errors : errors.array()})
    const {id} = matchedData(req); 
    //main logic
    try {
        await service.deleteMessage(id)
        return res.status(200).json({msg: 'message deleted!'})
    } catch (err) {
        res.status(500).json({msg: err.message || 'Internal Server Error'})
    }   
}
const controller = {
    getChatLog,
    submitMessage,
    editMessage,
    deleteMessage
}

export{
    controller
}