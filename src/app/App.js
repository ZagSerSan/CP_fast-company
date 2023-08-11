import React, { useEffect } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
// components
import Main from './layouts/main'
import Login from './layouts/login'
import Nav from '../app/components/ui/nav'
import Users from './layouts/users'
import ProtectedRoute from './components/common/protectedRoute'
// utils
import AuthProvider from './hooks/useAuth'
import { loadQualitiesList } from './store/qualities'
import { loadProfessionsList } from './store/professions'
import { loadUsersList } from './store/users'

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(loadQualitiesList())
    dispatch(loadProfessionsList())
    dispatch(loadUsersList())
  }, [])

  return (
    <>
      <AuthProvider>
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
      </AuthProvider>
      <ToastContainer />
    </>
  )
}

export default App
