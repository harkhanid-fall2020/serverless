const aws = require('aws-sdk');
const ses = new aws.SES({ region: "us-east-1" });
const ddb = new aws.DynamoDB.DocumentClient({ region:"us-east-1"});
const mail = require('./mail');    
const main = async event =>{
    
    let message = event.Records[0].Sns.Message;
    let parsedMessage = JSON.parse(message);
    
    const getParams = {
      TableName: 'demoTable',
      Key:{
        id:parsedMessage.id
      }
    }
    
    try{
      const getData = await ddb.get(getParams).promise();
    
      if(getData.Item != undefined){
        console.log("Mail Already Sent. Duplicate mail request: ", getData);
      }else{
        //console.log("Not Duplicate");
        const params = {
          TableName: 'demoTable',
          Item:parsedMessage
        }
        
        console.log(mail.CreateBody(params));
        
    // sending Mail
    
    // const paramMail = {
    //   Destination: {
    //     ToAddresses: [parsedMessage.receiver],
    //   },
    //   Message: {
    //     Body: {
    //       Text: { Data: "Test" },
    //     },
    //   Subject: { Data: "Test Email" },
    //   },
    //   Source: "demo@dev.dharmikharkhani.me",
    // };
//  checking 
  return ses.sendEmail(params).promise()
        const fnput = await ddb.put(params).promise();
        
        }
    }catch(e){
      console.log(e);
    }
    
    
    
}

exports.handler = main;