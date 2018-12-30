const express = require('express');
const app = express();


const auth = require('./routes/auth');
const projects = require('./routes/projects');
require('./services/passport');

app.use('/auth', auth);
app.use('/projects', projects);

//landing page
app.get('/', (req, res) => {
    res.send('hello from application!')
});

app.get('*', function (req, res) {
    res.redirect('/');
});


app.listen(5000, () => console.log('Server running on port 5000'));
