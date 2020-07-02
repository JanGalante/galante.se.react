import React from "react";
import { useQuery } from 'react-query';
import { List, ListItem, ListItemText, CircularProgress } from '@material-ui/core';

const Topics = () => {
  const fetchTodos = async () => {
    const response = await fetch('./.netlify/functions/todo-graphQL-read-all'); 
    const commits = await response.json();
    return commits;
  };

  const { status, data, error, isFetching } = useQuery(["todos"], fetchTodos);

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
      <p>List of todos</p>
      <List>
        {data?.todos.map((todo) => (
          <ListItem key={todo._id}>
            <ListItemText primary={todo.title} secondary={todo.completed ? 'is completed' : 'is not completed'} />
          </ListItem>
        ))}
      </List>
    </>
  );


  
};

export default Topics;
