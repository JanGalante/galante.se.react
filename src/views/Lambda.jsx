import React, { useState, useEffect } from 'react';
import { stringify } from 'querystring';

const Lambda = () => {
  // const [result, setResult] = useState(async() => {
  //   const response = await fetch('https://api.github.com/users/jangalante/repos')
  //   const json = await response.json();

  //   return 'hard coded result';
  // });

  // const [result, setResult] = useEffect(() => {
  //   // async function

  //   const response = await fetch('https://api.github.com/users/jangalante/repos')
  //   const json = await response.json();

  //   return 'hard coded result';
  // });


const [result, setResult] = useState();
useEffect(() => {
  // Effect callbacks are synchronous to prevent race conditions. Put the async function inside:
  async function fetchData() {
    // // You can await here
    // const response = await fetch('https://api.github.com/users/jangalante/repos')
    // const json = await response.json();

    // const response = await fetch('https://galante.se/.netlify/functions/sanity');
    const response = await fetch('./.netlify/functions/sanity');
    const text = await response.text(); 
    console.log('text', text);
    setResult(text);
    // ...
  }
  fetchData();
}, []);  //[someId]); // Or [] if effect doesn't need props or state

// Learn more about data fetching with Hooks: https://fb.me/react-hooks-data-fetchingeslint(react-hooks/exhaustive-deps)


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