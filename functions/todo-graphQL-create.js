import { createTodo } from '../src/services/todo';

exports.handler = async (event, context, callback) => {
  const { title, completed } = event.queryStringParameters;
  console.log({title, completed});
  const todo = {
    title,
    completed: completed.toLowerCase() === 'true' ? true : false,
  }

  const { errors, status, data } = await createTodo(todo);
  
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