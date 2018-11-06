import React from 'react'

import {AccessBar, BootNav, Footer} from './components'
import Routes from './routes'
// import StripeForm from './components/StripeForm'

const App = () => {
  return (
    <div>
      {/* <StripeForm /> */}
      <BootNav />
      {/* <AccessBar /> */}
      <Routes />
      {/* <Footer /> */}
    </div>
  )
}

export default App
