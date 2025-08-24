
import './App.css'
import {Routes, Route} from 'react-router-dom'
import Setup from './pages/Setup.jsx'
import RevealWord from './pages/RevealWord.jsx'
import CluePhase from './pages/CluePhase.jsx'
import VotingPhase from './pages/VotingPhase.jsx'
import Result from './pages/Result.jsx'
import Rules from './pages/Rules.jsx'
function App() {

  return (
    <Routes>
      <Route path="/" element={<Setup />} />
      <Route path="/rules" element={<Rules/>} />
      <Route path="/reveal" element={<RevealWord/>} />
      <Route path="/clues" element={<CluePhase />} />
      <Route path="/vote" element={<VotingPhase />} />
      <Route path="/result" element={<Result />} />
    </Routes>
  )
}

export default App
