import { useEffect, useRef, useState } from 'preact/hooks'
import './app.css'
import { SelectionBar } from './components/SelectionBar'
import { NextSongsHandler, SearchHandle } from './controllers/SearchController'
import { DlOptions } from './types/options'
import { MusicType } from './types/music'
import { DownloadPlaylist } from './controllers/DownloadController'
import { PlaylistInfoType } from './types/playlist'
import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import { InfoBar } from './components/InfoBar'
// const MusicExample : MusicType[] = [{album : 'Gates of Fried Chicken of Death', name : 'Metal is the Law', autor:'Massacration', time: '3:47'}]

export function App() { 
  const [link, setLink] = useState<string>("")
  const [data, setData] = useState<MusicType[] | undefined>(() => []);
  const [infoData, setInfoData] = useState<PlaylistInfoType | "error" | "404" >();
  const [downloadOptions, setDownloadOptions] = useState<DlOptions>({ lyrics: true, maxSearchMusic: 100 })
  const SelectedAllMusicSwitch = useRef<HTMLInputElement>(null)

  const SelectAllMusics = (e: any) => {
    setData(e.target.checked ?
      data?.map((item) => ({ ...item, selected: true }))
      : data?.map((item) => ({ ...item, selected: false })))
  }

  const SelectedAllMusics = () => {
    if (SelectedAllMusicSwitch.current) SelectedAllMusicSwitch.current.checked = data?.every(item => item.selected) ? true : false;
    const numberOfSelectedMusics = data?.filter(item => item.selected).length;
    setDownloadOptions({ ...downloadOptions, numberOfMusicstoDl: numberOfSelectedMusics })
    // console.log(numberOfSelectedMusics);
  }

  const updateItemData = (index: number, updateData: boolean) => {
    setData(prevMusic =>
      prevMusic?.map((item , i ) =>
        i === index ? { ...item, selected: updateData } : item
      )
    );

  };

  const handleFetchData = async () => {
    const path = new URL(link).pathname;
    await SearchHandle({link : path, setSearchedData : setData, setSearchedInfo : setInfoData});
  };
  
  const moreMusic = async () => {
    const path = new URL(link).pathname;
    const newData = await NextSongsHandler(path);
    if (newData)
    setData(prevData => [...(prevData ?? []), ...newData]); 
  }
  
  const handleDownload = () => {
    if (data)
      DownloadPlaylist(data, setData);
  }

  useEffect(() => {
    console.log(data)
    SelectedAllMusics();
  }, [data]);
  return (
    <>
      <div className="main-container">
        <h1>Spotify with Lyrics Downloader</h1>
        <div className="search-container">
          <input onChange={(e: any) => { setLink(e.target.value) }} type="text" name="" id="TextFieldLink" />
          <button onClick={() => handleFetchData()}>Search</button>
        </div>
        {typeof(infoData) === 'object'? (
          <InfoBar numberOfMusic={data ? data?.length : 0}  image_cover={infoData?.coverArt} name= {infoData?.name} setSearchedData={setData} setSearchedInfo={setInfoData} moreMusic={moreMusic}  />
        ) : ("")}
        {infoData === "404" ? (<p>Não encontrado</p>) : ("")}
        {infoData === "error" ? (<p>Erro do Servidor</p>) : ("")}
        <div className={"InfoHeader"}>
          <h3>Musics for Download: {downloadOptions.numberOfMusicstoDl}</h3>
          <button onClick={() => handleDownload()}>Download</button>
        </div>
        <div className="InfoHeader">
          <div style={{ display: "flex", gap: '0.5 vw' }}>
            <input ref={SelectedAllMusicSwitch} type="checkbox" name="SelectAll" onChange={(e: any) => { SelectAllMusics(e) }} value={"SelectAll"} />
            <p>Select All</p>
          </div>
          <p>Name:</p>
          <p>Album:</p>
          <p>Autor:</p>
          <p>Duration:</p>
        </div>


        {data?.map((Music: MusicType, index: number) => {
          return (
            <SelectionBar Music={Music} key={index} index={index} onToggle={(e) => {updateItemData(e.index, e.selected) }} />
          )
        })}
        <div style={{display: 'flex',justifyContent: 'center'}}>
          {/* <iframe src="" frameborder="0"></iframe> */}
          {/* <img src="https://lottie.host/embed/ab71f12c-fc2d-49ea-9c70-e9525681a971/VknaSxE49H.lottie" alt="" width={"100px"} height={"100px"}/> */}
          <div>
          </div>
          <div style={{display: "flex",   justifyContent: "center"}}>
            <div className="howtoUse">
              <h2>How to Use</h2>
              <p>
                1. Enter the link of the playlist you want to download.
                <br />
                1.1 This app can hold multiple playlist of search, so you could add each playlist link and search, then download.
                <br />
                2. Select the musics you want to download.
                <br />
                3. Click in Download.
                <br />
                Observations: This app add the 100 first music of the playlist link, so you want to download more than 100 music, is need link of the playlist and press on "Next Song" button.
              </p>
              <div className={"dolittle"}>
                <DotLottieReact
                    src="https://lottie.host/a532e3a8-5d27-4d23-82f3-76631c271d7e/jru7XTG1vy.lottie"
                    loop
                    autoplay
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
