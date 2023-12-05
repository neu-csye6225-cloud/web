
import AWS from 'aws-sdk';
 
const sns = new AWS.SNS();
AWS.config.update({
    region: 'us-east-1', 
    credentials: {
      accessKeyId: 'AKIAWAX7DYRY45RJBJ6D', // Replace with your access key ID
      secretAccessKey: 'xt1yxcubtvMmZrADSg7uhqpYBGJXQHhmwyPHtia8' // Replace with your secret access key
    }
  });


export const publishMessageToSNS = async (request, response) => {
  const message = "Assignment posted by the user"
 
  const attributes = {
    submissionUrl: {
      DataType: "String",
      StringValue: request.submissionUrl
    },
    assignmentId: {
      DataType: "String",
      StringValue: request.assignmentId,
    }
  };
 
  const params = {
    TopicArn: process.env.TopicArn,
    Message: message,
    MessageAttributes: attributes
  };
 
  console.log(params);
 
  try {
    const data = await new Promise((resolve, reject) => {
      sns.publish(params, (error, result) => {
        if (error) {
          console.log("error publishing", error);
          
          reject(error);
        } else {
          console.log("successfully published");
          
          resolve(result);
        }
      });
    });
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};