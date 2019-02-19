import React, { Component } from 'react'

export default class Credits extends Component {
  componentWillMount() {
    if (this.props.health === 0) {
      alert('Game Over')
    } else if (this.props.playState === 'playing') {
      alert('You Won!!')
    } else {
      return
    }
  }
  render() {
    return (
      <div className="credits">
        <h1> Producer </h1>
        <h2> Darrell Washington </h2>
        <h1> Writter </h1>
        <h2> Darrell Washington </h2>
        <h1> Developer </h1>
        <h2> Darrell Washington </h2>
        <h1> Videos </h1>
        <h2>
          <a href="https://www.youtube.com/channel/UCnHYnCvCW_uwPJfVVYpt7QQ">
            ClickSelect
          </a>
        </h2>
        <h1> Contributors / Motivators </h1>
        <h2 className="contributors"> Mom </h2>
        <p> Always giving huge encouragement. </p>
        <h2 className="contributors"> Dad </h2>
        <p>
          {' '}
          Making sure the game was done as best as I possibly could have done
          it.
        </p>
        <h2 className="contributors"> Family </h2>
        <p> By either checking in or not bothering me.</p>
        <h2 className="contributors"> Friends </h2>
        <p> Very motivating and understanding. </p>
        <h2 className="contributors"> Grandad </h2>
        <p> By having me remember that good things come to those who wait. </p>
      </div>
    )
  }
}
