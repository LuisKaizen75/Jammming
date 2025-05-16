import React from "react";
import { startSpotifyAuth } from "../api/spotify"

function SpotifyAuthButton(){
    return(
        <button onClick={startSpotifyAuth}>
            Connect to Spotify
        </button>
    )
}

export default SpotifyAuthButton