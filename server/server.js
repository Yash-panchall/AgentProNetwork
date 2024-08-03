require('dotenv').config();
const cors = require('cors')
const express = require('express');
const app = express();
const agentRouter = require('./router/auth-router')
const adminRouter = require('./router/admin-router')
const publicRouter =require('./router/public-router')
const { connectDb } = require('./utils/db');
const errorMiddleware = require('./middleware/error-middleware');
const cloudinary = require('cloudinary').v2;


const corsOptions = {
    origin : process.env.FRONTENDDOMAIN,
    methods : "GET , POST , PUT , DELETE , PATCH , HEAD",
    credential : true
}
app.use(cors(corsOptions))

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});


app.use(express.json())

app.use('/api/agent' , agentRouter );
app.use('/api/admin' , adminRouter );
app.use('/agent' , publicRouter)


  
app.use(errorMiddleware)

const PORT = 5000;
connectDb().then(()=>{
    app.listen( PORT , ()=>{
        console.log(`Your server is successfully run on ${PORT}`)
    })
});
 