import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

const Message = props => {
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'visible'
    }
  })

  const closeMessage = e => {
    if ((e.key = 'Enter')) {
      props.displayMessage(false)
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
        <p>{props.message}</p>
        <input
          placeholder="Press Enter to Close Message"
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
