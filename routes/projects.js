const express = require('express');
const router = express.Router();
const db = require('../services/dbhelper');
const uuid = require('uuid/v4');

var bodyParser = require('body-parser');
router.use(bodyParser.json()); // support json encoded bodies
router.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

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

// update an existing project (identified by item id)
router.post('/update', function(req, res) {
    var id = req.body.id; // item id
    var tag = req.body.tag;
    var name = req.body.name;
    var text = req.body.text;
    var params = {
        TableName: db.itemTable,
        Key:{
            "id": id,
            "tag": tag
        },
        UpdateExpression: "set #name = :n, #info.#text = :t",
        // only update the project with this id
        ConditionExpression: "#id = :id",        
        ExpressionAttributeNames:{
            "#id": "id",
            "#name": "name",
            "#info": "info",
            "#text": "text"
        },
        ExpressionAttributeValues:{
            ":id": id,
            ":n": name,
            ":t": text
        },

        ReturnValues: "UPDATED_NEW"
    };

    db.update(params, function (err, data) {
        if (err) {
            // TODO: may need to send error msg back to client?
            throw err;
        }
        // right now client reloads page as long as there is anything sent back
        // from server
        res.send("success");
    });
})


// create a new project
router.post('/put', function(req, res) {
    var id = uuid(); // item id
    var tag = req.body.tag;
    var name = req.body.name;
    var text = req.body.text;
    var params = {
        TableName: db.itemTable,
        Item:{
            "id": id,
            "account": account,
            "tag": tag,
            "name": name,
            "info": {
                "text": text
            }
        }
    };

    db.put(params, function (err, data) {
        if (err) {
            throw err;
        }
        res.send("success");
    });
})


// delete an existing project (identified by item id)
router.post('/delete', function(req, res) {
    var id = req.body.id; // item id
    var tag = req.body.tag;
    var params = {
        TableName: db.itemTable,
        Key:{
            "id": id,
            "tag": tag
        },
        ConditionExpression: "#id = :id",        
        ExpressionAttributeNames:{
            "#id": "id"
        },
        ExpressionAttributeValues:{
            ":id": id
        },

        ReturnValues:"ALL_OLD"
    };

    db.delete(params, function (err, data) {
        if (err) {
            // TODO: may need to send error msg back to client?
            throw err;
        }
        res.send("success");
    });
})

module.exports = router;