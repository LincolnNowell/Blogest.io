const express = require('express');
const path = require('path');
let session = require('express-session');
const routes = require('./routes/router');
require('./db/mongoose');

const app = express();

app.set("view engine","ejs");
app.set('views', path.join(__dirname, 'views'));

app.use(session(
    { secret: 'Milk', 
    resave: true,
    cookie: { maxAge: 8*60*60*1000 },
    saveUninitialized: true,
}))

app.use(express.urlencoded({extended: false}));


app.use("/imgs",express.static(__dirname + '/imgs'));
app.use('/pages',express.static(__dirname + '/pages'));
app.use(routes);

app.get('/',(req,res) =>{
    res.sendFile(path.join(__dirname,'index.html'));
});

app.get('*', function(req, res) {
    res.redirect('/');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT,() =>{
    console.log(`Server started on port ${PORT}`);
});