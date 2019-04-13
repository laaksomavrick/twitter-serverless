"use strict";

const AWS = require("aws-sdk");
const dynamo = new AWS.DynamoDB.DocumentClient();

// will have to write some promise / PascalCase wrapping stuff over the dynamodb client

module.exports.hello = async event => {
  try {
    const putParams = {
      TableName: "auth",
      Item: {
        auth_id: "12345",
        email: "blah",
        password: "qwe",
      },
    };

    const getParams = {
      TableName: "auth",
      Key: {
        auth_id: "12345",
      },
    };

    await dynamo.put(putParams).promise();

    const { Item } = await dynamo.get(getParams).promise();

    return {
      statusCode: 200,
      body: Item,
    };
  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: e.toString(),
      }),
    };
  }
};
