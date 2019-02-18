import React, { Fragment, useState, useContext } from 'react'
import { StoreContext } from './index'

import Start from '../components/Start'
import Intro from '../components/Intro'
import Credits from '../components/Credits'
import Scenario1 from '../components/Scenario1'
import Scenario2 from '../components/Scenario2'
import Scenario3 from '../components/Scenario3'
import Scenario4 from '../components/Scenario4'
import Message from '../components/Message'

import GameStrategy from '../services/gameStrategy'

// Originally was a class that imported and used the container.jsx file.
export default function Game(props) {
  const [page, setPage] = useState('start')
  const [messageOpen, shouldDisplayMessage] = useState(false)
  const gameStrategy = new GameStrategy()
  const storeContext = useContext(StoreContext)

  const changePage = page => {
    setPage(page)
  }

  const displayMessage = shouldDisplay => {
    shouldDisplayMessage(shouldDisplay)
  }

  gameStrategy.AddStrategy('start', Start, false)
  gameStrategy.AddStrategy('intro', Intro)
  gameStrategy.AddStrategy('credits', Credits)
  gameStrategy.AddStrategy('scenario1', Scenario1)
  gameStrategy.AddStrategy('scenario2', Scenario2)
  gameStrategy.AddStrategy('scenario3', Scenario3)
  gameStrategy.AddStrategy('scenario4', Scenario4)

  const renderPage = storeContext => {
    const Component = gameStrategy.returnPage(page)
    return Component ? (
      returnComponent(Component, storeContext)
    ) : (
      <div id="not-supported"> Page Not Supported </div>
    )
  }

  const returnComponent = (Component, storeContext) => {
    return Component.needsContext ? (
      <Component.component
        changePage={changePage}
        displayMessage={displayMessage}
        {...storeContext}
      />
    ) : (
      <Component.component
        changePage={changePage}
        displayMessage={displayMessage}
      />
    )
  }

  return (
    <Fragment>
      {messageOpen && (
        <Message displayMessage={displayMessage} {...storeContext} />
      )}
      {renderPage(storeContext)}
    </Fragment>
  )
}
