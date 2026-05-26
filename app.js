import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import { pipe } from './features/routerController.js';
import { midware } from './features/middlewareController.js';
import passport from 'passport';
import cookieParser from 'cookie-parser';

//cron token cleaner
import { tokenCleaner } from './tasks/dbCleaner.js';


const app = express();

//enables all cores temporarily for testing
app.use(cors({
  origin:'http://localhost:5173',
  credentials: true,
}));

//parse req string to json
app.use(express.json());
app.use(express.urlencoded({extended: true}));


//passport setup goes here:-
midware.passportConfig();
app.use(passport.initialize());

//parse cookies
app.use(cookieParser());
//routs:-
tokenCleaner(); //runs auto db cleaning function every week!
app.use('/',pipe.indexRouter) // this houses the read rout for post and comments Comment router will live here!
app.use('/auth', pipe.authRouter)
app.use('/user',midware.isAuthenticated,pipe.userRouter)
app.use('/channel/:channelId',midware.isAuthenticated, pipe.channelRouter)
app.use('/friend',midware.isAuthenticated,pipe.friendRouter)
//error handlers:
//404
app.use((req, res, next)=>{
  const error = new Error('Route not found');
  error.status = 404;
  next(error);
})
//500
app.use((err, req, res, next) => {
  console.error(err);

  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error'
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, (err)=>{
    if(err) throw new err ;
    console.log(`Server running on port: ${PORT}`);
})