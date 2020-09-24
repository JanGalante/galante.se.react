import { updateTodo } from '../src/services/todo';

exports.handler = async (event, context, callback) => {
  const { id, title, completed } = event.queryStringParameters;
  const todo = {
    id,
    title,
    completed: completed.toLowerCase() === 'true' ? true : false,
  }

  const { errors, status, data } = await updateTodo(todo);
  
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