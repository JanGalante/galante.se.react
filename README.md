* [React training - React router](https://reacttraining.com/react-router/web/example/basic)
* [React loadable - For easy bundlesplitting on component level... and preloading](https://github.com/jamiebuilds/react-loadable)


[![Netlify Status](https://api.netlify.com/api/v1/badges/9db31b59-e0a5-4d68-acf0-1560ae0f0a48/deploy-status)](https://app.netlify.com/sites/galante/deploys)




FaunaDB
https://www.netlify.com/blog/2018/07/09/building-serverless-crud-apps-with-netlify-functions--faunadb/#background

fnADSKeMtJACARQctR3YlEbKWvUQ8Fwl4BE6IHwU

netlify-lambda
Netlify lambda is a tool for locally emulating the serverless function for development and for bundling our serverless function with third party npm modules (if we are using those

npm-run-all
We are going to be using the npm-run-all npm module to run our frontend and backend in parallel in the same terminal window

netlify.toml
This is needed to configure the function settings. For more info: https://github.com/netlify/netlify-lambda#installation

create-react-app-lambda
https://github.com/netlify/create-react-app-lambda


# More on lambda functions
- https://www.npmjs.com/package/netlify-lambda
- https://kentcdodds.com/blog/super-simple-start-to-serverless
- https://www.netlify.com/blog/2018/07/09/building-serverless-crud-apps-with-netlify-functions-faunadb/
- https://functions-playground.netlify.app/
- https://functions.netlify.com/examples/
- https://docs.netlify.com/functions/build-with-javascript/#format


# Problemshoting
## Site is not updating after deploy
The site uses service workers so remember to clear application data i devtools

## TODO:
- [x] Migrate to React hooks
- [x] Use CSS modules
- [ ] Use Facebook/Instagram loader
- [x] Use serverless functions via lambda functions in Netlify
- [ ] Migrate from Bootstra to Material UI
- [ ] Use nice ticker for numbers
- [x] Use React query
- [ ] Use React error boundery, [react doc](https://reactjs.org/docs/error-boundaries.html) and [github doc](https://github.com/bvaughn/react-error-boundary)
- [ ] Use React Suspense and Concurrent mode for data fetching, [video](https://www.youtube.com/watch?v=xk_EWd11T94&feature=youtu.be&app=desktop), [https://github.com/kentcdodds/react-suspense],[epicreact.dev](https://epicreact.dev/)
- [x] Fetch data with REST
- [ ] Fetch data with GrapQL
- [x] Place secrets in server variables
- [ ] Store data in Fauna DB
- [ ] Fetch data from Fauna DB with GraphQL
- [ ] Use modern javascript
  - [ ] Use Async, await
  - [ ] Catching errors from an [await handler](https://www.npmjs.com/package/await-handler) without the need to wrap everything in try/catch blocks.
  - [ ] Use [Nullish coalescing operator (??)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing_operator)
  - [ ] Use optional chaining (?.)
  - [ ] Implement a [logging service](https://www.slant.co/topics/2615/~best-javascript-client-side-error-logging-services#1)
  

API:s to use as data sources
- Github
- Pokemon [api](https://graphql-pokemon.now.sh)
- Starwars
