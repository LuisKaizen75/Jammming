import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Playlist from './components/Playlist'
import SearchBar from './components/SearchBar'
import SearchResults from './components/SearchResults'

function App() {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState({})
  return (
    <>
      <h1>Spotify Jammming</h1>
      <SearchBar setQuery={setQuery}/>
      <SearchResults query={query}/>
      <Playlist/>
    </>
  )
}

export default App
