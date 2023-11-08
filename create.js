var AWS = require('aws-sdk'),
    documentClient = new AWS.DynamoDB.DocumentClient();

exports.create = function (event, context, callback) {
    var params = {
        Item : {
            "id" : new Date().getTime().toString(),         //  this will produce a random number
            "topic": event.topic,
            "note":  event.note
        },
        TableName: "notes"
    };
    documentClient.put(params, function(err, data) {
        callback(err, {msg: "done", id: params.Item.id});
    });
    
};
