import fetch from 'node-fetch';
import dotenv from 'dotenv'

// set values from .env file as defaults for environment variabled in process.env
dotenv.config('')


const { GITHUB_SECRET } = process.env;
console.log({ token: GITHUB_SECRET })

const fetchRepositories = async () => {
  const response = await fetch('https://api.github.com/users/jangalante/repos',
  {
    headers: {
      // TODO:place token in environment variable, not in code
      authorization: `token ${GITHUB_SECRET}`,
    },
  });
  const json = await response.json();
  
  return {
    success: response.ok, // true or false
    status: response.status, // 200 when OK
    repositories: json // TODO: mappa data så vi inte av misstad exponerar allt som finns
  };
}

export default {
  fetchRepositories
}