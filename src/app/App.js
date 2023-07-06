import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
// components
import Main from './layouts/main'
import Login from './layouts/login'
import Nav from '../app/components/ui/nav'
import Users from './layouts/users'

function App() {
  return (
    <>
      <Nav />
      <Switch>
        <Route path="/" exact component={Main} />
        <Route path="/Login/:type?" component={Login} />
        <Route path="/Users/:userId?/:edit?" component={Users} />
      </Switch>
      <ToastContainer />
    </>
  )
}

export default App
