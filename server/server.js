const express = require('express');
require('./services/passport');
const keys = require('./config/keys');
const mongoose = require('mongoose');
const route = require('./routes/authRoutes');
var passport = require('passport');
var session = require('express-session');
var cookie = require('cookie-parser');
var flash= require('express-flash');
var MongoStore = require('connect-mongo')(session);
var app =express();
const userroute = require('./routes/user');

app.use(userroute);

app.use(cookie());
app.use(session({
    resave:true,
    saveUninitialized:true,
    secret:"pd@123",
    store: new MongoStore({url: keys.mongoURI,autoReconnect:true})
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
mongoose.connect(keys.mongoURI);

const PORT = process.env.PORT || 4000;
app = app.listen(PORT, ()=> {
    console.log("Listening..");
});