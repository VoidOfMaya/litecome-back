import { Router } from "express";
import { controller } from "./friendsController.js";
import { validate } from "./friendsValidation.js";
import { channelRouter } from "../channel/channelRouter.js";

const friendRouter = Router();

friendRouter.get('/', controller.getActiveFriends)
friendRouter.get('/:id', validate.friendId ,controller.getFriendConnectionbyId)
friendRouter.get('/requests',validate.friendReq ,controller.pendingFriends)
friendRouter.post('/send-request',controller.requestFriend)
friendRouter.put('/accept-request', validate.reqId, controller.acceptFriendRequest)
friendRouter.delete('/reject-request', validate.reqId, controller.rejectFriendRequest)
friendRouter.delete('/',controller.endFriendship)

//nested Dm channel router:-
friendRouter.use('/:connectionId/dm', channelRouter);

export{
    friendRouter
}