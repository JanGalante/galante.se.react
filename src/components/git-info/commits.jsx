import React from 'react';
import { useQuery } from 'react-query';
import { Button, List, ListItem, ListItemText, CircularProgress } from '@material-ui/core';
import { format } from 'date-fns'


// Anywhere the [queryKey, variables, queryFn, config] options are supported throughout React Query's API
// you can also use an object to express the same configuration:
// useQuery({
//   queryKey: ['todo', 7],
//   queryFn: fetchTodos,
//   variables: [],
//   config: {},
// })


const Commits = ({ repo }) => {
  const fetchCommits = async () => {
    const response = await fetch(`./.netlify/functions/github-commits?repo=${repo}`); 
    const commits = await response.json();
    return commits;
  }; 

  const { status, data, error, isFetching } = useQuery(["commits", repo], fetchCommits, {
    enabled: repo, // 'repo' would be falsy at first, so the query will not execute until the repo exists
  });

  if (status === "loading") {
    return <CircularProgress />
  }

  if (status === "error") {
    return <span>Error: {error.message}</span>;
  }

  if (!repo) {
    return (
      <>
        <span>Slelect repository to see commits here...</span>
        <Button variant="contained" color="primary">Hello World</Button>
        <Button variant="contained" color="secondary">Hello World</Button>
      </>
    );
  }

  return (
    <>
      <h3>Current commits</h3>
      <List>
        {data.map((commit) => (
          <ListItem key={repo.sha}>
            <ListItemText primary={commit.message} secondary={format(commit.date, 'yyyy-MM-dd HH:mm')} />
          </ListItem>
        ))}
      </List>
      <div>{isFetching ? "Background Updating..." : " "}</div>
    </>
  );
};

export default Commits;