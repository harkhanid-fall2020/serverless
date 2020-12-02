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
    
  let getparams1 
  if(parsedMessage.apiAction == "Insert"){
    getparams1 = {
  TableName : 'csye6225',
  FilterExpression : 'questionId = :questionId and apiAction = :apiAction and answerText = :answerText and userId = :userId',
  ExpressionAttributeValues : {
    ':questionId' : parsedMessage.questionId,
    ':apiAction' : parsedMessage.apiAction,
    ':answerText' : parsedMessage.answerText,
    ':userId' : parsedMessage.userId
  }
  }; 
  }else{
    getparams1 = {
      TableName : 'csye6225',
      FilterExpression : 'questionId = :questionId and answerId = :answerId and apiAction = :apiAction and answerText = :answerText and userId = :userId',
      ExpressionAttributeValues : {
        ':questionId' : parsedMessage.questionId,
        ':apiAction' : parsedMessage.apiAction,
        ':answerText' : parsedMessage.answerText,
        ':userId' : parsedMessage.userId,
        ':answerId' : parsedMessage.answerId
  }
  }; 

  }
  

    
    let Subject;
    
    try{
      //const getData = await ddb.get(getParams).promise();
      const getData = await ddb.scan(getparams1).promise();
      console.log("GETDATA:",getData);
      //if(getData.Item != undefined){
      if(getData.count != 0){
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
      Subject: { Data: parsedMessage.apiAction+ " - Notification" },
      },
      Source: "notification@"+parsedMessage.domain,
    };
//  checking 
      const mailAns= await ses.sendEmail(paramMail).promise()
      const fnput = await ddb.put(params).promise();
        return mailAns;
        }
    }catch(e){
      console.log(e);
    }
}

exports.handler = main;