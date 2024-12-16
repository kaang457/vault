import react from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import NotFound from './pages/NotFound'
import Register from './pages/Register'
import Landing from './pages/Landing'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import ProtectedRoute from './components/ProtectedRoute'
import GlobalContainer from './components/GlobalContainer'
import Detail from './pages/Detail'
import Accounts from './pages/Accounts'
import CreateAccount from './pages/CreateAccount'
import Notifications from './components/NotificationsButton'

import TransfersPage from './pages/Transfers'
import Payments from './pages/Payments'
import Loans from './pages/Loans'
import Investments from './pages/Investments'

function Logout () {
  localStorage.clear()
  return <Navigate to='/landing' />
}

function RegisterAndLogout () {
  localStorage.clear()
  return <Register />
}
function App () {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/dashboard'
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path='/create-account'
          element={
            <ProtectedRoute>
              <CreateAccount />
            </ProtectedRoute>
          }
        />
        <Route
          path='/accounts'
          element={
            <ProtectedRoute>
              <Accounts />
            </ProtectedRoute>
          }
        />
        <Route
          path='/notifications'
          element={
            <ProtectedRoute>
              <Notifications />
            </ProtectedRoute>
          }
        />
        <Route
          path='/transfers'
          element={
            <ProtectedRoute>
              <TransfersPage />
            </ProtectedRoute>
          }
        />
        <Route
          path='/payments'
          element={
            <ProtectedRoute>
              <Payments />
            </ProtectedRoute>
          }
        />
        <Route
          path='/loans'
          element={
            <ProtectedRoute>
              <Loans />
            </ProtectedRoute>
          }
        />
        <Route
          path='/investments'
          element={
            <ProtectedRoute>
              <Investments />
            </ProtectedRoute>
          }
        />
        <Route
          path='/loans'
          element={
            <ProtectedRoute>
              <Loans />
            </ProtectedRoute>
          }
        />
        <Route path='/login' element={<Login />} />
        <Route path='/logout' element={<Logout />} />
        <Route path='/register' element={<RegisterAndLogout />} />
        <Route path='/' element={<Landing />} />
        <Route path='*' element={<NotFound />} />
        <Route path='/detail' element={<Detail />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
