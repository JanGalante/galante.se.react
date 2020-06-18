import React, { useState, useEffect } from 'react'
import service from '../services/github'

// // TODO: Gör om till hooks och använd react-query för att hämta data och cache

const Repositories = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { repositories, success } = await service.fetchRepositories();
      setIsLoaded(true);
      setItems(repositories);

      if (!success) {
        setError('Something went wron');
      }
    };

    fetchData();
  }, [])

  if (!isLoaded) {
    return <h1>loading...</h1>
  }

  if (error) {
    return <h3>Something went wrong when trying to get repositories from Github</h3>
  }

  return (
    <div>
      <h1>Mina respositories på Github</h1>
      <p className="App-intro">Not so many topics as expected</p>
      <ul>
        {items.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  )
}

export default Repositories;