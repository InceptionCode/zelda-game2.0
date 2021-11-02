import React from "react"

import Start from '../components/StartPage'
import Intro from '../components/IntroPage'
import Credits from '../components/CreditsPage'
import ScenarioPage from "../components/ScenarioPage"

export default class GameRouteStrategy {
  // Internal Private field
  static #_strategy = [
    { page: 'start', component: Start },
    { page: 'intro', component: Intro },
    { page: 'credits', component: Credits },
    { page: 'scenario1', component: ScenarioPage, content: Scenario1 },
    { page: 'scenario2', component: ScenarioPage, content: Scenario2 },
    { page: 'scenario3', component: ScenarioPage, content: Scenario3 },
    { page: 'scenario4', component: ScenarioPage, content: Scenario4 }
  ]
  
  static AddRoute(page, component, content) {
    GameRouteStrategy.#_strategy.push({ page, component, content })
  }
  
  static returnPage(props) {
    const pageIndex = GameRouteStrategy.#_strategy.findIndex(entry => entry.page === props.gameState.currentPage)
    
    if (pageIndex === -1) {
      return <RenderNotSupported />
    }
    const Component = GameRouteStrategy.#_strategy[pageIndex].component
    const Content = GameRouteStrategy.#_strategy[pageIndex].content
    const nextPage = GameRouteStrategy.#_strategy[pageIndex + 1]?.page

    return ( 
      Content ? 
        <Component 
          nextPage={nextPage}
          content={props => <Content {...props} />} 
          { ...props } 
        />
        :
        <Component { ...props } />
      )
    }
  }
  
  function RenderNotSupported() {
    return <div id="not-supported"> Page Not Supported </div>
  }

  function Scenario1(props) {
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

  function Scenario2(props) {
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

  function Scenario3(props) {
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

  function Scenario4(props) {
    return (
      <>
        <p>
          Link finds Zelda and an army running his way.
          <br />
          What option will you choose {props.gameState.playerName}?
          <br />
          1. Kiss Zelda, throw her your "sword" and run away?
          <br />
          2. Throw "hook" into a window and jump out with Zelda?
          <br />
          3. Take your "pen" and write 'I give up', on Zelda?
          <br />
          4. Wave your "flashlight" and hope help comes?
          <br />
          5. Tie the "rope" onto Zelda and run away?
          <br />
          6. Just "run" away?
        </p>
      </>
    )
  }