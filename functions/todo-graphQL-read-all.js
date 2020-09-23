import { allTodos } from '../src/services/todo';
import on from 'await-handler';

exports.handler = async (event, context, callback) => {
  
  const { errors, status, data } = await allTodos(); 
  if(errors) {
    console.log({errors: errors})
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