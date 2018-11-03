import React from 'react'

import {BootNav} from './components'
import Routes from './routes'
import StripeForm from './components/StripeForm';

const App = () => {
  return (
    <div>
      <StripeForm />
      <BootNav />
      <Routes />
    </div>
  )
}

export default App
