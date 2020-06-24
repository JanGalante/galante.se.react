import React, { useState, useEffect } from 'react'

import { useTheme } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
// import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';

import service from '../services/github'
import Commits from '../components/git-info/commits';

// const useStyles = makeStyles((theme) => ({
//   root: {
//     display: 'flex',
//     // flexWrap: 'wrap',
//     flexFlow: 'column wrap',
//     '& > *': {
//       margin: theme.spacing(1),
//       width: theme.spacing(16),
//       height: theme.spacing(16),
//     },
//   },
// }));


function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}


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
    return <h1>loading...</h1>;
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
                // disablePadding={true}
                onClick={(e) => handleRepoClick(e, repo.id, repo.name)}
                selected={repo.name === selectedRepo}
                component="div"
              >
                {/* <ListItemLink href={'#' + repo.name} divider > */}
                  <ListItemText primary={repo.name} />
                {/* </ListItemLink> */}
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
