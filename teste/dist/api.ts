import SpottyDL, { Playlist } from 'spottydl'
import { FileDataProps, GetLyrics, musicProps } from './LRCHandler';
// import * as fs from 'node:fs';
// import * as yts from 'yt-search'
// // Initialization and Authentication 
// import { Spotify } from 'spotifydl-core'

// const credentials = {
//     clientId: 'da08e75d968a4e1caac5082f51af9ba4',
//     clientSecret: '6a7056629a204081ac1c58439b4903e6'
// }

// const spotify = new Spotify(credentials)
// /* To learn more about clientId and Secret  , 
// visit https://developer.spotify.com/documentation/general/guides/app-settings/ 
// */

// // Declaring the respective url in 'links' object 
// const links = {
//     artist: 'https://open.spotify.com/artist/7ky9g1jEjCsjNjZbYuflUJ?si=2To3fmc-T9KuyyrQ-Qp5KQ', // Url of the artist you want to gather info about
//     album: 'https://open.spotify.com/album/3u3WsbVPLT0fXiClx9GYD9?si=pfGAdL3VRiid0M3Ln_0DNg', // Url of the album you want to gather info about
//     song: 'https://open.spotify.com/track/1Ub6VfiTXgyV8HnsfzrZzC?si=4412ef4ebd8141ab' // Url of the song you want to gather info about or download
// };

// // Engine 
// (async () => {
//     const data = await spotify.getPlaylist("https://open.spotify.com/playlist/355fby0yMlOUBGRnHIihsr") // Waiting for the data 
//     console.log(data);
//     // console.log('Downloading: ', data.name, 'by:', data.artists.join(' ')) // Keep an eye on the progress
//     // let r = await yts.search(data.name + data.artists.join(' '))
//     // console.log(r.videos.slice(0,1))
//     // const song = await spotify.downloadTrack(links.song) // Downloading goes brr brr 
//     // console.log("Música baixada com sucesso, salvando no arquivo...");

//     // fs.writeFileSync('song.mp3', song);
//     // console.log('Download concluído: song.mp3');
// })()

let files : FileDataProps[] = [{ content: "", name : ""}];
const playlist = "https://open.spotify.com/playlist/37i9dQZF1DX3KVUsNUmJc2";
const DownloaderHandler = async () => {
    await SpottyDL.getPlaylist(playlist)
        .then(async (results) => { // Returns a <Track>
            const resultPlaylist: Playlist = (results) as Playlist
            resultPlaylist.tracks.map((element: musicProps) => {
                // DownloadMusicHandler(element);
                // files.push(GetLyrics(element));

                console.log(element)
            });
        });

    const fileListDiv = document.getElementById("file-list");
    files?.forEach((file, index) => {
        const fileItem = document.createElement("div");
        fileItem.className = "file-item";
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.id = `file-${index}`;
        const label = document.createElement("label");
        label.htmlFor = `file-${index}`;
        label.textContent = file.name;
        fileItem.appendChild(checkbox);
        fileItem.appendChild(label);
        fileListDiv?.appendChild(fileItem);
    });
}


  // Dynamically populate file list in the HTML
DownloaderHandler();
document.getElementById("getLyrics")?.addEventListener("click", () => {
    DownloaderHandler();
    console.log("aaa")
})  
  // Trigger download of selected files
  document.getElementById("download-selected")?.addEventListener("click", () => {
    const selectedFiles = files.filter((_, index) => {
      const checkbox = document.getElementById(`file-${index}`) as HTMLInputElement;
      return checkbox.checked;
    });
  
    selectedFiles.forEach((file) => {
      const blob = new Blob([file.content], { type: "text/plain" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = file.name;
      link.click();
      URL.revokeObjectURL(link.href);
    });
  });
  