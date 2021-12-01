import React from 'react'

export default function Scenario1(props) {
  return (
    <>
      <h1> Hello { props.gameState.playerName } </h1>
      <p>
        Link has made it inside the castle that rests barely above a huge body
        of water.
        <br />
        It seems that the first room is flooded and water is rising quickly.
        <br />
        What option will you choose { props.gameState.playerName }?
        <br />
        1. Tie a knot on your "rope" and use it to swing from the ceiling to the
        other room?
        <br />
        2. Use the "flashlight" in order to search for an extra object or path
        you can exploit?
        <br />
        3. Throw a "pen" at the ceiling?
        <br />
        4. Use the "sword" to find another weak spot in the wall that you can
        break?
        <br />
        5. Throw your "hook" at the ceiling and use it swing to the other room?
        <br />
        6. Just "run" away?
      </p>
    </>
  )
}