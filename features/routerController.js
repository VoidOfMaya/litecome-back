import {authRouter} from './auth/authRouter.js'
import { channelRouter } from './channel/channelRouter.js'
import { friendRouter } from './friends/friendsRouter.js'
import {indexRouter} from './index/indexRouter.js'
import { messsageRouter } from './messages/messageRouter.js'
import { userRouter } from './userRouter/userRouter.js'

const pipe = {
    authRouter,
    indexRouter,
    userRouter,
    friendRouter,
    channelRouter,
    messsageRouter
}
export{
    pipe
}