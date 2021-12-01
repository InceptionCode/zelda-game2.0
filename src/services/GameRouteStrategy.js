import React from "react"

import Start from '../components/StartPage'
import Intro from '../components/IntroPage'
import Credits from '../components/CreditsPage'
import ScenarioPage from "../components/ScenarioPage"
import Scenario1 from "../components/ScenarioPage/scenarioContent/Scenario1"
import Scenario2 from "../components/ScenarioPage/scenarioContent/Scenario2"
import Scenario3 from "../components/ScenarioPage/scenarioContent/Scenario3"
import Scenario4 from "../components/ScenarioPage/scenarioContent/Scenario4"

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