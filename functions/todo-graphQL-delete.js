import { deleteTodo } from '../src/services/todo';

exports.handler = async (event, context, callback) => {
  const { id } = event.queryStringParameters;
  const { errors, status, data } = await deleteTodo(id);
  
  if(errors) {
    return { 
      statusCode: status, 
      body: `Error....: ${String(errors)}`
    };
  }

  return {
    statusCode: status,
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  }
}