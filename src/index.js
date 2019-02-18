import React from 'react'
import ReactDOM from 'react-dom'
import { StoreContextProvider } from './root'

import './sass/zelda-game.sass'

ReactDOM.render(<StoreContextProvider />, document.getElementById('root'))
