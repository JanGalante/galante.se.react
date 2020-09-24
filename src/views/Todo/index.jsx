import React from "react";
import { useQuery, useMutation, useQueryCache } from 'react-query';
import { List, ListItem, ListItemText, CircularProgress, Checkbox } from '@material-ui/core';
// import { Alert, AlertTitle } from '@material-ui/lab';
import { FiX } from 'react-icons/fi';

import Form from './Form';

const createTodo = async (task) => {
  const response = await fetch(`./.netlify/functions/todo-graphQL-create?title=${task.title}&completed=${task.completed}`);
  return response;
}

const deleteTodo = async (id) => {
  const response = await fetch(`./.netlify/functions/todo-graphQL-delete?id=${id}`);
  return response;
}

const updateTodo = async (task) => {
  console.log({task})
  const response = await fetch(`./.netlify/functions/todo-graphQL-update?id=${task._id}&title=${task.title}&completed=${task.completed}`);
  return response;
}

const Topics = () => {
  const queryCache = useQueryCache()

  // const { status, data, error, isFetching } = useQuery(["todos"], fetchTodos);
  const { status, data, error, isFetching } = useQuery(["todos"], async () => {
    const response = await fetch('./.netlify/functions/todo-graphQL-read-all'); 
    const todos = await response.json();
    return todos;
  });

  // TODO: Create hook for optimistic updates
  const [addTask] = useMutation(createTodo, {
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

  const [deleteTask] = useMutation(deleteTodo, {
    onMutate: (id) => {
      // need to cancel any outgoing query refetches so they don't clobber your optimistic update when they resolve
      queryCache.cancelQueries("todos");
      const previousValue = queryCache.getQueryData("todos");
      queryCache.setQueryData("todos", (oldData) =>
        oldData.filter(task => task._id !== id)
      );

      return previousValue; // return snapshotValue
    },
    // On failure, roll back to the previous value
    onError: (err, variables, previousValue) =>
      queryCache.setQueryData("todos", previousValue),
    // After success or failure, refetch the todos query
    onSettled: () => {
      queryCache.invalidateQueries("todos");
    },
  })

  const [updateTask] = useMutation(updateTodo, {
    onMutate: (task) => {
      // need to cancel any outgoing query refetches so they don't clobber your optimistic update when they resolve
      queryCache.cancelQueries("todos");
      const previousValue = queryCache.getQueryData("todos");
      queryCache.setQueryData("todos", (oldData) =>
        oldData.map(oldTask => {
          return oldTask._id !== task._id
          ? oldTask
          : task
        })
      );

      return previousValue; // return snapshotValue
    },
    // On failure, roll back to the previous value
    onError: (err, variables, previousValue) =>
      queryCache.setQueryData("todos", previousValue),
    // After success or failure, refetch the todos query
    onSettled: () => {
      queryCache.invalidateQueries("todos");
    },
  })


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
      {/* { isFetching &&
        <Alert severity="info">
          <AlertTitle>Info</AlertTitle>
          Background Updating...
        </Alert>
      } */}
      <h1>Todo</h1>
      <Form addTask={addTask} />
      <List>
        {data
        .sort((a, b) => a['_id'] < b['_id'] ? 1 : -1)
        .map((todo) => (
          <ListItem key={todo._id} divider={true}>
            {/* <FormControlLabel
              control={<Checkbox checked={state.checkedA} onChange={handleChange} name="checkedA" />}
              label="Secondary"
            /> */}
            <Checkbox 
              checked={todo.completed} 
              onChange={() => {
                const toggledTask = {
                  ...todo,
                  completed: !todo.completed,
                }
                updateTask(toggledTask)
              }} 
              name={`completed-${todo._id}`}
              // color="primary"
            />
            <ListItemText primary={todo.title} secondary={todo.completed ? 'is completed' : 'is not completed'} />
            <FiX color="#f44336" onClick={() => deleteTask(todo._id)} />
          </ListItem>
        ))}
      </List>
      <div>{isFetching ? "Background Updating..." : " "}</div>
    </>
  );


  
};

export default Topics;
