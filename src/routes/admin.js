var fs = require('fs');
var User = require('../models/user');
var express = require('express');
var app = express();
var passportConf = require('../services/passport');
var passport = require('passport');
var async = require('async');
var router = require('express').Router();

router.get('/admin',(req,res)=>{
    res.render('adminlogin');

})
router.post('/admin',(req,res,next)=>{

})