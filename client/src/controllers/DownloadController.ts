import axios from "axios"
import { MusicType } from "../types/music"

const server0 = "http://localhost:3000/downloadMp3"
const serverLRC = "http://localhost:3000/downloadLRC"

const handleDownloadLRC = async (music : MusicType) => {
    try {
        const response = await axios.get(serverLRC, {
            params: {
                musicRequisition : music
            },responseType: 'blob'
        });

        const url = window.URL.createObjectURL(new Blob([response.data]));
        const a = document.createElement('a');
        a.href = url;
        a.download = `${music.name}.lrc`; // Set the filename for the download
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url); // Clean up the URL object
    } catch (error) {
        console.error('Error downloading the file:', error);
    }
};

const handleDownloadMusic = async (music : MusicType) => {
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
    }catch (e) {
        console.error('Error downloading the file:', e);
    }
}

export const DownloadPlaylist = (Playlist : MusicType[]) => {
    console.log(Playlist);
    let i  = 0;
    for (const music of Playlist) {
        if(music.selected) {
            console.log(music)
            handleDownloadLRC(music);
            handleDownloadMusic(music);
            if (i == 1){
                break;
            }
            i++;
        }
    }

}