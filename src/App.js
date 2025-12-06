import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './page/Home'
import Catalogue from './page/Catalogue'
// import About from './page/About'
// import Services from './page/Services'
// import Login from './page/Login'
import Header from './components/Header'
import Footer from './components/Footer'
import ScrollToTopButton from './components/ScrollToTopButton'


export default function App() {
  return (
    <div>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalogue" element={<Catalogue />} />
          {/* <Route path="/about" element={<About/>} /> */}
          {/* <Route path="/services" element={<Services />} /> */}
          {/* <Route path="/login" element={<Login/>} /> */}
        </Routes>
      </main>
      <Footer />
      <ScrollToTopButton />
    </div>
  )
}