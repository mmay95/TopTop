import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Home = () => {

  //Top songs of an artist
  const [topSong, setTopSong] = useState(null) 
  //Top artists
  const [topArtists, setTopArtists] = useState(null)
  const [similarArtist, setSimilarArtist] = useState(null)
  const [hasError, setHasError] = useState({ error: false, message: '' })
  //ArtistID based on topArtists
  const [filteredArtist, setFilteredArtist] = useState('')
  //Generates a random id between 1-10
  const [randomTrackId, setRandomTrackId] = useState('')

  // GET THE TOP ARTISTS
  // Saves ten artists to topArtists
  useEffect(() => {
    const getTopArtists = async () => {
      try {
        const { data } = await axios.get('https://api.napster.com/v2.2/artists/top?apikey=M2IwZmM5MjctNDAwOS00ZDk1LThjYTktZTU4ZGE4NzQzZjUz')
        setTopArtists(data)
        setRandomArtist()
      } catch (err) {
        setHasError({ error: true, message: err.message })
        console.log('ERROR HERE from get top artists', err.message)
      }
    }
    getTopArtists()
  }, [])

  //GIVE US A RANDOM ARTIST ID FROM TOPARTISTS
  // A random function will pick an artist ID from topArtists and pass it on to filteredArtist


const setRandomArtist = () => {
  if (topArtists) {
    const response = topArtists.artists[Math.floor(Math.random() * topArtists.artists.length)].id
    setFilteredArtist(response)
  }
}

  useEffect(() => {
    if (topArtists) {
      const response = topArtists.artists[Math.floor(Math.random() * topArtists.artists.length)].id
      setFilteredArtist(response)
  }},[topArtists])


  // GET THE TOPSONG OF THE FILTERED ARTIST
  // It will only run, if filteredArtist has been updated
  useEffect(() => {
    const getTopSongs = async () => {
      try {
        if (topArtists) {
          const { data } = await axios.get(`https://api.napster.com/v2.2/artists/${filteredArtist}/tracks/top?apikey=M2IwZmM5MjctNDAwOS00ZDk1LThjYTktZTU4ZGE4NzQzZjUz`)
          setTopSong(data)
          console.log('TOP SONGS DATA', data)
          getRandomTrackId()

        }
        // console.log('THIS IS DATA', data)
      } catch (err) {
        setHasError({ error: true, message: err.message })
        console.log('ERROR HERE from top songs', err.message)
      }
    }
    getTopSongs()
  }, [filteredArtist])


//function that takes the filteredArtist
// saves the album id of the song in a state

// show the album cover related to the album id
// which requires pinging another endpoint
const getRandomTrackId = () => {

  const randomTrackId = (Math.floor(Math.random() * 10))+1 // that should be later based on the array length of the track
  setRandomTrackId(randomTrackId)
  // console.log(randomTrackId)

}

// -- BREAKPOINT --

// make a call to this endpoint passing on the ID of filteredArtist http://api.napster.com/v2.2/artists/{artistID}/similar?apikey=YTkxZTRhNzAtODdlNy00ZjMzLTg0MWItOTc0NmZmNjU4Yzk4
// The response of endpoint will be a list of artists that are similar
// Select the top artists from the top that is similar
// set this to filteredArtists


useEffect(() => {
  const getSimilarArtists = async () => {
    try {
      if (filteredArtist) {
      const { data } = await axios.get(`http://api.napster.com/v2.2/artists/${filteredArtist}/similar?apikey=YTkxZTRhNzAtODdlNy00ZjMzLTg0MWItOTc0NmZmNjU4Yzk4`)
      console.log('SIMILAR ARTIST',data)
      setSimilarArtist(data)
    }
    } catch (err) {
      setHasError({ error: true, message: err.message })
      console.log('ERROR HERE from get top artists', err.message)
    }
  }
  getSimilarArtists()
}, [filteredArtist])

// getRandomTrackId()

const handleClick = () => {

  const similarArtistClick = similarArtist.artists[Math.floor(Math.random() * similarArtist.artists.length)].id
  setFilteredArtist(similarArtistClick)
  console.log('on click similar artist',similarArtist.artists[3].id)
}


  return (

    <>
      <div className='container'>
        <h2>TopTop</h2>
        {topSong && randomTrackId ?
          <div className='audio-container'>
            <h1>{topSong.tracks[randomTrackId].artistName}</h1>
            <img src={`http://direct.rhapsody.com/imageserver/v2/albums/${topSong.tracks[randomTrackId].albumId}/images/300x300.jpg`}  alt="something"/>
            <audio src={topSong.tracks[randomTrackId].previewURL} controls>THIS AUDIO</audio>
            <button className='similarartist' onClick={handleClick}>Similar Artist Song</button>
            <Link to="artistInfo" similarArtist={similarArtist} className='btn btn-primary'>Show more more info about the similar artist</Link>
            <button className='randomArtist' onClick={setRandomArtist}>Random Artist</button>
          </div>
          : hasError.message
        }
      </div>
    </>
  )
}

export default Home