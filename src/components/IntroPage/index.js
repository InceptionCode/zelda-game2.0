import zeldaIcon from '../../images/zelda-icon.jpg'

import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import { SET_PLAY_STATE, SET_PLAYER_NAME, SET_DISPLAY_MESSAGE } from '../../stores/gameStore'

const Intro = props => {
  const [playerName, setPlayerNameInput] = useState('')

  useEffect(() => {
    if (props.gameState.playState !== 'playing') {
      props.dispatch({ type: SET_PLAY_STATE, payload: 'playing' })
    }
  }, [props.gameState.playState])

  const blinker = props.gameState.playerName !== '' ? { animation: 'none' } : {},
    enterOption =
      props.gameState.playerName !== ''
        ? {
            display: 'initial',
            animation: 'blinker ease-in-out 1s infinite'
          }
        : { display: 'none' }

  const _enterGame = e => {
    if (e.key === 'Enter') {
      if (!playerName) {
        props.dispatch({ 
          type: SET_DISPLAY_MESSAGE, 
          payload: { displayMessage: true, message: 'Please add username.' }
        })
      }

      props.dispatch({ type: SET_PLAYER_NAME, payload: { playerName, currentPage: 'scenario1' } })
    }
  }

  const _handlePlayerNameInput = e => {
    setPlayerNameInput(e.target.value)
  }

  return (
    <>
      <div className="intro-section">
        <img src={zeldaIcon} className="intro-icon" alt="" />
        <h2> The lost story of the great Hero....</h2>
        <br />
        <h1 className="hero-name"> Link </h1>
        <br />
        <h1>Background</h1>
        <p>
          Here at the edge of the Earth, rests a Hero. The time now is 10:30 AM,
          as Link wakes up slowly from a long awaited sleep.
          <br />
          "I finally get the chance to relax". He thinks all is peaceful and
          well until...
          <br />
          *CRASH*
          <br />
          A shatter of glass nearby alarms him and his mind quickly shifts.
          "There is no rest for the Heros I see."
          <br />
          Indeed it does seem that way... Link slowly moves out of bed when.
          <br />
          *BANG*
          <br />
          A huge figure slams through the door. Luckily Link is no stranger to
          danger.
          <br />
          He rolls out of bed, snatches his sword up off the wall with one hand.
          Then points his sword inches away from the figure's nose.
          <br />
          Frustrated now Link asks, "Why are you here!?" With a twisted smile,
          the figure answers, "I am here to deliver a message."
          <br />
          "The message is... this is a game you can not win. Zelda has been
          locked away. And only you can determine her fate. And this time there
          will be no escape."
          <br />
          Link angrily cuts the man down. He knows exactly where to go. However,
          what happens now who knows.
          <br />
          The choice is yours and only yours to hold.
        </p>
        <br />
        <h1> Rules of the Game </h1>
        <ul className="rules">
          <li>
            You must make the right decisions in order to reach the Princess
            unharmed.
            <br />
            You will be given a number of options to choose from for each
            scenario. You luckily have two options to go with, so choose wisely.
            <br />
            This game utilizes the equipment you have in order to make your
            decision. Example: "Link has a choice, go take a knife or his sword.
            What will he do."
            <br />
            1. Take Knife.
            <br />
            2. Take Sword.
            <br />
            Here you would enter "Knife" or "Sword".
          </li>
          <li>
            You are given 5 items to start off with as your equipment.
            <br />
            1. A sword
            <br />
            2. A rope
            <br />
            3. A flashlight
            <br />
            4. A pen
            <br />
            5. A "hook" with a wire attached to it.
            <br />
            Yes, a pen it may come in handy, who knows. Keep in mind that once
            you use an item you LOSE it. That means it will NOT be available to
            use in the next scenario.
          </li>
          <li>
            If you fail to make the right move you will lose 25% health. Of
            course, if you are out of health... or out of equipment... well you
            know "Game Over"
          </li>
        </ul>
        <input
          type="text"
          placeholder="Enter your name"
          value={playerName}
          style={blinker}
          onChange={_handlePlayerNameInput}
          onKeyDown={_enterGame}
        />
        <h2 className="enter-game" style={enterOption}>
          Press Enter to Begin...
        </h2>
      </div>
    </>
  )
}

Intro.propTypes = {
  gameState: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
}

export default Intro
