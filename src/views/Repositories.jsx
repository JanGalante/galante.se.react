import React, { useState, useEffect } from 'react'
import { List, ListItem, ListItemText } from '@material-ui/core';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

// import service from '../services/github'
import Commits from '../components/git-info/commits';


// // TODO: Gör om till hooks och använd react-query för att hämta data och cache
export default function Repositories() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [repos, setRepo] = useState([]);
  const [selectedRepo, setSelectedRepo] = useState(undefined);


  const repoStyle = { 
    width: '30%',
    // display: 'flex',
  };

  const layoutStyle = { 
    display: 'flex',
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      // TODO: Eventuellt lägga allt in en tjänst som anropas med ett rad och får korrekt format tillbaka
      // const { repositories, success } = await service.fetchRepositories();
      const response = await fetch('./.netlify/functions/github-repos');
      const { repositories, success } = await response.json();
      console.log({ repositories, success })

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
    return (
      <SkeletonTheme color="#202020" highlightColor="#444">
        <div style={layoutStyle}>
          <div style={repoStyle}>
            <h3>Github respositories</h3>
            <div>
              <List>
                {Array(3).fill().map((item, index) => (
                    <ListItem button dense={false} key={index} component="div">
                      <ListItemText primary={<Skeleton width={270} />} />
                    </ListItem>
                  ))}
              </List>
            </div>
          </div>
        </div>
      </SkeletonTheme>
    );
  }

  if (error) {
    return (
      <h3>Something went wrong when trying to get repositories from Github</h3>
    );
  }

  return (
    <>
      <div style={layoutStyle}>
        <div style={repoStyle}>
          <h3>Github respositories</h3>
          <div>
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
        </div>
        <div>
          <Commits repo={selectedRepo} />
        </div>
      </div>
    </>
  );
}
