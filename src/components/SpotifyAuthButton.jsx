import React from "react";
import { startSpotifyAuth } from "../api/spotify"

function SpotifyAuthButton(){
    return(
        <button onClick={startSpotifyAuth} id="auth-button">
            Connect to Spotify
        </button>
    )
}

export default SpotifyAuthButton