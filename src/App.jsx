import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Playlist from './components/Playlist'
import SearchBar from './components/SearchBar'
import SearchResults from './components/SearchResults'
import SpotifyAuthButton from './components/SpotifyAuthButton'
import { getToken, savePlaylist } from './api/spotify'

function App() {
  const [query, setQuery] = useState("");
  const [playlistItems, setPlaylistItems] = useState([]);
  const [playlistName, setPlaylistName] = useState("");

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

  function updatePlaylistItems(id, name, artist, album){    
    const track = {
      id: id,
      name: name,
      artist: artist,
      album: album
    }
    
    setPlaylistItems((prev) => {
       return[track, ...prev]
    });
  }

  function removeItem(id){
    setPlaylistItems((prev) => { return prev.filter(i => i.id !== id)});
  }

  return (
    <>
      <h1>Spotify Jammming</h1>
      <SpotifyAuthButton/>
      <SearchBar setQuery={setQuery}/>
      <SearchResults query={query} updatePlaylistItems={updatePlaylistItems}/>
      <label htmlFor="title"></label>
      <input name='title' id='title' type='text' placeholder='Playlist title' onChange={({target})=>setPlaylistName(target.value)}/>
      <Playlist tracks={playlistItems} removeItem={removeItem}/>
      <button onClick={()=>{savePlaylist(playlistName, playlistItems);
        setPlaylistItems([]);
        setPlaylistName("");
      }}>Save Playlist</button>
    </>
  )
}

export default App
