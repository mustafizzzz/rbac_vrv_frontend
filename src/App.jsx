import { Route, Routes } from 'react-router-dom'
import './App.css'
import LoginPage from './pages/LoginPage/LoginPage'
import DashboardLayout from './myComponent/LayoutWrapper/DasboardLayout'
import HomePage from './pages/LoginPage/HomePage/HomePage'
import UserPage from './pages/LoginPage/UserPage/UserPage'

function App() {

  return (
    <div className="App">

      <Routes>
        <Route path='/' element={<LoginPage />} />


        <Route path='/dashboard' element={<DashboardLayout />}>
          <Route path='home' element={<HomePage />} />
          <Route path='users' element={<UserPage />} />
        </Route>
      </Routes>

    </div>
  )
}

export default App
