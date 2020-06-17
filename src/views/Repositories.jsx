import React, { Component } from 'react'
import service from '../services/github'

// TODO: Gör om till hooks och använd react-query för att hämta data och cacha

export default class Repositories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }

  async componentDidMount(){
    const { repositories, success } = await service.fetchRepositories();
    this.setState({
      isLoaded: success,
      items: repositories,
    })

    // Note: it's important to handle errors here
    // instead of a catch() block so that we don't swallow
    // exceptions from actual bugs in components.
    // (error) => {
    //   this.setState({
    //     isLoaded: true,
    //     error
    //   });
    // }
  }

  render() {
    const isLoaded = this.state.isLoaded
    const list = isLoaded ? (
      <ul>
        {this.state.items.map(item => (
          <li key={item.id}>
            {item.name}
          </li>
        ))}
      </ul>
    ) : (
        <p>Something went wrong when trying to get repositories from Github</p>
    );

    return (
      <div>
        <h1>Mina respositories på Github</h1>
        <p className="App-intro">Not so many topics as expected</p>
        <h2>Status</h2>
        <p>
          --- {this.state.isLoaded ? 'true': 'false'} ---
        </p>
        {list}
      </div>
    )
  }
}
