import React, { useState } from 'react';
import { useQuery } from 'react-query';


const settings = {
  retry: 0, // 3
  // retryDelay
  // cacheTime:  1000 * 60 * 5, // milliseconds
  // staleTime: 0 // milliseconds.
  staleTime: Infinity, // milliseconds.
  refetchInterval: false,
  refetchOnWindowFocus: false,
}

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
    const response = await fetch(`https://api.github.com/repos/jangalante/${repo}/commits`,
    {
      headers: {
        // TODO:place token in environment variable, not in code
        authorization: 'token e923a79b9ed23f1ddfc68281bc52d9e086f3c11c'
      },
    });
  
    const json = await response.json();
    console.log({repo, json});
  
    // map data
    const data = json.map((item) => {
      return { 
        sha: item.sha,
        message: item.commit?.message,
        date: item.commit?.committer?.date,
      }
    })
    return data;
  }; 

  const queryKey = repo && ["commits", repo]; // pass a falsy value as the query key if query isn't ready to be requested 
  const { status, data, error, isFetching } = useQuery(queryKey, fetchCommits, settings);

  if (status === "loading") {
    return <span>Loading...</span>;
  }

  if (status === "error") {
    return <span>Error: {error.message}</span>;
  }

  if (!repo) {
    return <span>Slelect repository to see commits here...</span>;
  }

  return (
    <>
      <h2>Current commits</h2>
      <ul>
        {data.map((commit) => (
          <li key={commit.sha}>{commit.date} - {commit.message}</li>
        ))}
      </ul>
      <div>{isFetching ? "Background Updating..." : " "}</div>
    </>
  );
};

export default Commits;