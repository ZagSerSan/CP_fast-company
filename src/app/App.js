import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
// components
import Main from './layouts/main'
import Login from './layouts/login'
import Nav from '../app/components/ui/nav'
import Users from './layouts/users'
import { ProfessionProvider } from './hooks/useProfession'

function App() {
  return (
    <>
      <Nav />
      <Switch>
        <Route path="/" exact component={Main} />
        <ProfessionProvider>
          <Route path="/login/:type?" component={Login} />
          <Route path="/users/:userId?/:edit?" component={Users} />
        </ProfessionProvider>
      </Switch>
      <ToastContainer />
    </>
  )
}

export default App
