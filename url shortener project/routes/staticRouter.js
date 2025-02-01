const express = require('express');
const URL = require('../models/url');
const { restrictTo } = require('../middlewares/auth');
const router = express.Router();


router.get('/admin/urls',restrictTo(['ADMIN']),async (req,res)=>{  
    try{const allUrls = await URL.find({ });
    return res.render('home',{
        urls :allUrls,
    });}
    catch (error) {
        console.error('Error fetching URLs:', error);
        res.status(500).send('Server Error');
      }
})


router.get('/',restrictTo(['NORMAL','ADMIN']),async (req,res)=>{  
    try{const allUrls = await URL.find({ createdBy: req.user._id });
    return res.render('home',{
        urls :allUrls,
    });}
    catch (error) {
        console.error('Error fetching URLs:', error);
        res.status(500).send('Server Error');
      }
})

router.get('/signup',(req,res)=>{
    return res.render('signup');
});
router.get('/login',(req,res)=>{
    return res.render('login');
});

module.exports = router;