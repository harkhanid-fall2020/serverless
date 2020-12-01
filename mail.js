
exports.CreateBody = (params) =>{
    let message;
    if(params.type == "Insert"){
        questionlink = "http://localhost:3000/question/"+ params.questionId 
        questionText = "here".link(questionlink);
        message = ` Dear ${params.name} ,
        Someone has answered your question.To view your answer click here or you can view entire question by clicking ${questionText}
        Thank you.
        `
    }
    return message
}