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
        <p>Your query is: {query}</p>
        <Tracklist tracks={tracks}/>
        </>
    )
}

export default SearchResults