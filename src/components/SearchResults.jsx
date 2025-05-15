import React, { useState } from 'react'
import Tracklist from './Tracklist'

function SearchResults(props){

    return(
        <>
        <p>Your query is: {props.query}</p>
        <Tracklist/>
        </>
    )
}

export default SearchResults