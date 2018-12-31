// console.log(process.env.NODE_ENV);
let AWS = require("aws-sdk");

AWS.config.update({
    region: "us-east-2",
    endpoint: "http://localhost:8000"
});

let dynamoDB = new AWS.DynamoDB();

const user_table_name = 'users';

let item_params = {
    TableName: user_table_name,
    KeySchema: [
        {AttributeName: "id", KeyType: "HASH"}//Partition key
    ],
    AttributeDefinitions: [
        {AttributeName: "id", AttributeType: "S"}
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 5,
        WriteCapacityUnits: 5
    }
};

//delete first before create new
dynamoDB.deleteTable({TableName: user_table_name}, function (err) {
    if (err) {
        console.error("Unable to delete user table. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("deleted user table.");
    }
});

dynamoDB.waitFor('tableNotExists', {TableName: user_table_name}, function (err, data) {
    if (err) {
        console.log(err);
    } else {
        console.log("begin to create " + user_table_name);

        dynamoDB.createTable(item_params, function (err) {
            if (err) {
                console.error("Unable to create user table. Error JSON:", JSON.stringify(err, null, 2));
            } else {
                console.log(user_table_name + " created.");

                const items = [
                    {
                        TableName: user_table_name,
                        Item: {
                            "id": "116076569637509922289",
                            "firstName": "Tony",
                            "lastName": "Stark"
                        }
                    },
                    {
                        TableName: user_table_name,
                        Item: {
                            "id": "116076569637509922290",
                            "firstName": "Peter",
                            "lastName": "Parker"
                        }
                    },
                    {
                        TableName: user_table_name,
                        Item: {
                            "id": "116076569637509922291",
                            "firstName": "David",
                            "lastName": "Banner"
                        }
                    }
                ];

                console.log("begin to load data");

                let docClient = new AWS.DynamoDB.DocumentClient();

                items.forEach(function (item) {
                    docClient.put(item, function (err, data) {
                        if (err) {
                            console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
                        }
                        console.log("add data", data);
                    });
                });


                console.log("query by id...");

                let query_params = {
                    TableName: user_table_name,
                    KeyConditionExpression: "#id = :iii",
                    ExpressionAttributeNames: {
                        "#id": "id"
                    },
                    ExpressionAttributeValues: {
                        ":iii": "116076569637509922288"
                    }
                };

                docClient.query(query_params, function (err, data) {
                    if (err) {
                        console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
                    } else {
                        console.log("query succeeded");
                        data.Items.forEach(function (item) {
                            console.log(item);
                        });
                    }
                });

                query_params = {
                    TableName: user_table_name,
                    KeyConditionExpression: "#id = :iii",
                    ExpressionAttributeNames: {
                        "#id": "id"
                    },
                    ExpressionAttributeValues: {
                        ":iii": "116076569637509922292"
                    }
                };

                docClient.query(query_params, function (err, data) {
                    if (err) {
                        console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
                    } else {
                        console.log("query succeeded", data.Items);
                    }
                });
            }
        });
    }
});

