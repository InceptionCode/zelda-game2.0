import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import zeldaImage from '../../images/zelda-image.png'

const Start = props => {
  const [introVidTime, setIntroVidTime] = useState(0)

  const increaseIntroVidTime = () => {
    setIntroVidTime(introVidTime + 1)
  }

  useEffect(() => {
    if (introVidTime === 10) return
    const timer = window.setTimeout(increaseIntroVidTime, 1000)
    return () => clearTimeout(timer)
  }, [introVidTime])

  const displayOptionsMenu =
    introVidTime === 10 ? (
      <div className="start-menu">
        <button
          className="start-button"
          onClick={() => props.changePage('intro')}
        >
          Start
        </button>
        <button
          className="credits-button"
          onClick={() => props.changePage('credits')}
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
        allowFullScreen
      />
    </div>
  )
}

Start.propTypes = {
  changePage: PropTypes.func.isRequired
}

export default Start
