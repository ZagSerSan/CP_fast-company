import React from "react"
import '../css/index.css'
import { Switch, Route } from 'react-router-dom'
import Nav from "./components/nav"
import Main from "./layouts/main"
import Login from "./layouts/login"
import Users from "./components/users"

function App() {
  return <>
    <Nav />
    <Switch>
      <Route path='/' exact component={Main}/>
      <Route path='/Login' component={Login}/>
      <Route path='/Users/:userId?' component={Users}/>
    </Switch>
  </>
}

export default App
