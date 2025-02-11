const express = require('express')
const cookieParser = require('cookie-parser');
const { connectMongoDB } = require('./connect');
const app = express();
const dotenv = require('dotenv').config();

const URL = require('./models/url');
const path = require('path');
const{checkForAuthentication,restrictTo} = require('./middlewares/auth')

const staticRoute = require('./routes/staticRouter')
const urlRoute = require('./routes/url');
const userRoute = require('./routes/user');

connectMongoDB('mongodb://127.0.0.1:27017/short-url')
.then(()=>console.log('mongoDB connected')).catch((err)=>console.log('error',err));

app.use(express.json());
app.use(cookieParser())
app.use(express.urlencoded({extended :false}));
app.use(checkForAuthentication);


app.use('/url',restrictTo(['NORMAL','ADMIN']),urlRoute);
app.use('/',staticRoute);
app.use('/user',userRoute);



app.set('view engine','ejs');
app.set('views',path.resolve('./views'));

app.get('/test',async (req,res)=>{
    const allUrls = URL.find({});
    return res.render('home');
})
app.get('/url/:shortId',async (req,res)=>{
const shortId =req.params.shortId;
const entry = await URL.findOneAndUpdate({
    shortId
},{$push:{
    visitHistory :{ timestamp :Date.now(),}
}});
if (!entry) return res.status(404).send('Short URL not found');
else res.redirect(entry.redirectURL)
});
const PORT = process.env.PORT || 8000;
app.listen(PORT,()=> console.log(`server started at ${PORT}`));