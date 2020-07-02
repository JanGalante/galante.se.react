import { fetchAll } from '../src/services/todo';
import on from 'await-handler';

exports.handler = async (event, context, callback) => {
  const [error, result] = await on(fetchAll());
  
  if(error) {
    return { statusCode: 422, body: `Error....: ${String(error)}` };
  }

  return {
    statusCode: 200,
    body: JSON.stringify(result),
    headers: {
      'Content-Type': 'application/json',
    },
  }
}