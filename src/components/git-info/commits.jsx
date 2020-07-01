import React from 'react';
import { useQuery } from 'react-query';
import { List, ListItem, ListItemText } from '@material-ui/core';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
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
    return (
      <SkeletonTheme color="#202020" highlightColor="#444">
        <h3>Current commits</h3>
          <List>
            {Array(4).fill().map((item, index) => (
              <ListItem key={index}>
                <ListItemText 
                  primary={<Skeleton width={400} />}x
                  secondary={<Skeleton width={200} />}
                />
              </ListItem>
            ))}
          </List>
      </SkeletonTheme>
    );
  }

  if (status === "error") {
    return <span>Error: {error.message}</span>;
  }

  if (!repo) {
    return (
      <h3>Current commits</h3>
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