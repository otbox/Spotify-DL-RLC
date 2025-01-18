var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a, _b;
import SpottyDL from 'spottydl';
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
let files = [{ content: "", name: "" }];
const playlist = "https://open.spotify.com/playlist/37i9dQZF1DX3KVUsNUmJc2";
const DownloaderHandler = () => __awaiter(void 0, void 0, void 0, function* () {
    yield SpottyDL.getPlaylist(playlist)
        .then((results) => __awaiter(void 0, void 0, void 0, function* () {
        const resultPlaylist = (results);
        resultPlaylist.tracks.map((element) => {
            // DownloadMusicHandler(element);
            // files.push(GetLyrics(element));
            console.log(element);
        });
    }));
    const fileListDiv = document.getElementById("file-list");
    files === null || files === void 0 ? void 0 : files.forEach((file, index) => {
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
        fileListDiv === null || fileListDiv === void 0 ? void 0 : fileListDiv.appendChild(fileItem);
    });
});
// Dynamically populate file list in the HTML
DownloaderHandler();
(_a = document.getElementById("getLyrics")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
    DownloaderHandler();
    console.log("aaa");
});
// Trigger download of selected files
(_b = document.getElementById("download-selected")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", () => {
    const selectedFiles = files.filter((_, index) => {
        const checkbox = document.getElementById(`file-${index}`);
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
