import React, { useState } from 'react';

const Lambda = () => {
  const [result, setResult] = useState(async() => {
    const response = await fetch('https://api.github.com/users/jangalante/repos')
    const json = await response.json();

    return 'hard coded result';
  });

  return (
    <div>
      <h1>Using lambda serverless function</h1>
      <p>
        ...here goes the result from a lambda function.
      </p>
      <p>
        result: {result}
      </p>
    </div>
  )
}

export default Lambda;