const express = require('express');
const bcrypt = require('bcrypt');
const Bloggers = require('../models/user');

const router = express.Router();

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

router.get('/user', async(req,res)=>{
    let blogs = await Bloggers.find();
    res.send(blogs);
})

module.exports = router;