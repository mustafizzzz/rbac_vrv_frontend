import { Route, Routes } from 'react-router-dom'
import './App.css'
import LoginPage from './pages/LoginPage/AuthPage'
import DashboardLayout from './myComponent/LayoutWrapper/DasboardLayout'
import HomePage from './pages/LoginPage/HomePage/HomePage'
import UserPage from './pages/LoginPage/UserPage/UserPage'
import Permission from './pages/PermissionPage/Permission'
import Roles from './pages/RolesPage/Roles'
import OtpPage from './pages/OtpPage/OtpPage'
import TableModel from './pages/TestPages/TableModel'

function App() {

  return (
    <div className="App">

      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='/otp-verify' element={<OtpPage />} />
        <Route path='/demo' element={<TableModel />} />


        <Route path='/dashboard' element={<DashboardLayout />}>
          <Route path='users' element={<UserPage />} />
          <Route path='permissions' element={<Permission />} />
          <Route path='roles' element={<Roles />} />
        </Route>
      </Routes>

    </div>
  )
}

export default App
