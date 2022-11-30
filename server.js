const express = require('express');
const fs      = require('fs');
const path    = require('path');

const app = express();
const PORT = process.env.port || 3001;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use

app.listen(PORT, function(){
    console.log('App listening on PORT: ' + PORT);
});