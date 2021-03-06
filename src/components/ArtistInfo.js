import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'

const ArtistInfo = () => {


  const [artistText, setArtistText] = useState(null)
  const [hasError, setHasError] = useState({ error: false, message: '' })
  const { artistId } = useParams()

  useEffect(() => {
    const getArtistInfo = async () => {
      try {
        const { data } = await axios.get(`https://api.napster.com/v2.2/artists/${artistId}?apikey=YTkxZTRhNzAtODdlNy00ZjMzLTg0MWItOTc0NmZmNjU4Yzk4`)

        setArtistText(data)
      } catch (err) {
        setHasError({ error: true, message: err.message })
      }
    }
    getArtistInfo()
  }, [artistId])


  return (

    <>
      {artistText ?
        <div className='container-artistInfo'>
          <img src={`https://direct.rhapsody.com/imageserver/v2/artists/${artistId}/images/600x600.jpg`} alt={artistId} />
          <h1 className='artistInfo-title'>{artistText.artists[0].name}</h1>
          {artistText.artists[0].blurbs && artistText.artists[0].blurbs.map((element, id) => {
            return (
              <p key={id}>{element}</p>
            )
          })}
          <Link to={`/`} className='link'>&larr; Back to Music Player</Link>
        </div>
        :
        <div className='error'>
          <img className='wait' src="https://c.tenor.com/TV_4YtcPSUQAAAAC/wait-patience.gif" alt='waiting gif' />
          <p>Woah there tiger, slow down a little! <br /> 
            Your information is still loading</p>
        </div>
      }
    </>
  )
}

// LINE 134 of Home.js works -> clicking on Show More Info will 
// redirect you to a page with the unique info of any artist on screen

export default ArtistInfo