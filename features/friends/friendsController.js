import { service } from "./friendsService.js";
import { matchedData, validationResult } from "express-validator";

const getActiveFriends = async (req, res) =>{
    try {
        //takes user id  returns lists of connection ids and users
        const friend = await service.getActiveFriends(Number(req.user.id))
        res.status(200).json(friend)
    } catch (err) {
        res.status(500).json({msg: err.message || 'Internal Server Error'})
    }
}
const getFriendConnectionbyId = async (req, res) =>{
    // data validation
    const errors = validationResult(req);
    if(!errors.isEmpty()) return res.status(400).json({errors : errors.array()})
    const {id} = matchedData(req); 
    //main logic
    try {
        //takes connection id not friend id
        const friends = await service.getFriendConnectionById(id)
        res.status(200).json(friends)
    } catch (err) {
        res.status(500).json({msg: err.message || 'Internal Server Error'})
    }    
}
const requestFriend = async (req, res) =>{
    // data validation
    const errors = validationResult(req);
    if(!errors.isEmpty()) return res.status(400).json({errors : errors.array()})
    const {recieverId} = matchedData(req); 
    //main logic
    try {
        const request = await service.sendFriendRequest(Number(req.user.id), recieverId)
        res.status(200).json(request)
    } catch (err) {
        res.status(500).json({msg: err.message || 'Internal Server Error'})       
    }
}
const pendingFriends = async (req, res)=>{
    try {
        const pendingRequests = await service.getPendingFriends(Number(req.user.id))
        res.status(200).json(pendingRequests)
    } catch (err) {
        res.status(500).json({msg: err.message || 'Internal Server Error'})
    }    
}
const acceptFriendRequest = async (req, res) =>{
    // data validation
    const errors = validationResult(req);
    if(!errors.isEmpty()) return res.status(400).json({errors : errors.array()})
    const {requestId} = matchedData(req); 
    //main logic
    try {
        //expects a friend req.body.requestId
        const result = await service.acceptFriendRequest(requestId)
        res.status(200).json(result)
    } catch (err) {
        res.status(500).json({msg: err.message || 'Internal Server Error'})
    } 
}
const rejectFriendRequest = async (req, res) =>{
    // data validation
    const errors = validationResult(req);
    if(!errors.isEmpty()) return res.status(400).json({errors : errors.array()})
    const {requestId} = matchedData(req); 
    //main logic
    try {
        //expects a friend req.body.requestId
        const result = await service.rejectFriendRequest(requestId)
        res.status(200).json(result)
    } catch (err) {
        res.status(500).json({msg: err.message || 'Internal Server Error'})
    }    
}
const endFriendship = async (req, res) =>{
    // data validation
    const errors = validationResult(req);
    if(!errors.isEmpty()) return res.status(400).json({errors : errors.array()})
    const {requestId} = matchedData(req); 
    //main logic
    try {
        //expects a friend req.body.requestId
        const result = await service.rejectFriendRelation(requestId)
        res.status(200).json(result)
    } catch (err) {
        res.status(500).json({msg: err.message || 'Internal Server Error'})
    }      
}

const controller = {
    getActiveFriends,
    getFriendConnectionbyId,
    requestFriend,
    pendingFriends,
    acceptFriendRequest,
    rejectFriendRequest,
    endFriendship
}

export{
    controller
}