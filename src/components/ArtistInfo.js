import React from 'react' 

import Home from './Home'

const ArtistInfo =  ({similarArtist}) => {


  console.log(similarArtist)


  return (
    <>
    <div className='container'>
      <h1>Artist Name</h1>
      <h2>Blurb</h2>
      <h2>Bio</h2>
      <p>albums</p>
    </div>
    </>
  )
}

export default ArtistInfo