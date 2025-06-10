import React, { useState, useEffect } from 'react'
import Tracklist from './Tracklist'
import { searchTrack } from '../api/spotify'

function SearchResults(props){
    const query = props.query;
    const [tracks, setTracks] = useState([]);
    useEffect(() => {
        const token = localStorage.getItem('access_token');
        if (query) {
         (async () => {
            const tracks = await searchTrack(query, token);
            setTracks(tracks);
        })();   
        }
    }, [query])
    
    return(
        <>
        <h3>Results for: '{query}'</h3>
        <Tracklist tracks={tracks} button={true} updatePlaylistItems={props.updatePlaylistItems}/>
        </>
    )
}

export default SearchResults