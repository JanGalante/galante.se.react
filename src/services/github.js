const fetchRepositories = async () => {
  const response = await fetch('https://api.github.com/users/jangalante/repos',
  {
    headers: {
      // TODO:place token in environment variable, not in code
      authorization: 'token e923a79b9ed23f1ddfc68281bc52d9e086f3c11c'
    },
  });
  const json = await response.json();
  
  return {
    success: response.ok, // true or false
    status: response.status, // 200 when OK
    repositories: json
  };
}

export default {
  fetchRepositories
}