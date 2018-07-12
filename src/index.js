const express = require('express');
var bodyParser = require('body-parser');
var cookie = require('cookie-parser');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
  var app = express();
//var flash= require('connect-flash');
const mongoose = require('mongoose');
var path = require('path');
var keys = require('./config/keys');
//var cors = require('cors')

mongoose.connect(keys.mongoURI);
var db = mongoose.connection;
mongoose.Promise = global.Promise;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log("We are connected");
});



/*module.exports = function (req, res, next) {
  // CORS headers
  res.header("Access-Control-Allow-Origin", "YOUR_URL"); // restrict it to the required domain
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  // Set custom headers for CORS
  res.header("Access-Control-Allow-Headers", "Content-type,Accept,X-Custom-Header");

  if (req.method === "OPTIONS") {
      return res.status(200).end();
  }

  return next();
};*/

app.use(cookie());
//app.use(cors());
app.use(session({
    secret: 'super-secret-key',
    key: 'super-secret-cookie',
    httpOnly: true,
  secure: true,
    resave: false,
    saveUninitialized: false,
    cookie: {expires: 600000},
    store: new MongoStore({url:keys.mongoURI,autoReconnect:true})
  }));
  
//app.use(csrf({ cookie : false }));


app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
var router = express.Router();
require('./services/passport');
const route = require('./routes/authRoutes');
var passport = require('passport');

const userroute = require('./routes/user');
var bycrypt = require('bcrypt-nodejs');
app.use(userroute);
var ejs = require('ejs');
var engine = require('ejs-mate');
//app.use(validator());


app.set('view engine', 'ejs');
app.engine('ejs', engine);
app.use(passport.initialize());
app.use(passport.session());
app.use(userroute);
app.set('views', path.join(__dirname, '/views'));
app.use(express.static(__dirname + '/public'));



app.use((req, res, next) => {
    res.status(404).send('Page not found');
  });

  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });

  
  
const PORT = process.env.PORT || 3900;
app.listen(PORT);