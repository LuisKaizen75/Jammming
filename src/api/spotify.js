const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const redirectUri = window.location.origin;

// Generate user Authorization Code
export async function startSpotifyAuth() {
  // PKCE authorization
  // Code Verifier

  const generateRandomString = (length) => {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const values = crypto.getRandomValues(new Uint8Array(length));
    return values.reduce((acc, x) => acc + possible[x % possible.length], "");
  }

  const codeVerifier  = generateRandomString(64);

  // Code Challenge
  const sha256 = async (plain) => {
    const encoder = new TextEncoder()
    const data = encoder.encode(plain)
    return window.crypto.subtle.digest('SHA-256', data)
  }

  const base64encode = (input) => {
    return btoa(String.fromCharCode(...new Uint8Array(input)))
      .replace(/=/g, '')
      .replace(/\+/g, '-')
      .replace(/\//g, '_');
  }

  const hashed = await sha256(codeVerifier)
  const codeChallenge = base64encode(hashed);

  console.log('codeChallenge',codeChallenge);

  // Request user authorization
  const scope = 'playlist-modify-private';
  const authUrl = new URL("https://accounts.spotify.com/authorize")

  window.localStorage.setItem('code_verifier', codeVerifier);
  const params =  {
    response_type: 'code',
    client_id: clientId,
    scope,
    code_challenge_method: 'S256',
    code_challenge: codeChallenge,
    redirect_uri: redirectUri,
  }

  authUrl.search = new URLSearchParams(params).toString();
  window.location.href = authUrl.toString();
}

// Request Access Token
export async function getToken(code) {
  const codeVerifier = window.localStorage.getItem('code_verifier');

  const url = "https://accounts.spotify.com/api/token";
  const payload = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      client_id: clientId,
      grant_type: 'authorization_code',
      code,
      redirect_uri: redirectUri,
      code_verifier: codeVerifier,
    }),
  }

  const body = await fetch(url, payload);
  const response = await body.json();

  localStorage.setItem('access_token', response.access_token);
}

// Format track 
function formatTracks(jsonResponse){
  if (!jsonResponse.tracks || !jsonResponse.tracks.items) return[]

  return jsonResponse.tracks.items.map((track)=>{
    const artists = track.artists.map(artist => artist.name).join(" , ");
    return({
      id: track.id,
      name: track.name,
      artist: artists,
      album: track.album.name,
    })
  })
}

// Search for tracks
export async function searchTrack(query, token) {
  query = encodeURI(query);
  const url = "https://api.spotify.com/v1/search?";
  const queryParams = `q=${query}&type=track&limit=5`;
  const endpoint = url + queryParams;
  const headers = {
    Authorization: `Bearer ${token}`
  }
  try {
    const response = await fetch(endpoint, {headers})
    if (response.ok) {
      const jsonResponse = await response.json();
      return formatTracks(jsonResponse);
    }
  } catch (error) {
    console.log(error);
  }
}

// Create and save playlist
export async function getUserId() {
  const token = localStorage.getItem('access_token');
  const url = "https://api.spotify.com/v1/me";
  const headers = {
    Authorization: `Bearer ${token}`
  }

  try {
    const response = await fetch(url, {headers})
    if (response.ok) {
      const jsonResponse = await response.json();
      return jsonResponse.id
    }
  } catch (error) {
    console.log(error)
  }
}

export async function createPlaylist(playlistName) {
  const token = localStorage.getItem('access_token');
  const userId = await getUserId();
  const url = `https://api.spotify.com/v1/users/${userId}/playlists`;
  const data = JSON.stringify({name: playlistName, description: 'Created with the Jamming App', public: false});
  const headers = {
   Authorization: `Bearer ${token}`,
   'Content-Type': 'application/json'
  }
  try {
    const response = await fetch(url, {
      method: "POST",
      body: data,
      headers: headers})

    if (response.ok) {
      const jsonResponse = await response.json();
      return jsonResponse.id // Playlist id
    }
  } catch (error) {
    console.log(error);
  }
}

export async function addSongsToPlaylist(playlistId, songs) {
  const token = localStorage.getItem('access_token');
  const url = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`;
  const songsIds = songs.map(song => `spotify:track:${song.id}`);
  const data = JSON.stringify({uris:songsIds});
  const headers = {
   Authorization: `Bearer ${token}`,
   'Content-Type': 'application/json'
  }
  console.log(data)
  try {
    const response = await fetch(url,{
      method: "POST",
      body: data,
      headers: headers
    })

    if (response.ok) {
      console.log("Lista creada")
    }
  } catch (error) {
    console.log(error)
  }
}

export async function savePlaylist(playlistName, playlistItems) {
  const playlistId = await createPlaylist(playlistName);
  addSongsToPlaylist(playlistId, playlistItems);
}