import React from 'react'

export default function Scenario3(props) {
  return (
    <>
      <p>
        Link knows there is a trained assassin up ahead in a dark room.
        <br />
        What option will you choose {props.gameState.playerName}?
        <br />
        1. Run forward with your "sword" up and ready?
        <br />
        2. Use your "hook" in order to break a window?
        <br />
        3. Throw your "pen" and hope for the best?
        <br />
        4. Scan the room with the "flashlight"?
        <br />
        5. Bait assassin with your "rope"?
        <br />
        6. Just "run" away?
      </p>
    </>
  )
}