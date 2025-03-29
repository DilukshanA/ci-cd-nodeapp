const express = require('express');

const app = express();

//create a endpoint
app.get('/', (req, res) => {
    res.send('CI/CD Pipeline with Jenkins and Docker for Node.js Application -> test-1');
})

app.listen(4000,()=>{
    console.log('Server is running on port 4000');
})