
exports.CreateBody = (params) =>{
    let message={};
    if(params.type == "Insert"){
        let questionlink = "http://localhost:3000/question/"+ params.questionId;
        let answerLink = "http://localhost:3000/question/"+ params.questionId+'/answer/'+params.answerId;
        
        message = ` 
    Dear ${params.name} ,
                    
Someone has answered your question.

To view only Answer click the following link
(${answerLink})

you can view entire question by clicking the following link
(${questionlink})


From,
Web App Services.`;
        console.log("INSIDE MAIL:", message);
    }else if(params.type == "Update"){
    let questionlink = "http://localhost:3000/question/"+ params.questionId;
        let answerLink = "http://localhost:3000/question/"+ params.questionId+'/answer/'+params.answerId;
        
        message = ` 
    Dear ${params.name} ,
                    
Someone has Updated answer to your question.

To view only Answer click the following link
(${answerLink})

you can view entire question by clicking the following link
(${questionlink})

From,
Web App Services.`;
        console.log("INSIDE MAIL:", message);        
    }else if(params.type == "Delete"){
    let questionlink = "http://localhost:3000/question/"+ params.questionId;

        message = ` 
    Dear ${params.name} ,
                    
Someone has Deleted answer to your question.

you can view entire question by clicking the following link
(${questionlink})

From,
Web App Services.`;
        console.log("INSIDE MAIL:", message);        
    }
    return message;
}