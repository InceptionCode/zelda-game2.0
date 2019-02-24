import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

const Credits = props => {
  useEffect(() => {
    const { playState, playerHealth, equipment } = props
    if (playState === 'playing' && playerHealth !== 0 && equipment.length > 0) {
      alert('You Won!!')
    }
  })

  return (
    <div data-testid="credits-page" className="credits">
      <h1> Producer </h1>
      <h2> Darrell Washington Jr </h2>
      <h1> Writer </h1>
      <h2> Darrell Washington Jr </h2>
      <h1> Developer </h1>
      <h2> Darrell Washington Jr </h2>
      <h1> Videos </h1>
      <h2>
        <a href="https://www.youtube.com/channel/UCnHYnCvCW_uwPJfVVYpt7QQ">
          ClickSelect
        </a>
      </h2>
      <h1> Contributors / Motivators </h1>
      <h2 className="contributors"> Jaqui Washington </h2>
      <p> Always giving huge encouragement. </p>
      <h2 className="contributors"> Darrell Washington Sr. </h2>
      <p>
        Making sure the game was done as best as I possibly could have done it.
      </p>
      <h2 className="contributors"> Family </h2>
      <p> By either checking in or not bothering me.</p>
      <h2 className="contributors"> Friends </h2>
      <p> Very motivating and understanding. </p>
      <h2 className="contributors"> Richard Harris </h2>
      <p> By having me remember that good things come to those who wait. </p>
    </div>
  )
}

Credits.propTypes = {
  playState: PropTypes.string.isRequired,
  equipment: PropTypes.array.isRequired,
  playerHealth: PropTypes.number.isRequired
}

export default Credits
