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
    console.log('logging message controller data ')
    const errors = validationResult(req);
    if(!errors.isEmpty()) return res.status(400).json({errors : errors.array()})
    const {channelId}= req.params //sanetized by channel validations!
    const {id} = req.user //gets current user id
    const {content} = matchedData(req); 
    const responseTo = !typeof req.body.parentId === Number? null : req.body.parentId
    console.log(req.body)
    console.log(`channelId: ${channelId}, userId: ${id}`)
    console.log(`response to: ${responseTo}, content: ${content}`)
    //main logic
    try {
        await service.createMessage(Number(channelId),id, content, responseTo)
        return res.status(200).json({msg: 'message created!'})
    } catch (err) {
        res.status(500).json({msg: err.message || 'Internal Server Error'})
    }   
}
const editMessage = async (req, res) =>{
    // data validation
    console.log(`message editor controller`)
    const errors = validationResult(req);
    if(!errors.isEmpty()) return res.status(400).json({errors : errors.array()})
    const {content, id} = matchedData(req); 
    console.log(content)
    console.log(id)
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