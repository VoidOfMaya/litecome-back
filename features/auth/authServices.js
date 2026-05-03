import {prisma} from '../../lib/prisma.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import 'dotenv/config'
/*
implementing an access and refresh + token rotation on each refresh
 this will have a few componenets!
 1-access token: used to allow user access on a successfull login(short lifespan)
        -token must be stored in memory  to prevent  Xss theft
        -on expiry prompt/check for a valid refresh token
        -is JWT
2-refresh token: generated on  user access(longer lived lifespan)
        - token is stored in httpOnly cookies
        - use inactive lifetime as a limit on  access 
        - is opaque random generated string!
3- detects reused refresh tokens
        -requirs tracking and storage in db
        -on reuse detect remove all tokens  and revoke access(require user log in)
*keynote this approach for auth builds on the simpler token bearer approach!

*/
//A basic register and  login!
//takes {email, password, name}
const register = async (data) =>{
    await prisma.user.create({
        data:{
            email: data.email,
            name: data.name,
            password: await bcrypt.hash(data.password,10) //hashes and encrypts pasword!
        }
    })
}
const login = async (data) =>{
    const {email, password} = data
    const user = await prisma.user.findUnique({
        where: {email}
    })
    if(!user) throw new Error("invalid login");
    
    const match = await bcrypt.compare(password, user.password);
    if(!match) throw new Error("invalid login");
    
    //access token:-
    const token = jwt.sign(
        {id: user.id, email: user.email},
        process.env.APIKEY,
        {expiresIn: '15m'}
    )
    // refresh token:-
    
    return{
        user:{
            id: user.id,
            email: user.email,
            name: user.name,
            bio: user.bio,
            photo: user.photo,
            createdAt: user.createdAt,
            lastOnline: user.lastOnline
        },
        token
    }
}
export{
    login,
    register
}