import React from 'react'

import {AccessBar, BootNav} from './components'
import Routes from './routes'

const App = () => {
  return (
    <div>
      <BootNav />
      <AccessBar />
      <Routes />
    </div>
  )
}

export default App
