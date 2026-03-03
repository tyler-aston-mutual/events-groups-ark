import { Routes, Route } from 'react-router-dom'
import Home from './screens/Home.jsx'
import SpeedDating from './screens/SpeedDating.jsx'

function App() {
  return (
    <div className="max-w-sm mx-auto" style={{ height: '100dvh', overflow: 'hidden' }}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/speed-dating" element={<SpeedDating />} />
      </Routes>
    </div>
  )
}

export default App
