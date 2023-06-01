import React from 'react'
import '../css/index.css'
import { Switch, Route } from 'react-router-dom'
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
        <Route path="/Login" component={Login} />
        <Route path="/Users/:userId?" component={Users} />
      </Switch>
    </>
  )
}

export default App
