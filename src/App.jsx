import { Routes, Route } from 'react-router-dom'
import Home from './screens/Home.jsx'
import SpeedDating from './screens/SpeedDating.jsx'
import FilterScreen from './screens/FilterScreen.jsx'
import DetailScreen from './screens/DetailScreen.jsx'

function App() {
  return (
    <div className="max-w-sm mx-auto" style={{ height: '100dvh', overflow: 'hidden' }}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/speed-dating" element={<SpeedDating />} />
        <Route path="/filters" element={<FilterScreen />} />
        <Route path="/detail/:id" element={<DetailScreen />} />
      </Routes>
    </div>
  )
}

export default App
