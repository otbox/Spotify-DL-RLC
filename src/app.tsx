import { useState } from 'preact/hooks'
import preactLogo from './assets/preact.svg'
import viteLogo from '/vite.svg'
import './app.css'
import { SelectionBar } from './components/SelectionBar'

export function App() {
  const [link, setLink] = useState<string>("")


  return (
    <>
      <div className="main-container">
        <h1>Spotify with Lyrics Downloader</h1>
        <input type="text" name="" id="" />
        <SelectionBar />
      </div>
    </>
  )
}
