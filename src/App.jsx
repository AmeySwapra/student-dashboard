import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import DashboardPage from './pages/DashboardPage'
import StudentPage from './pages/StudentPage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'

function App() {
  return (
    <>
      <BrowserRouter>
       <Routes>
        <Route path='/' element={<HomePage/>} />
        <Route path='/dashboard' element={<DashboardPage/>} />
        <Route path='/students/:id' element={<StudentPage/>} />
        <Route path='/about' element={<AboutPage/>} />
        <Route path='/contact' element={<ContactPage/>} />
       </Routes>
      </BrowserRouter>
    </>
  )
}

export default App