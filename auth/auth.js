const express = require('express');
const port = require('./config.json')

const app =express();

app.get('/',(req,res)=>{
    return res.sendFile('index.html', {root: '.'});
});

app.listen(port, () => console.log(`App started on port: ${port}`)) 