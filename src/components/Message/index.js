import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

import { SET_DISPLAY_MESSAGE } from '../../stores/gameStore'

const Message = props => {

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'visible'
    }
  })

  const closeMessage = e => {
    if (e.key === 'Enter') {
      props.dispatch({ type: SET_DISPLAY_MESSAGE, payload: { displayMessage: false  } })
    }
  }

  return (
    <div
      data-testid="message-component"
      className="message-overlay"
      tabIndex="1"
    >
      <div className="alert-message">
        <h1> Game Alert </h1>
        <p>{props.gameState.message}</p>
        <input
          placeholder="Press Enter to Close Message"
          value=''
          readOnly
          autoFocus
          onKeyDown={closeMessage}
        />
      </div>
    </div>
  )
}

Message.prototypes = {
  message: PropTypes.string,
  displayMessage: PropTypes.func.isRequired
}

export default Message
