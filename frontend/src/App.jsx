import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Home from './pages/Home'
import 'react-toastify/ReactToastify.css';
import { useState } from 'react'
import RefreshHandler from '../src/RefreshHandler';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const PrivateRouting = ({element}) => {
    return isAuthenticated ? element : <Navigate to="/login" />;
  }

  return (
    <div>
      <RefreshHandler setIsAuthenticated={setIsAuthenticated} />
      <Routes>
        <Route path='/' element={<Navigate to ='/login'/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/signup' element={<Signup/>} />
        <Route path='/home' element={ < PrivateRouting element={<Home />} />} />
      </Routes>
    </div>
  )
}

export default App