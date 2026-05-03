import { passportConfig, isAuthenticated } from "./auth/authMiddleware.js";

const midware ={
    passportConfig,
    isAuthenticated
}
export{
    midware
}