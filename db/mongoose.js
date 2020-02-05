//Import the mongoose module
let mongoose = require('mongoose');

//Set up default mongoose connection
let mongoDB = "mongodb://localhost:27017/blog";
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true,useCreateIndex: true});

mongoose.connection.once('open',() => {
    console.log('Connections has been made!');
}).on('error', (error) =>{
    console.log('Connection error',error);
});
