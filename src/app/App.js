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
import { QualitiesProvider } from './hooks/useQualities'
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min'
import AuthProvider from './hooks/useAuth'
import ProtectedRoute from './components/common/protectedRoute'

function App() {
  return (
    <>
      <AuthProvider>
        <Nav />
        <ProfessionProvider>
          <QualitiesProvider>
            <Switch>
              <Route path="/" exact component={Main} />
              <Route path="/login/:type?" component={Login} />
              <ProtectedRoute path="/users/:userId?/:edit?" component={Users} />
              <Redirect to='/'/>
            </Switch>
          </QualitiesProvider>
        </ProfessionProvider>
      </AuthProvider>
      <ToastContainer />
    </>
  )
}

export default App
