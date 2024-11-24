const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const AuthRouter = require('./Routers/AuthRouter');
const ProductsRouter = require('./Routers/ProductsRouter');
const cors = require('cors');
require('dotenv').config();
require('./Models/db');

const PORT = process.env.PORT || 8080;

app.use(bodyParser.json());

const allowedOrigins = [ 
    'https://deploy-mern-app-ui-ruddy.vercel.app',
    'https://deploy-mern-app-api-gilt.vercel.app/auth/login',
    'https://deploy-mern-app-api-gilt.vercel.app/auth/signup' ,
    'https://deploy-mern-app-api-gilt.vercel.app/products'
]; 
    
    app.use(cors({ 
        origin: function (origin, callback) { 
            if (!origin || allowedOrigins.indexOf(origin) !== -1)
                 { callback(null, true); } 
            else { callback(new Error('Not allowed by CORS')); }
         } 
        }));

app.use('/auth',AuthRouter);
app.use('/products',ProductsRouter);

app.get("/ping", ( req,res) => {
    res.send("pong");
});

app.listen(PORT, ()=>{
    console.log(`Port is listninng form ${PORT}`);
});
