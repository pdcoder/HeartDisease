const express = require('express');
require('./services/passport');
const keys = require('./config/keys');
const mongoose = require('mongoose');
const route = require('./routes/authRoutes');

var app =express();

route(app);
mongoose.connect(keys.mongoURI);

const PORT = process.env.PORT || 4000;
app = app.listen(PORT, ()=> {
    console.log("Listening..");
});