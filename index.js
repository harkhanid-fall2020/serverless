const aws = require('aws-sdk');
const ses = new aws.SES({ region: "us-east-1" });
const {"v4": uuidv4} = require('uuid');
const main = async event =>{
    //getting Message from SNS Topic
    let message = event.Records[0].Sns.Message;
    console.log(message);
    let parsedMessage = JSON.parse(message);
    const ddb = new aws.DynamoDB.DocumentClient({ region:"us-east-1"});
    parsedMessage.id = uuidv4();
    
    
    const params = {
      TableName: 'demoTable',
      Item:parsedMessage
    }

    const getParams = {
      TableName: 'demoTable',
      Item:message
    }
    console.log(getParams);
    const getData = await ddb.get(params).promise();
    
    
    const fnput = await ddb.put(params).promise();
    // sending Mail
    
//     const params = {
//     Destination: {
//       ToAddresses: ["dharmikharkhani12345@gmail.com"],
//     },
//     Message: {
//       Body: {
//         Text: { Data: "Test" },
//       },

//       Subject: { Data: "Test Email" },
//     },
//     Source: "demo@dev.dharmikharkhani.me",
//   };
// //  checking 
//   return ses.sendEmail(params).promise()
    
}

exports.handler = main;