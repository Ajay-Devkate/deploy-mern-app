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
    
    app.use(cors());

app.use('/auth',AuthRouter);
app.use('/products',ProductsRouter);

app.get("/ping", ( req,res) => {
    res.send("pong");
});

app.listen(PORT, ()=>{
    console.log(`Port is listninng form ${PORT}`);
});
