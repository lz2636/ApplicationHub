const AWS = require("aws-sdk");

class DatabaseHelper {
    constructor() {
        //setup local config
        AWS.config.update({
            region: "us-east-2",
            endpoint: "http://localhost:8000"
        });

        this.docClient = new AWS.DynamoDB.DocumentClient();
        this.userTable = "users";
        this.itemTable = "items";
    }

    query(query_params, callback) {
        this.docClient.query(query_params, function (err, data) {
            if (err) {
                console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
            }
            // use callback
            callback(err, data);

        });
    }

    scan(scan_params, callback) {
        this.docClient.scan(scan_params, function (err, data) {
            if (err) {
                console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
            }
            // use callback
            callback(err, data);
        });
    }

    put(put_params, callback) {
        this.docClient.put(put_params, function (err, data) {
            if (err) {
                console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
            }
            callback(err, data);

        });
    }
}

module.exports = new DatabaseHelper();