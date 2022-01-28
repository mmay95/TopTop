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
      } catch (err) {
        setHasError({ error: true, message: err.message })
      }
    }
    getTopArtists()
  }, [])

  // GET THE TOPSONG OF THE FILTERED ARTIST
  // It will only run, if filteredArtist has been updated
  useEffect(() => {
    const getTopSongs = async () => {
      try {
        if (topArtists) {
          const { data } = await axios.get(`https://api.napster.com/v2.2/artists/${filteredArtist}/tracks/top?apikey=M2IwZmM5MjctNDAwOS00ZDk1LThjYTktZTU4ZGE4NzQzZjUz`)
          setTopSong(data)
          getRandomTrackId()

        }
        // console.log('THIS IS DATA', data)
      } catch (err) {
        setHasError({ error: true, message: err.message })
      }
    }
    getTopSongs()
  }, [ filteredArtist ])

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
          setSimilarArtist(data)
        }
      } catch (err) {
        setHasError({ error: true, message: err.message })
      }
    }
    getSimilarArtists()
  }, [filteredArtist])


  //function that takes the filteredArtist
  // saves the album id of the song in a state

  useEffect(() => {
    if (topArtists) {
      const response = topArtists.artists[Math.floor(Math.random() * topArtists.artists.length)].id
      setFilteredArtist(response)
    }
  }, [topArtists])


  //GIVE US A RANDOM ARTIST ID FROM TOPARTISTS
  // A random function will pick an artist ID from topArtists and pass it on to filteredArtist

  const setRandomArtist = () => {
    const response = topArtists.artists[Math.floor(Math.random() * topArtists.artists.length)].id
    setFilteredArtist(response)
  }

  // show the album cover related to the album id
  // which requires pinging another endpoint
  const getRandomTrackId = () => {
    const randomTrackId = (Math.floor(Math.random() * 10)) + 1 // that should be later based on the array length of the track
    setRandomTrackId(randomTrackId)
  }

  // getRandomTrackId()

  const handleClick = () => {
    const similarArtistClick = similarArtist.artists[Math.floor(Math.random() * similarArtist.artists.length)].id
    setFilteredArtist(similarArtistClick)
  }

  return (
    <>
      {topSong && randomTrackId ?

        <div className='container'>


          <div className='object-container'>

            <div className='randomArtist-container'>
              <button className='randomArtist' onClick={setRandomArtist}>Random Artist</button>
            </div>

            <div className='mid-section'>
              <h1>{topSong.tracks[randomTrackId].artistName}</h1>
              <h2>{topSong.tracks[randomTrackId].name}</h2>
              <Link to={`artistInfo/${filteredArtist}`} className='link'>Read More About The Artist &rarr;</Link>
              <img src={`http://direct.rhapsody.com/imageserver/v2/albums/${topSong.tracks[randomTrackId].albumId}/images/600x600.jpg`} alt="something" />
              <audio src={topSong.tracks[randomTrackId].previewURL} controls>THIS AUDIO</audio>
            </div>

            <div className='similarArtist-container'>
              <button className='similarartist' onClick={handleClick}>Similar Artist</button>
            </div>

          </div>
          <div className='bg-blur' style={{ backgroundImage: `url(http://direct.rhapsody.com/imageserver/v2/albums/${topSong.tracks[randomTrackId].albumId}/images/600x600.jpg) ` }}></div>
        </div>


        :
        hasError.message
      }
    </>
  )
}

export default Home