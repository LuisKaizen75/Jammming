import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Playlist from './components/Playlist'
import SearchBar from './components/SearchBar'
import SearchResults from './components/SearchResults'
import SpotifyAuthButton from './components/SpotifyAuthButton'
import { getToken } from './api/spotify'

function App() {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState({})

  useEffect(()=>{
    const urlParams = new URLSearchParams(window.location.search);
    let code = urlParams.get('code');
    if (code){
      // Remove code from URL
      window.history.replaceState({}, document.title, window.location.pathname);
      // Request token
      (async () => {
        await getToken(code);
      })();
    }
  },[])

  return (
    <>
      <h1>Spotify Jammming</h1>
      <SpotifyAuthButton/>
      <SearchBar setQuery={setQuery}/>
      <SearchResults query={query}/>
      <Playlist/>
    </>
  )
}

export default App
