import React, { Component } from 'react'
import md5 from 'md5'

export default class Gravatar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }

 

  render() {
    return (
      <>
        <h1>Gravatars</h1>
        <p>
        <img src={ `https://www.gravatar.com/avatar/${md5('ave_caesar@hotmail.com')}?s=50` } alt="avatar" /> ave_caesar@hotmail.com
        </p>
      </>
    )
  }
}
