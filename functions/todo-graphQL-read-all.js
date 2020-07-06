import { allTodos } from '../src/services/todo';
import on from 'await-handler';

exports.handler = async (event, context, callback) => {
  const [error, result] = await on(allTodos());
  
  if(error) {
    console.log({errol: error})
    return {
      statusCode: 422,
      body: `Error....: ${String(error)}`
    };
  }

  return {
    statusCode: result?.status ?? 500,
    body: JSON.stringify(result),
    headers: {
      'Content-Type': 'application/json',
    },
  }
}