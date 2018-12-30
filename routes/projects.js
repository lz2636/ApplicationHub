const express = require('express');
const router = express.Router();
const db = require('../services/dbhelper');

// todo user id for test, use router with auth later
let account = 'app-hub-z';

router.get('/', function (req, res) {
    //load projects list
    db.scan({
        TableName: db.itemTable,
        FilterExpression: "#tag = :ttt and #account = :aaa",
        ExpressionAttributeNames: {
            "#tag": "tag",
            "#account": "account"
        },
        ExpressionAttributeValues: {
            ":ttt": "project",
            ":aaa": account
        }
    }, function (err, data) {
        if (err) {
            throw err;
        }
        res.contentType('application/json');
        res.send(JSON.stringify(data.Items));
    });
});

module.exports = router;