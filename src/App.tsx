import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Home from './components/Home'
import CharacterCreator from './components/CharacterCreator'
import CharacterSheet from './components/CharacterSheet'
import { Character } from './types/Character'

function App() {
  const [currentCharacter, setCurrentCharacter] = useState<Character | null>(null)

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route 
              path="/create" 
              element={
                <CharacterCreator 
                  onCharacterCreated={setCurrentCharacter}
                />
              } 
            />
            <Route 
              path="/sheet" 
              element={
                <CharacterSheet 
                  character={currentCharacter}
                />
              } 
            />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App