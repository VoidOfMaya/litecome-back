import passport from 'passport';
import {ExtractJwt, Strategy} from 'passport-jwt';
import {prisma} from '../../lib/prisma.js';
import 'dotenv/config';

const passportConfig=()=>{
    const options = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.APIKEY,
    }
    passport.use(new Strategy(options, async( payload, done)=>{
        try{
            const user = await prisma.user.findUnique({
                where: {id: payload.id},
                select:{
                    id: true,
                    email:true,
                    name:true,
                    bio:true,
                    photo:true,
                    lastOnline:true,
                    isOnline: true,
                    createdAt:true
                }
            });
            if(!user) return done(null, false);
            return done(null, user);
        }catch(err){
            done(err)
        }
    }))
}
const isAuthenticated = passport.authenticate('jwt',{session:false});
/*
 check if access token is valid?
 if not check if  refresh token is valid?
 if refresh token valid then authenticate new  access  token
 if refresh token exists and revoked delete all refresh tokens and delete 
    access token (promp user login)
if  refresh token does not exist but access token 
*/
//authorization for different access levels goes here:

export{
    passportConfig,
    isAuthenticated
}