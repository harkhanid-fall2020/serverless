const aws = require('aws-sdk');
const ses = new aws.SES({ region: "us-east-1" });

const main = async event =>{
    //getting Message from SNS Topic
    //let message = event.Records[0].Sns.Message;
    //console.log(message);

    
    //sending Mail
    
    const params = {
    Destination: {
      ToAddresses: ["dharmikharkhani12345@gmail.com"],
    },
    Message: {
      Body: {
        Text: { Data: "Test" },
      },

      Subject: { Data: "Test Email" },
    },
    Source: "demo@dev.dharmikharkhani.me",
  };
 
  return ses.sendEmail(params).promise()
    
}

exports.handler = main;