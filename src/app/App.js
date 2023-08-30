import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
// components
import Main from './layouts/main'
import Login from './layouts/login'
import Nav from '../app/components/ui/nav'
import Users from './layouts/users'
import ProtectedRoute from './components/common/protectedRoute'
// utils
import AppLoader from './components/ui/hoc/appLoader'

function App() {
  return (
    <>
      <AppLoader>
          <Nav />
          <Switch>
            <ProtectedRoute
              path="/users/:userId?/:edit?"
              component={Users}
            />
            <Route path="/login/:type?" component={Login} />
            <Route path="/" exact component={Main} />
            <Redirect to='/'/>
          </Switch>
      </AppLoader>
      <ToastContainer />
    </>
  )
}

export default App
