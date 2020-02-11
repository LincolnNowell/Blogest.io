const express = require('express');
const bcrypt = require('bcrypt');
const Bloggers = require('../models/user');

const router = express.Router();

router.post('/login',async(req,res)=>{
    const name = req.body.name;
    const pwd = req.body.password;
    const user = await Bloggers.findOne({name});
    if(user && bcrypt.compare(pwd,user.password)){
        req.session.Auth = name;
        res.send(false);
    }else{
        res.send(true);
    }
    res.end();
})

router.post('/create', async(req,res)=>{

    let salt = bcrypt.genSaltSync(10);
    const pwd = bcrypt.hashSync(req.body.pwd,salt);

    let NewUser = new Bloggers({
        name: req.body.name,
        email: req.body.email,
        password: pwd
    }) 

    const user = await Bloggers.findOne({name: req.body.name})

    if(user){
        res.send(false);
    }else{
        NewUser.save();
        res.send(true);
    }
    res.end();
})

router.get('/UserPage',(req,res)=>{
    let name = req.url;
    console.log(name);
    res.render('UserPage.ejs', {name:req.query.name});
})

router.get('/user', async(req,res)=>{
    let blogs = await Bloggers.find();
    res.send(blogs);
})

module.exports = router;