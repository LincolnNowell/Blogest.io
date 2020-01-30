const express = require('express');
const path = require('path');

const app = express();
app.use(express.urlencoded());


app.use("/imgs",express.static(__dirname + '/imgs'));
app.use('/pages',express.static(__dirname + '/pages'));

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