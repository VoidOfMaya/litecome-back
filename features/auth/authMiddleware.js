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
            const user = await prisma.user.findUnique({where: {id: payload.id}});
            if(!user) return done(null, false);
            return done(null, user);
        }catch(err){
            done(err)
        }
    }))
}
const isAuthenticated = passport.authenticate('jwt',{session:false});

//authorization for different access levels goes here:

export{
    passportConfig,
    isAuthenticated
}