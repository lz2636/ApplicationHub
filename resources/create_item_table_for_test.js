// console.log(process.env.NODE_ENV);

const uuid = require('uuid/v4');

let AWS = require("aws-sdk");

AWS.config.update({
    region: "us-east-2",
    endpoint: "http://localhost:8000"
});

let dynamoDB = new AWS.DynamoDB();

const item_table_name = 'items';
const test_account = 'app-hub-z';

let item_params = {
    TableName: item_table_name,
    KeySchema: [
        {AttributeName: "id", KeyType: "HASH"},  //Partition key
        {AttributeName: "tag", KeyType: "RANGE"},  //Partition key
    ],
    AttributeDefinitions: [
        {AttributeName: "id", AttributeType: "S"},
        {AttributeName: "tag", AttributeType: "S"},
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 5,
        WriteCapacityUnits: 5
    }
};

//delete first before create new
dynamoDB.deleteTable({TableName: item_table_name}, function (err) {
    if (err) {
        console.error("Unable to delete user table. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("deleted user table.");
    }
});

dynamoDB.waitFor('tableNotExists', {TableName: item_table_name}, function (err, data) {
    if (err) {
        console.log(err);
    } else {
        console.log("begin to create " + item_table_name);

        dynamoDB.createTable(item_params, function (err) {
            if (err) {
                console.error("Unable to create user table. Error JSON:", JSON.stringify(err, null, 2));
            } else {
                console.log(item_table_name + " created.");

                const items = [
                    {
                        TableName: item_table_name,
                        Item: {
                            "id": uuid(),
                            "account": test_account,
                            "tag": "project",
                            "name": "intern at A",
                            "info": {
                                "text": "I worked for a compiler project"
                            }
                        }
                    },
                    {
                        TableName: item_table_name,
                        Item: {
                            "id": uuid(),
                            "account": test_account,
                            "tag": "project",
                            "name": "web dev course",
                            "info": {
                                "text": "Implemented a small web service"
                            }
                        }
                    },
                    {
                        TableName: item_table_name,
                        Item: {
                            "id": uuid(),
                            "account": test_account,
                            "tag": "project",
                            "name": "research at B univ",
                            "info": {
                                "text": "I proposed a new method for XXX"
                            }
                        }
                    }
                ];

                console.log("begin to load data");

                let docClient = new AWS.DynamoDB.DocumentClient();

                items.forEach(function (item) {
                    docClient.put(item, function (err) {
                        if (err) {
                            console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
                        }
                    });
                });


                console.log("query all data by tag....");

                let scan_params = {
                    TableName: item_table_name,
                    FilterExpression: "#tag = :ttt and #account = :aaa",
                    ExpressionAttributeNames: {
                        "#tag": "tag",
                        "#account": "account"
                    },
                    ExpressionAttributeValues: {
                        ":ttt": "project",
                        ":aaa": test_account
                    }
                };

                docClient.scan(scan_params, function (err, data) {
                    if (err) {
                        console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
                    } else {
                        console.log("query succeeded");

                        data.Items.forEach(function (item) {
                            console.log(item);
                        });
                    }
                });
            }
        });
    }
});

