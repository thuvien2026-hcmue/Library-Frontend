import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './page/Home'
// import About from './page/About'
// import Services from './page/Services'
// import Login from './page/Login'
import Header from './components/Header'
import Footer from './components/Footer'
import ScrollToTopButton from './components/ScrollToTopButton'
import Gioithieuchung from './page/Gioithieu/Gioithieuchung'
import ScrollToTop from './components/ScrollToTop'


export default function App() {
  return (
    <div>
      <ScrollToTop />
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gioi-thieu/gioi-thieu" element={<Gioithieuchung />} />
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