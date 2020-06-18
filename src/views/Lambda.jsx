import React, { useState, useEffect } from 'react';

const Lambda = () => {
// Handle sanity result
const [result, setResult] = useState();
useEffect(() => {
  // Effect callbacks are synchronous to prevent race conditions. Put the async function inside:
  async function fetchData() {
    // // You can await here
    const response = await fetch('./.netlify/functions/sanity');
    const text = await response.text(); 
    
    setResult(text);
  }
  fetchData();
}, []);  //[someId]); // Or [] if effect doesn't need props or state

// Learn more about data fetching with Hooks: https://fb.me/react-hooks-data-fetchingeslint(react-hooks/exhaustive-deps)


  return (
    <>
      <h1>Using lambda serverless function</h1>
      <p>
        ...here goes the result from a lambda function.
      </p>
      <p>
        result: {result}
      </p>
    </>
  )
}

export default Lambda;