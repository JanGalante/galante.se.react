import fetch from 'node-fetch';
import dotenv from 'dotenv'
import { GraphQLClient } from 'graphql-request'

// set values from .env file as defaults for environment variabled in process.env
dotenv.config('') // Should be done only once at startup, but has to be solved with lambda functions

const { FAUNA_TODO_SECRET } = process.env;
const endpoint = 'https://graphql.fauna.com/graphql'

const graphQLClient = new GraphQLClient(endpoint, {
  headers: {
    authorization: `Bearer ${FAUNA_TODO_SECRET}`,
  },
})


const allTodos = async () => { 
  const query = /* GraphQL */ `
    {
      allTodos {
        data {
          _id
          title
          completed
      }
    }
  }`
 
  const data = await graphQLClient.request(query)
  // console.log(JSON.stringify(data, undefined, 2))

  // get the todos from the result
  // no need to map sice it is done with the graphQL query
  const todos = data?.allTodos?.data;

  return {
    success: data.ok, // true or false
    status: data.status, // 200 when OK
    todos // list of todos
  };
}

const createTodo = async () => {
  const title = 'Possible to add todo in code';

  const mutation = /* GraphQL */ `
    mutation createTodo($data: TodoInput!) {
      createTodo(data: $data) {
        _id
        title
        completed
      }
    }
  `

  const variables = {
    data: {
      title,
      completed: false,
    },
  }

  // const data = await request(endpoint, query, variables)
  const data = await graphQLClient.request(mutation, variables)

  // console.log(JSON.stringify(data, undefined, 2))
  
  // get the todos from the result
  // no need to map sice it is done with the graphQL query
  const todos = data?.createTodo;

  return {
    success: data.ok, // true or false
    status: data.status, // 200 when OK
    todos // list of todos
  };
}

export {
  allTodos,
  createTodo,
}