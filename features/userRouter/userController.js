import { service } from "./userServices.js"
import { validationResult, matchedData } from "express-validator"

//gets  friends& channels
const getDashboard = async (req, res)=>{
    try {
        //takes req.user.id to get dashboard
        const data = await service.populateDashboard(req.user.id)
        //console.log(data)
        res.status(200).json(data)
    } catch (err) {
      res.status(500).json({msg: err.message || 'internal server error'})  
    }
    
}
//gets current users profile
const getCurrentUser = async (req, res)=>{
    //takes user id from req.user
    try {
        const currentUser = await service.getUser(req.user.id)
        res.status(200).json(currentUser)
    } catch (err) {
        res.status(500).json({msg: err.message || 'internal server error'})  
    }
}
// edits and updates current user info
const editCurrentUser = async (req, res)=>{
    //validation handler
    const errors = validationResult(req);
    if(!errors.isEmpty()) return res.status(400).json({errors : errors.array()})
    const data = matchedData(req);  
    console.log(data)
    try {
        const result = await service.editCurrentUser(req.user.id,data)
        res.status(200).json({
            name:result.name,
            bio:result.bio,
            photo:result.photo
        })
    } catch (err) {
        res.status(500).json({msg: err.message || 'internal server error'})      
    }
    
}
//gets other user profile by id!
const viewUserProfile = async (req, res)=>{
    //validation handler
    const errors = validationResult(req);
    if(!errors.isEmpty()) return res.status(400).json({errors : errors.array()})
    const data = matchedData(req);  
    console.log(req.params.id)
    console.log(data)

    //takes user id from  params
    try {
        const currentUser = await service.getUser(data.id)
        res.status(200).json(currentUser)
    } catch (err) {
        res.status(500).json({msg: err.message || 'internal server error'})  
    }
}
//blockes user {if friends: true}
const blockUser = async (req, res)=>{
    res.status(200).json({msg: 'block user if friend'})
}

const controller ={
    getDashboard,
    getCurrentUser,
    editCurrentUser,
    viewUserProfile,
    blockUser
}
export{controller}