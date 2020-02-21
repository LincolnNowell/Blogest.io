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
        res.send(true);
    }else{
        res.send(false);
    }
    res.end();
})

router.get('/using',(req,res)=>{
    res.send(req.session.Auth);
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
        req.session.Auth = req.body.name;
        res.send(true);
    }
    res.end();
})

router.post('/saveBlog',async(req,res)=>{
    let name = req.session.Auth;
    let blogPost = req.body;
    await Bloggers.findOneAndUpdate({"name":name},{$push :{"blogs": blogPost}});
})

router.post('/UserPage',async(req,res)=>{
    req.session.selected = req.body.name;
    const user = await Bloggers.findOne({name: req.body.name})
})

router.post('/update',async(req,res)=>{
    let name = req.body.name;
    let title = req.body.title;
    const user = await Bloggers.findOne({name: req.body.name})
    let blogs = user.blogs;
    let sum = 0;
    blogs.forEach(element => {
        if(element['title'] === title){
            let number = Number.parseInt(element['views']);
            element['views'] = (++number).toString();
        }
        sum += Number.parseInt(element['views']);
    });

    await Bloggers.findOneAndUpdate({"name":name},{$set :{"views": sum.toString()}});
    await Bloggers.findOneAndUpdate({"name":name},{$set :{"blogs": []}});
    await Bloggers.findOneAndUpdate({"name":name},{$push :{"blogs": blogs}});
})

router.get('/selected',(req,res)=>{
    console.log(req.session.selected);
    res.send(req.session.selected); 
})

router.get('/blogs',async(req,res)=>{
    let name = req.query.name
    const user = await Bloggers.findOne({name: name})
    res.send(user.blogs);
})

router.get('/user', async(req,res)=>{
    let blogs = await Bloggers.find();
    res.send(blogs);
})

module.exports = router;