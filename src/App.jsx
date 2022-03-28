import { Route, Routes } from 'react-router-dom'
import './App.css'
import { Home } from './pages/Home'
import { List } from './pages/List'
import { Suggestion } from './pages/Suggestion'

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />}>
        <Route path=":uuid" element={<Home />} />
      </Route>
      <Route path="suggestion" element={<Suggestion />} />
      <Route path="list" element={<List />} />
    </Routes>
  )
}

export default App
