import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import zeldaImage from '../../images/zelda-image.png'
import { SET_CURRENT_PAGE } from '../../stores/gameStore'

const Start = props => {
  const [introVidTime, setIntroVidTime] = useState(0)

  const increaseIntroVidTime = () => {
    setIntroVidTime(introVidTime + 1)
  }

  useEffect(() => {
    const timer = window.setTimeout(increaseIntroVidTime, 1000)
    return () => clearTimeout(timer)
  }, [introVidTime])

  // Do not like this need a better way to test instead of using a prop.
  const displayOptionsMenu =
    introVidTime >= 10 || props.test ? (
      <div className="start-menu">
        <button
          className="start-button"
          onClick={() => props.dispatch({ type: SET_CURRENT_PAGE, payload: 'intro' })}
        >
          Start
        </button>
        <button
          className="credits-button"
          onClick={() => props.dispatch({ type: SET_CURRENT_PAGE, payload: 'credits' })}
        >
          Roll Credits
        </button>
      </div>
    ) : (
      <h2>History of Zelda</h2>
    )

  return (
    <div id="start-menu" data-testid="start-page">
      <h1 className="title">
        Zelda: The <strong>HERO</strong>
        <i className="fa fa-shield" aria-hidden="true" />
      </h1>
      <img className="zelda-image" src={zeldaImage} alt="" />
      {displayOptionsMenu}
      <iframe
        className="zelda-history"
        title="zelda-history-video"
        src="https://www.youtube.com/embed/9C064fZFKrQ?&autoplay=1&mute=1&"
        frameBorder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  )
}

Start.propTypes = {
  dispatch: PropTypes.func.isRequired,
  test: PropTypes.bool
}

Start.defaultProps = {
  test: false
}

export default Start
