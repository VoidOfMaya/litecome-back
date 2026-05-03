import {authRouter} from './auth/authRouter.js'
import {indexRouter} from './index/indexRouter.js'

const pipe = {
    authRouter,
    indexRouter
}
export{
    pipe
}