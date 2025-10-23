import React from 'react'
import { Routes, Route, Link } from "react-router-dom";
import Home from './pages/Home';
import Chat from './pages/Chat';

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Chat />} />
        {/* <Route path="/chat" element={<Chat />} /> */}
        {/* <Route path="/contact" element={<Contact />} /> */}
      </Routes>
    </>

  )
}

export default App