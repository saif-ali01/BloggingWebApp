import React from 'react'
import Home from './pages/home/Home'
import Topbar from './components/topbar/Topbar'
import Single from './pages/single/Single'
import Write from './pages/write/Write'
import Setting from './pages/setting/Setting'
import Login from './pages/login/Login'
import Register from './pages/register/Register'

import {
  BrowserRouter,
  Route,
  Routes
} from "react-router-dom"

const App = () => {
  
    const user =localStorage.getItem("user");
  
  return (
    <div className="App">
      <BrowserRouter>
      <Topbar/>
        <Routes>
          <Route path='/' element ={<Home />}/>
          <Route path='/write' element ={user?<Write/>:<Register />}/>
          <Route path='/register' element ={user?<Home/>:<Register/>}/>
          <Route path='/login' element ={user?<Home/>:<Login/>}/>
          <Route path='/setting' element ={user?<Setting/>:<Register/>}/>
          <Route path='/post/:postid' element ={<Single/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App