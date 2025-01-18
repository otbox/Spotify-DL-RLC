import { useEffect, useState } from 'preact/hooks'
import './app.css'
import { SelectionBar } from './components/SelectionBar'
// import { MusicType } from './types/music'
import { SearchHandle } from './controllers/SearchController'
import { DlOptions, DownLoadListType } from './types/options'
import { MusicType } from './types/music'
import { DownloadPlaylist } from './controllers/DownloadController'

// const MusicExample : MusicType[] = [{album : 'Gates of Fried Chicken of Death', name : 'Metal is the Law', autor:'Massacration', time: '3:47'}]

export function App() {
  const [link, setLink] = useState<string>("")
  const [data, setData] = useState<MusicType[] | undefined>(() => []);
  // const [downloadOptions , setDownloadOptions] = useState<DlOptions>({lyrics: true, maxSearchMusic : 100})

  const updateItemData = (index: number, updateData: boolean) => {
      setData(prevMusic => 
          prevMusic?.map((item, i) => 
              i === index ? { ...item, selected: updateData } : item
          )
      );
  };

  
  const handleFetchData = async () => {
    const path = new URL(link).pathname;
    setData(await SearchHandle(path));
  };



  const handleDownload = () => {
    if (data)
      DownloadPlaylist(data);
  }

  useEffect(() => {
    console.log(data)
  },[data]);
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
          <h3>Music Count ({data?.length})</h3>
          <button onClick={() => handleDownload()}>Download</button>
        </div>


        {data?.map((Music : MusicType, index : number) => {return (
          <SelectionBar Music={Music} key={index} index={index} onToggle={(e) => {updateItemData(e.index,e.selected)}}/>
        )})}
      </div>
    </>
  )
}
