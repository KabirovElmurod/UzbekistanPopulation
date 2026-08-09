import React, { useRef } from 'react'
import Theme from './components/ui/Theme'
import Header from './components/Header'
import Population from './components/Population'
import { Chart } from 'chart.js'
import PopulationChart from './components/Chart'
import Footer from './components/Footer'

export default function App() {
  const pdfRef = useRef(null)
  return (
    <div className="App" ref={pdfRef}>
      <Header target={pdfRef}></Header>
      <Population></Population>
      <PopulationChart></PopulationChart>
      <Footer></Footer>
    </div>
  )
}
