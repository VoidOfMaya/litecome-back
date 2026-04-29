import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import { indexRouter } from './features/index/indexRouter.js';

const app = express();

//enables all cores temporarily for testing
app.use(cors());
//parse req string to json
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//passport setup goes here:-


//routs:-
app.use('/',indexRouter) // this houses the read rout for post and comments Comment router will live here!



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