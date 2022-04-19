import React, {useState, useEffect} from 'react'
import './TopHeader.scss'
import userLogo from '../../assets/user-logo.png'
import Switch from '../Switch/Switch.js'

function TopHeader() {
    const [weather, setWeather] = useState('')
    const [podcasts, setPodcasts] = useState('')
    const [isPlaying, setIsPlaying] = useState(false)
    const [savedSong, setSavedSong] = useState(null);

    const weatherCall = () => {
        fetch('https://api.freegeoip.app/json/?apikey=cad0f1c0-bdb3-11ec-aaf5-2f6132b856f3')
        .then(res => res.json())
        .then(data => fetch(`https://api.openweathermap.org/data/2.5/weather?q=${data.city}&appid=733f6781fab5df7b2f482c52d3887087&lang=ru&units=metric`))
        .then(res => res.json())
        .then(data => setWeather(data)) 
        .catch(err => console.error(err))
    }

    const radioCall = () => {
        fetch('https://radio-t.com/site-api/last/5?categories=podcast')
            .then(res=> res.json())
            .then(data => setPodcasts(data))
            .catch(err => console.error(err));
    }

    useEffect(() => {
        weatherCall()
        radioCall()
      }, [])

    const handleAudio = () => {
        let states = !isPlaying;
        setIsPlaying(states);
    
        if (states) {  
            playSong(); 
        }
        else {
            togglePause(savedSong); 
        }
    }

    function playSong() {
        const audio = new Audio(podcasts && podcasts[0].audio_url)
        if (savedSong) {
            savedSong.play()
        } else {
            audio.play();
            setSavedSong(audio);
        }
    }
    
    function togglePause(savedSong) {
        savedSong.pause();
    }

  return (
    <div className='top__header'>
        <div className='audio'>
        <Switch handleAudio={handleAudio} isPlaying={isPlaying} />
        </div>

        { weather && weather.message !== 'city not found' ?
        <div className='weather__info'>
            <img className='weather__icon' src={weather && `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} />
            {`${weather && weather.name}, `}
            {`${weather && Math.round(weather.main.temp)}°C` } 
        </div>
        : <></>
        }

        <div className='user__login'>
            <img src={userLogo} width='20px' height='20px' alt='weather-logo'/>
            <div className='user__address'>elvie@amail.tat</div>
        </div>
    </div>
  )
}

export default TopHeader