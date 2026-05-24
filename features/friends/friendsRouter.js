import { Router } from "express";
import { controller } from "./friendsController.js";
import { validate } from "./friendsValidation.js";
import { channelRouter } from "../channel/channelRouter.js";

const friendRouter = Router();

friendRouter.get('/', controller.getActiveFriends)
friendRouter.get('/requests',controller.pendingFriends)
friendRouter.get('/dm', validate.friendId ,controller.getFriendConnectionbyId)
friendRouter.post('/send-request',validate.friendReq,controller.requestFriend)
friendRouter.put('/accept-request', validate.reqId, controller.acceptFriendRequest)
friendRouter.delete('/reject-request', validate.reqId, controller.rejectFriendRequest)
friendRouter.delete('/',validate.deletionIds,controller.endFriendship)

//nested Dm channel router:-
friendRouter.use('/:channelId/dm', channelRouter);

export{
    friendRouter
}