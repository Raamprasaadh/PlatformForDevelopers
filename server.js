//getting express in a variable.//
const express = require('express');

//getting db connection from config file using relative path//
const connectDB =require('./config/db');

//and assigning it to the app//
const app= express();

//connect database//
connectDB();

//below is to validate the post requests received.
//init middleware
app.use(express.json({extended:false}));

// 5000 becomes the port value if the port value is not assigned.//

const PORT = process.env.PORT || 5000;

//when localhost:port/ is hit below response will be sent.//
app.get('/',(req, res)=>res.send('Api running'));

//defining routes
app.use('/api/users', require('./routes/api/user'));

app.use('/api/profile', require('./routes/api/profile'));

app.use('/api/posts', require('./routes/api/posts'));

app.use('/api/auth', require('./routes/api/auth'));

//run the app in the given port and when the app runs successfully below message will be displayed//
app.listen(PORT,()=>console.log('Server started at port ' + PORT));