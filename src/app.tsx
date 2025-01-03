import { useState } from 'preact/hooks'
import './app.css'
import { SelectionBar } from './components/SelectionBar'
import { MusicType } from './types/music'
import { SearchHandle } from './controllers/SearchController'
import { fetchSpotifyData } from './api/spotify'

const MusicExample : MusicType[] = [{album : 'Gates of Fried Chicken of Death', name : 'Metal is the Law', autor:'Massacration', time: '3:47'}]
export function App() {
  const [link, setLink] = useState<string>("")
  const [data, setData] = useState<any>(null);

  const handleFetchData = async () => {
    const path = new URL(link).pathname;
    SearchHandle(path)
    // const response = await fetchSpotifyData(path);
    // console.log(response)
    // setData(response);
  };
  return (
    <>
      <div className="main-container">
        <h1>Spotify with Lyrics Downloader</h1>
        <div className="search-container">
          <input onChange={(e : any) => {setLink(e.target.value)}} type="text" name="" id="TextFieldLink" />
          <button onClick={() => handleFetchData()}>Search</button>
        </div>
        <div style={{display: "flex", gap: '0.5 vw'}}>
          <input type="checkbox" name="SelectAll" value={"SelectAll"}/>
          <p>Select All Musics</p>
        </div>
        <div className="InfoHeader">
              <p>Selected:</p>
              <p>Name:</p>
              <p>Album:</p>
              <p>Autor:</p>
              <p>Duration:</p>
          <h3>Music Count ({0})</h3>
        </div>

          {data && (
          <div>
            <h2>Resultados:</h2>
            <pre>{JSON.stringify(data, null, 2)}</pre>
          </div>
        )}

        {MusicExample.map((Music) => {return (
          <SelectionBar album={Music.album} autor={Music.autor} name={Music.name} time={Music.time}/>
        )})}
      </div>
    </>
  )
}
