const express = require('express');
const app = express();

const projects = require('./routes/projects');
app.use('/projects', projects);

//home page
app.get('/', (req, res) => {
    res.send('hello from application hub modified!')
});

app.get('*', function (req, res) {
    res.redirect('/');
});

app.listen(3000, () => console.log('Server running on port 3000'))
