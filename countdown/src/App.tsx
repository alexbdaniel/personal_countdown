
import { Route, Routes, redirect, useNavigate } from 'react-router-dom'
import './App.css'
import { Timer } from './components/timer/Timer.js'
import { SelectCountdown } from './pages/SelectCountdown.tsx'
import { PageNotFound } from './pages/PageNotFound.tsx'
import { useState } from 'react'
import { ICountdown } from './assets/countdownData.tsx'

const initItem: ICountdown = {
  id: 'x',
  urlName: '',
  displayNameShort: '',
  displayName: '',
  target: ''
}

function App() {
  const [activeItem, setActiveItem] = useState<ICountdown>(initItem)
  const navigate = useNavigate();

  return (
    <div className='timer-container'>
      
      <Routes>
        
        <Route path='/' element={<SelectCountdown activeItem={activeItem} setActiveItem={setActiveItem}/>}/>
        <Route path='/:id' element={<Timer/>}/>
    
        <Route path='*' element={<PageNotFound/>}/>
      </Routes>


      {/* <Timer></Timer> */}
    </div>
  )
}

export default App
