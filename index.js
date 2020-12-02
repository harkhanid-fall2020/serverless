const aws = require('aws-sdk');
const ses = new aws.SES({ region: "us-east-1" });
const ddb = new aws.DynamoDB.DocumentClient({ region:"us-east-1"});
const mail = require('./mail');    
const main = async event =>{
    
    let message = event.Records[0].Sns.Message;
    console.log("MSG:",message);
    let parsedMessage = JSON.parse(message);
    let sub ="";
    const getParams = {
      TableName: 'csye6225',
      Key:{
        id:parsedMessage.id
      }
    }
    
    let Subject 
    
    try{
      const getData = await ddb.get(getParams).promise();
    
      if(getData.Item != undefined){
        console.log("Mail Already Sent. Duplicate mail request: ", getData);
      }else{
        //console.log("Not Duplicate");
        const params = {
          TableName: 'csye6225',
          Item:parsedMessage
        }
        
    // sending Mail
    let mailBody = mail.CreateBody(parsedMessage)
    
    const paramMail = {
      Destination: {
        ToAddresses: [parsedMessage.receiver],
      },
      Message: {
        Body: {
          Text: { Data:  mailBody},
        },
      Subject: { Data: parsedMessage.type+ " - Notification" },
      },
      Source: "notification@"+params.domain,
    };
//  checking 
    return ses.sendEmail(paramMail).promise()
        const fnput = await ddb.put(params).promise();
        
        }
    }catch(e){
      console.log(e);
    }
    
    
    
}

exports.handler = main;