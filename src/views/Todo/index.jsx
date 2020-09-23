import React from "react";
import { useQuery, useMutation, useQueryCache } from 'react-query';
import { List, ListItem, ListItemText, CircularProgress } from '@material-ui/core';

import Form from './Form';

const createTodo = async (task) => {
  const response = await fetch(`./.netlify/functions/todo-graphQL-create?title=${task.title}&completed=${task.completed}`);
  return response;
}

const Topics = () => {
  const fetchTodos = async () => {
    const response = await fetch('./.netlify/functions/todo-graphQL-read-all'); 
    const commits = await response.json();
    return commits;
  };

  const queryCache = useQueryCache()

  const { status, data, error, isFetching } = useQuery(["todos"], fetchTodos);
  const [mutate] = useMutation(createTodo, {
    // onSuccess: () => {
    //   // When this mutation succeeds, invalidate any queries with the `todos` query key
    //   queryCache.invalidateQueries('todos');
    // },
    // onError: (error) => {
    //   throw error;
    // },
    onMutate: (task) => {
      // need to cancel any outgoing query refetches so they don't clobber your optimistic update when they resolve
      queryCache.cancelQueries("todos");
      const previousValue = queryCache.getQueryData("todos");
      queryCache.setQueryData("todos", (oldData) => [        
        task,
        ...oldData,
      ]);

      return previousValue; // return snapshotValue
    },
    // On failure, roll back to the previous value
    onError: (err, variables, previousValue) =>
      queryCache.setQueryData("todos", previousValue),
    // After success or failure, refetch the todos query
    onSettled: () => {
      queryCache.invalidateQueries("todos");
    },
  });

  const addTask = async (task) => {
    try {
      const response = await mutate(task)
      // Todo was successfully created
      console.log('Todo created');
      console.log({response});
    } catch (error) {
      // Uh oh, something went wrong
      console.log('Error creating todo')
    }
  }

  if (status === "loading") {
    return <CircularProgress />
  }

  if (status === "error") {
    return <span>Error: {error.message}</span>;
  }

  if (!data) {
    return (
      <h3>There are no commits :(</h3>
    );
  }

  return (
    <>
      <h1>Todo</h1>
      <Form addTask={addTask} />
      <p>List of todos</p>
      <List>
        {data
        .sort((a, b) => a['_id'] < b['_id'] ? 1 : -1)
        .map((todo) => (
          <ListItem key={todo._id}>
            <ListItemText primary={todo.title} secondary={todo.completed ? 'is completed' : 'is not completed'} />
          </ListItem>
        ))}
      </List>
      <div>{isFetching ? "Background Updating..." : " "}</div>
    </>
  );


  
};

export default Topics;
