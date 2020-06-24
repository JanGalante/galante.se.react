import React, { useState, useEffect } from 'react'
import { List, ListItem, ListItemText, CircularProgress } from '@material-ui/core';

import service from '../services/github'
import Commits from '../components/git-info/commits';


// // TODO: Gör om till hooks och använd react-query för att hämta data och cache
export default function Repositories() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [repos, setRepo] = useState([]);
  const [selectedRepo, setSelectedRepo] = useState(undefined);

  // const theme = useTheme();
  // const classes = useStyles();

  const repoStyle = { 
    width: '30%',
    display: 'flex',
  };

  const layoutStyle = { 
    display: 'flex',
    // width: '500px',
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      const { repositories, success } = await service.fetchRepositories();
      setIsLoading(false);
      setRepo(repositories);

      if (!success) {
        setError("Something went wron");
      }
    };

    fetchData();
  }, []);

  const handleRepoClick = (e, id, name) => {
    e.preventDefault();
    console.log(`The link was clicked... ${id}`);
    setSelectedRepo(name);
  };

  if (isLoading) {
    return <CircularProgress />
  }

  if (error) {
    return (
      <h3>Something went wrong when trying to get repositories from Github</h3>
    );
  }

  return (
    // <div className={classes.root}>
    <>
      <h1>Mina respositories på Github</h1>
      <div style={layoutStyle}>
        <div style={repoStyle}>
          <List>
            {repos.map((repo) => (
              <ListItem 
                key={repo.id}
                button
                dense={false}
                onClick={(e) => handleRepoClick(e, repo.id, repo.name)}
                selected={repo.name === selectedRepo}
                component="div"
              >
                <ListItemText primary={repo.name} />
              </ListItem>
            ))}
          </List>

          
        </div>
        <div>
          <Commits repo={selectedRepo} />
        </div>
      </div>
    </>
  );
}
