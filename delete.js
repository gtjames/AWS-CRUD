var AWS = require('aws-sdk'),
	documentClient = new AWS.DynamoDB.DocumentClient;

exports.delete = (event, context, callback) => {
	var params = {
		Key: { id: event.id },
		TableName : "notes"
	};
	documentClient.delete(params, (err, data) => {
		if (err) {
			callback(err,null);
		} else {
			data.id = event.id;		//	just added this for fun to see it in the Execution results
			callback(null, data)
		}
	});
}