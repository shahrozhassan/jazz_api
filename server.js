const express = require("express");
const router = require('./router');

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());


//http://localhost:3000/api?type=jokes
const validateType  = (req,res,next)=>{
    const {type} = req.query;
    const content =['jokes','quotes','healthtip','poetry','recipes'];
    if(!content.includes(type)){
        console.warn(`Invalid type parameter: ${type}`);
        return res.status(400).json({ error: 'Invalid type parameter' });
    }
    next();
}
app.use('/api', validateType, router);

app.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`);
});
