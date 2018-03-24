const fetchRepositories = async () => {
  const response = await fetch('https://api.github.com/users/jangalante/repos')
  console.log(response);
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