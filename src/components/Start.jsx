import React, { Component } from 'react'

export default class Start extends Component {
  componentWillMount() {
    window.setTimeout(this.props.displayStartMenu, 25000)
  }
  render() {
    const displayOptionsMenu =
      this.props.introVid === 10 ? (
        <div className="start-menu">
          <button className="start-button" onClick={this.props.startGame}>
            {' '}
            Start
          </button>
          <button className="credits-button" onClick={this.props.startGame}>
            {' '}
            Roll Credits
          </button>
        </div>
      ) : (
        <h2> History of Zelda </h2>
      )

    return (
      <div id="start-menu">
        <h1 className="title">
          {' '}
          Zelda: The <strong>HERO</strong>
          <i className="fa fa-shield" aria-hidden="true" />
        </h1>
        <img className="zelda-image" src="../images/zelda-image.png" />
        {displayOptionsMenu}
        <iframe
          className="zelda-history"
          src="https://www.youtube.com/embed/9C064fZFKrQ?&autoplay=1"
          frameBorder="0"
          allowFullScreen
        />
      </div>
    )
  }
}
