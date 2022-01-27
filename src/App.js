import React from 'react'
import Home from './components/Home'
import ArtistInfo from './components/ArtistInfo';

import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes >
          <Route path="/" element={<Home />} />
          <Route path="artistInfo" element={<ArtistInfo />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
