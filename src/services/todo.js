import fetch from 'node-fetch';
import dotenv from 'dotenv'

// set values from .env file as defaults for environment variabled in process.env
dotenv.config('') // Should be done only once at startup, but has to be solved with lambda functions


const { FAUNA_TODO_SECRET } = process.env;
console.log({ token: FAUNA_TODO_SECRET })

const fetchAll = async () => {
  const query = `{
    allTodos {
      data {
        _id
        title
        completed
      }
    }
  }`;

  const response = await fetch('https://graphql.fauna.com/graphql', 
  { 
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${FAUNA_TODO_SECRET}`,
    },
    body: JSON.stringify({query}),
  });

  const result = await response.json();

  // get the todos from the result
  // no need to map sice it is done with the graphQL query
  const todos = result?.data?.allTodos?.data;
  console.log({todos})
  
  return {
    success: response.ok, // true or false
    status: response.status, // 200 when OK
    todos, // list of todos
  };
}

export {
  fetchAll,
}