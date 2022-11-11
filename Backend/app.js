const express = require('express');
const app = express();      //call express function and it returns app function
//it creates a new app for our application
const cors = require('cors');               //to expose our backend application, so that front end on any other system can use it
require('dotenv').config();                 //to read .env file
app.use(express.json());                    //for reading json format data key:value
app.use(express.urlencoded());              //for reading key=value&key=value
const {ROOT} = require('./utils/config').ROUTES;
app.use(cors());                            //using cors

    //ALL ROUTES

    //ROUTES AVAILABLE BEFORE ANY LOGIN     (basically these routes dont require token in headers/authorization)

app.use(ROOT,require('./api/routes/user'));     //user - login,register,forgot pass, acc recover

    //Authentication for USER
app.use(require('./utils/middlewares/authentication'));       //it's a middleware necessary for all users this will check & verify token in headers by key Authorization otherwise it will show authorization fail

    //users can access this section after authentication

app.use(ROOT,require('./api/routes/movie_list'));         //all cart functionality for user. CRUD
app.use(require('./utils/middlewares/404'));                //if user has typed something wrong


const server = app.listen(process.env.PORT || 1234,err=>{       //.listen up the our application on that port in local host this port number should be unique , should not get conflict with other apps
    if(err){
        console.log("app crash",err);
    }
    else{
        console.log("server started...",server.address().port);     //server.address().port tells on which port our application is running
    }
});
