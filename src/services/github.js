import fetch from 'node-fetch';
import dotenv from 'dotenv'

// set values from .env file as defaults for environment variabled in process.env
// dotenv.config('') // Should be done only once at startup, but has to be solved with lambda functions


const { GITHUB_SECRET } = process.env;
console.log({ token: GITHUB_SECRET })

const fetchRepositories = async () => {
  //TODO: Fetch github repos graphQL... https://github.com/kiranbhalerao123/itsmine.ml/blob/3b02341a6ad7d68e040c794a4d8284b344c01c33/src/netlify_lambda/getrepos.js
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

const fetchCommits = async (repo) => {
  const response = await fetch(`https://api.github.com/repos/jangalante/${repo}/commits`,
  {
    headers: {
      // TODO:place token in environment variable, not in code
      authorization: `token ${GITHUB_SECRET}`,
    },
  });
  const json = await response.json();
  
  // return {
  //   success: response.ok, // true or false
  //   status: response.status, // 200 when OK
  //   repositories: json // TODO: mappa data så vi inte av misstad exponerar allt som finns
  // };
  
  // map data
  const commits = json.map((item) => {
    return { 
      sha: item.sha,
      message: item.commit?.message,
      date: Date.parse(item.commit?.committer?.date),
    }
  });
  return commits;
}

export default {
  fetchRepositories,
  fetchCommits,
}