import React from 'react'
import { render, screen } from '@testing-library/react'
import GameStrategy from './GameRouteStrategy'

describe('GameStrategy', () => {
  let gameState
  beforeEach(() => {
    gameState = {
      currentPage: 'scenario1'
    }
  })

  describe.skip('when AddRoute is called', () => {
    it('should add the Route ({page, component, content})', () => {
      GameStrategy.AddRoute('page', 'component', 'content')
      expect(GameStrategy._strategy).toHaveLength(1)
      expect(GameStrategy._strategy[0].page).toEqual('page')
      expect(GameStrategy._strategy[0].component).toEqual('component')
      expect(GameStrategy._strategy[0].needsContext).toEqual(false)
    })
  })

  describe('when returnPage is called', () => {
    it('should return RenderNotSupported if strategy is not found', async () => {
      gameState = { ...gameState, currentPage: 'not-a-page' }
      const notSupportedPage = await render(GameStrategy.returnPage({ gameState })).findByText('Page Not Supported')
      expect(notSupportedPage).toBeInTheDocument()
    })

    it('should return component if strategy is found', async () => {
      GameStrategy.AddRoute('page', MockComponent)
      GameStrategy.AddRoute('page2', MockComponent, MockComponent)

      gameState = { ...gameState, currentPage: 'page' }

      const page = await render(GameStrategy.returnPage({ gameState })).findByText(/This is a mock component/i)
      expect(page).toBeInTheDocument()
               
      gameState = { ...gameState, currentPage: 'page2' }
      
      const page2 = await render(GameStrategy.returnPage({ gameState })).findByText(/extra content/i)
      expect(page2).toBeInTheDocument()
    })
  })
})

function MockComponent(props) {
    return (
      <>
        This is a mock component
        { props.content && 'extra content' }
      </>
    )
}
