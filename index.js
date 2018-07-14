const express = require('express');
var bodyParser = require('body-parser');
var cookie = require('cookie-parser');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var app = express();
var flash = require('connect-flash');
const mongoose = require('mongoose');
var path = require('path');
var keys = require('./src/config/keys');

mongoose.connect(keys.mongoURI);
var db = mongoose.connection;
mongoose.Promise = global.Promise;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log("We are connected");
});


app.use(cookie());
//app.use(cors());
app.use(session({
  secret: 'super-secret-key',
  key: 'super-secret-cookie',
  httpOnly: true,
  secure: true,
  resave: false,
  saveUninitialized: false,
  cookie: { expires: 600000 * 5 },
  store: new MongoStore({ url: keys.mongoURI, autoReconnect: true })
}));

//app.use(csrf({ cookie : false }));

app.use(flash());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var router = express.Router();

const userroute = require('./src/routes/user');
var bycrypt = require('bcrypt-nodejs');
app.use(userroute);
var ejs = require('ejs');
var engine = require('ejs-mate');
//app.use(validator());


app.set('view engine', 'ejs');
app.engine('ejs', engine);
app.use(userroute);
app.set('views', path.join(__dirname, './src/views'));
app.use(express.static(__dirname + '/src/public'));



app.use((req, res, next) => {
  res.status(404);
  res.render('404');
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});


const PORT = process.env.PORT || 3900;
app.listen(PORT);