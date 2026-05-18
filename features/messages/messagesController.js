import { service } from "./messageService.js";
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

const controller = {
    getActiveFriends,
}

export{
    controller
}