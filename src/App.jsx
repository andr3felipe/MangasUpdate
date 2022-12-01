import { Files } from './@imports/importFiles'
import background from './assets/background.jpg'
import { MangaCard } from './components/MangaCard/MangaCard.jsx'
import axios from 'axios'

import { useEffect, useState } from 'react'
import './App.css'
import { Header } from './components/Header/Header.jsx'

function App() {
  console.log('render')
  const [mangas, setMangas] = useState(Files)
  const [message, setMessage] = useState("")

 useEffect(() => {
    setMangas(Files)
 }, [mangas])

  async function handleGetUpdates() {

    await axios.get("http://localhost:8000/")
    .then((res) => {
      const data = res.data
      console.log(data)
    })

    setMessage("Updating, please wait a moment !")
    setTimeout(() => {
      setMessage("")
    }, 5000);
  }

  return (
    <div className="App">
      <Header />
      <div className='container'>
        {message != "" ? <h2 className='message'>{message}</h2> : null}
        <div className="buttonDiv">
          <button 
          disabled={message !== ""}
          onClick={handleGetUpdates}
          type="submit">Get Updates</button>
        </div>
        <h2>Luminous Scans</h2>
      <div className='wrapper'>
      {mangas?.map(manga => {
          return (
            <MangaCard
              key={manga.name} 
              name={manga.name}
              img={manga.img}
              chapter={manga.chapter}
              link={manga.link}
            />
          )
        })}
      </div>
      </div>        
    </div>
  )
}

export default App
