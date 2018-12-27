const express = require('express');
const router = express.Router();

const fs = require("fs");
const path = require('path');

router.get('/', function (req, res) {
    //load projects list;
    let jsonPath = path.join(__dirname, '..', 'resources', 'test_proj.json');
    fs.readFile(jsonPath.toString(), 'utf8', function (err, data) {
        if (err) throw err;
        let jsonObj = JSON.parse(data);
        res.contentType('application/json');
        res.send(JSON.stringify(jsonObj));
    });
});

module.exports = router;