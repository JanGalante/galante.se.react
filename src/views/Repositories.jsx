import React, { useState, useEffect } from 'react'
import service from '../services/github'
import Commits from '../components/git-info/commits';

// // TODO: Gör om till hooks och använd react-query för att hämta data och cache

const Repositories = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [repos, setRepo] = useState([]);
  const [selectedRepo, setSelectedRepo] = useState(undefined);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      const { repositories, success } = await service.fetchRepositories();
      setIsLoading(false);
      setRepo(repositories);

      if (!success) {
        setError('Something went wron');
      }
    };

    fetchData();
  }, [])

  const handleRepoClick = (e, id, name) => {
    e.preventDefault();
    console.log(`The link was clicked... ${id}`);
    setSelectedRepo(name);
  }

  if (isLoading) {
    return <h1>loading...</h1>
  }

  if (error) {
    return <h3>Something went wrong when trying to get repositories from Github</h3>
  }

  return (
    <>
      <h1>Mina respositories på Github</h1>
      <div>Active repository: </div>
      <ul>
        {repos.map(repo => (
          <li key={repo.id} onClick={(e) => handleRepoClick(e, repo.id, repo.name)}>{repo.name}</li>
        ))}
      </ul>
      <Commits repo={selectedRepo} />
    </>
  )
}

export default Repositories;