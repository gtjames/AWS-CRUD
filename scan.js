var AWS = require('aws-sdk'),
    documentClient = new AWS.DynamoDB.DocumentClient();

exports.scan = function (event, context, callback) {
    var params = {
        TableName : "notes"
    };
    documentClient.scan(params, function(err, data) {
        if (err) {
            callback(err,null);
        } else {
            callback(null, data.Items)
        }
        });
};