const express = require('express');
var app =express();

app.get('/',(req,res)=>{
    res.send("hello worls");
});

const PORT = process.env.PORT || 4000;
app = app.listen(PORT, ()=> {
    console.log("Listening..");
});