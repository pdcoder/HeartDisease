const express = require('express');
var bodyParser = require('body-parser');
var cookie = require('cookie-parser');
var session = require('express-session');
const helmet = require('helmet');
const csrf = require('csurf');
var validator = require('express-validator');
var MongoStore = require('connect-mongo')(session);
var app = express();
var flash= require('connect-flash');
const mongoose = require('mongoose');

var path = require('path');
var keys = require('../server/config/keys');
mongoose.connect(keys.mongoURI);
mongoose.Promise = global.Promise;

app.use(cookie());
app.use(helmet());
app.use(session({
    secret: 'super-secret-key',
    key: 'super-secret-cookie',
    httpOnly: true,
  secure: true,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60000 },
    store: new MongoStore({url:keys.mongoURI,autoReconnect:true})
  }));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
//app.use(csrf({ cookie : false }));


app.use(flash());
app.use((req, res, next) => {
    res.locals.success_mesages = req.flash('success');
    res.locals.error_messages = req.flash('error');
    next()
  });

var router = express.Router();
require('./services/passport');
const route = require('./routes/authRoutes');
var passport = require('passport');

const userroute = require('./routes/user');
var bycrypt = require('bcrypt-nodejs');
app.use(userroute);
var ejs = require('ejs');
var engine = require('ejs-mate');
app.use(validator());


app.set('view engine', 'ejs');
app.engine('ejs', engine);
app.use(passport.initialize());
app.use(passport.session());
app.use(userroute);
app.set('views', path.join(__dirname, '/views'));
app.use(express.static(__dirname + '/public'));



app.use((req, res, next) => {
    res.status(404).send("Sorry can't find that!");
  });

  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });


  
const PORT = process.env.PORT || 3000;
app.listen(PORT);