import Reac, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

const ArtistInfo = () => {


  const [artistText, setArtistText] = useState(null)
  const [hasError, setHasError] = useState({ error: false, message: '' })
  const { artistId } = useParams()

  console.log('ARTIST ID', artistId)

  useEffect(() => {
    const getArtistInfo = async () => {
      try {
        const { data } = await axios.get(`http://api.napster.com/v2.2/artists/${artistId}?apikey=YTkxZTRhNzAtODdlNy00ZjMzLTg0MWItOTc0NmZmNjU4Yzk4`)

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
        <div className='container'>
          <h1>Artist Name:{artistText.artists[0].blurbs[2]} </h1>
          <h2>Blurb</h2>
          <h2>Bio</h2>
          <p>albums</p>
        </div>
      :
      <div>loading</div> 
      }
    </>
  )
}

// LINE 134 of Home.js works -> clicking on Show More Info will 
// redirect you to a page with the unique info of any artist on screen

export default ArtistInfo