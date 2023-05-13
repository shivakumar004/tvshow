import React from 'react'
import Home from './Home'
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom'
import Summary from './summary'

const App = () => {
  return (
      <Router>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/summary' element={<Summary/>} />
        </Routes>
      </Router>
  )
}

export default App
