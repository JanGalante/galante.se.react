import React, { useState, useEffect } from 'react'
// import { List, ListItem, ListItemText } from '@material-ui/core';
// import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

// import service from '../services/github'
import Commits from './commits';
import Repositories, { RepositoryLoader } from './repositories';



// // TODO: Gör om till hooks och använd react-query för att hämta data och cache
export default function GitHub() {
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
    setSelectedRepo(name);
  };

  if (isLoading) {
    return <RepositoryLoader />
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
            <Repositories repos={repos} selected={selectedRepo} handleClick={handleRepoClick} />
          </div>
        </div>
        <div>
          <Commits repo={selectedRepo} />
        </div>
      </div>
    </>
  );
}
