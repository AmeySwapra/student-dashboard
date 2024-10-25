import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import DashboardPage from './pages/DashboardPage'

function App() {
  return (
    <>
      <BrowserRouter>
       <Routes>
        <Route path='/' element={<HomePage/>} />
        <Route path='/dashboard' element={<DashboardPage/>} />
       </Routes>
      </BrowserRouter>
    </>
  )
}

export default App