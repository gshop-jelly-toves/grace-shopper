import React from 'react'

import {Navbar} from './components'
import Routes from './routes'

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes />
      <div className="alert alert-primary" role="alert">
        A simple primary alert—check it out!
      </div>
    </div>
  )
}

export default App
