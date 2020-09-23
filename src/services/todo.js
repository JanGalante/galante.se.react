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
 
  const { data, errors, status } = await graphQLClient.rawRequest(query)
  // get the todos from the result
  // no need to map sice it is done with the graphQL query
  const todos = data.allTodos.data;

  return {
    errors,
    status,
    data: todos // list of todos
  };
}

const createTodo = async ({ title, completed }) => {
  // const title = 'Possible to add todo in code';

  const mutation = /* GraphQL */ `
    mutation createTodo($data: TodoInput!) {
      createTodo(data: $data) {
        _id
        title
        completed
      }
    }
  `;

  const variables = {
    data: {
      title,
      completed,
    },
  };

  const { data, errors, status } = await graphQLClient.rawRequest(mutation, variables);

  // get the todos from the result
  // no need to map sice it is done with the graphQL query
  const todos = data?.createTodo;

  return {
    errors,
    status,
    data: todos, // list of todos
  };
};

const deleteTodo = async (id) => {
  const mutation = /* GraphQL */ `
    mutation deleteTodo($id: ID!) {
      deleteTodo(id: $id)
      {
        _id
        title
        completed
      }
    }
  `;

  const variables = {
    id: id,
  };

  const { data, errors, status } = await graphQLClient.rawRequest(mutation, variables);

  // get the todos from the result
  // no need to map sice it is done with the graphQL query
  const todo = data?.deleteTodo;

  return {
    errors,
    status,
    data: todo, // deleted todo
  };
};

export {
  allTodos,
  createTodo,
  deleteTodo,
}