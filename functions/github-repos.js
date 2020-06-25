import service from '../src/services/github'
import on from 'await-handler';

exports.handler = async (event, context, callback) => {
  const [error, result] = await on(service.fetchRepositories());
  if(error) {
    return { statusCode: 422, body: `Error....: ${String(error)}` };
  }

  return {
    statusCode: 200,
    body: JSON.stringify(result)
  }
}
