import React from 'react'

export default function Scenario2(props) {
  return (
    <>
       <p>
        Link finds 5 huge guards in the next room.
        <br />
        What option will you choose { props.gameState.playerName }?
        <br />
        1. Use your "sword" to cut the guards down?
        <br />
        2. Use the "flashlight" in order to blind the guards?
        <br />
        3. Throw a "pen" for a distraction?
        <br />
        4. Use the "rope" to grab one guard at a time?
        <br />
        5. Throw "hook" at guards?
        <br />
        6. Just "run" away?
      </p>
    </>
  )
}