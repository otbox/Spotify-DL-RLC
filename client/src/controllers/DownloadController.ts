import axios from "axios"
import { MusicType } from "../types/music"
import { Dispatch, StateUpdater } from "preact/hooks";

// const server0 = "http://192.168.1.101:3000/downloadMp3"
const server0 = "http://127.0.0.1:3000/downloadMp3"
const serverLRC = "http://127.0.0.1:3000/downloadLRC"
// const serverLRC = "http://192.168.1.101:3000/downloadLRC"

const handleDownloadLRC = async (music : MusicType, setData : Dispatch<StateUpdater<MusicType[] | undefined>>) => {
    try {
        const response = await axios.get(serverLRC, {
            params: {
                musicRequisition : music
            },responseType: 'blob'
        });

        setLyricsStatus(music.id, true, setData);
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const a = document.createElement('a');
        a.href = url;
        a.download = `${music.name}.lrc`; // Set the filename for the download
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url); // Clean up the URL object
    } catch (error) {
        setLyricsStatus(music.id, "failed", setData);
        console.error('Error downloading the file:', error);
    }
};

const handleDownloadMusic = async (music : MusicType, setData : Dispatch<StateUpdater<MusicType[] | undefined>>) => {
    try {
        const response = await axios.get(server0, {
            params: {
                musicRequisition : music
            },responseType: 'blob'
        });
        const url = window.URL.createObjectURL(new Blob([response.data]));
        console.log(response.data)
        const a = document.createElement('a');
        a.href = url;
        a.download = `${music.name}.mp3`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
        setMusicStatus(music.id, true, setData);    
    }catch (e) {
        setMusicStatus(music.id, "failed", setData);
        console.error('Error downloading the file:', e);
    }finally {
        setDownloading(music.id, false, setData);
    }
}

const setDownloading = (index: number, updateData: boolean | "failed", setData : Dispatch<StateUpdater<MusicType[] | undefined>>) => {
    setData(prevMusic =>
      prevMusic?.map((item , i ) =>
        i === index ? { ...item, downloading: updateData } : item
      )
    );
  };

const setMusicStatus = (index: number, updateData: boolean | "failed", setData : Dispatch<StateUpdater<MusicType[] | undefined>>) => {
setData(prevMusic =>
    prevMusic?.map((item , i ) =>
    i === index ? { ...item, music: updateData } : item
    )
);
};

const setLyricsStatus = (index: number, updateData: boolean | "failed", setData : Dispatch<StateUpdater<MusicType[] | undefined>>) => {
setData(prevMusic =>    
    prevMusic?.map((item , i ) =>
    i === index ? { ...item, lyrics: updateData } : item
    )
);
};

export const DownloadPlaylist = (Playlist : MusicType[], setData : Dispatch<StateUpdater<MusicType[] | undefined>>) => {
    for (const music of Playlist) {
        if(music.selected === true) {
            setDownloading(music.id, true, setData);
            handleDownloadLRC(music, setData);
            handleDownloadMusic(music, setData);
        }
    }

}