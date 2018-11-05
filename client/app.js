import React from 'react'

import {AccessBar, BootNav, Footer} from './components'
import Routes from './routes'

const App = () => {
  return (
    <div>
      <BootNav />
      <AccessBar />
      <Routes />
      <Footer />
    </div>
  )
}

export default App
