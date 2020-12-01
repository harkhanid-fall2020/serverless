const aws = require('aws-sdk');
const ses = new aws.SES({ region: "us-east-1" });
const main = async event =>{
    //getting Message from SNS Topic
    
    console.log("EVENT",event.Records[0].Sns);
    let message = event.Records[0].Sns.Message.MessageId;
    console.log(message);
    let parsedMessage = JSON.parse(message);
    const ddb = new aws.DynamoDB.DocumentClient({ region:"us-east-1"});
    console.log("NAME1:")
  
    const getParams = {
      TableName: 'demoTable',
      Key:{
        'id':parsedMessage.id
      }
    }
    console.log(":",getParams);
    try{
      const getData = await ddb.get(getParams).promise();
    }catch(e){
      console.log(e);
    }
    
    parsedMessage.id = event.Records[0].Sns.Message.MessageId;
    
    
    const params = {
      TableName: 'demoTable',
      Item:parsedMessage
    }
    
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