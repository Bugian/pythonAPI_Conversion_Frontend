import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import ConvertorPage from './pages/ConvertorPage';
import HistoryPage from './pages/HistoryPage'
import EnergyPage from './pages/EnergyPage'

function App() {
  return (
    <Router>
      <div className="p-4">
        <nav className="mb-4 space-x-4">
          <Link to="/" className="text-blue-500 hover:underline">Convertor</Link>
          <Link to="/history" className="text-blue-500 hover:underline">Istoric</Link>
          <Link to="/energy" className="text-blue-500 hover:underline">Energie</Link>
        </nav>
        <Routes>
          <Route path="/" element={<ConvertorPage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/energy" element={<EnergyPage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App;
