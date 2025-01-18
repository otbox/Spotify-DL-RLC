const fs = require('fs-extra');
const Spotify = require('spotifydl-core').default;
const ffmpegPath = require('ffmpeg-static'); // This will automatically find the path to ffmpeg

// Configure fluent-ffmpeg with the path to ffmpeg
const ffmpeg = require('fluent-ffmpeg');
ffmpeg.setFfmpegPath(ffmpegPath);

// Initialize SpotifyDL
const spotify = new Spotify({
   clientId: 'da08e75d968a4e1caac5082f51af9ba4',
    clientSecret: '6a7056629a204081ac1c58439b4903e6'
});

// Declaring the respective url in 'links' object
const links = {
    artist: 'https://open.spotify.com/artist/7ky9g1jEjCsjNjZbYuflUJ?si=2To3fmc-T9KuyyrQ-Qp5KQ', // Url of the artist you want to gather info about
    album: 'https://open.spotify.com/album/3u3WsbVPLT0fXiClx9GYD9?si=pfGAdL3VRiid0M3Ln_0DNg', // Url of the album you want to gather info about
    song: 'https://open.spotify.com/track/1Ub6VfiTXgyV8HnsfzrZzC?si=4412ef4ebd8141ab' // Url of the song you want to gather info about or download
};

// Engine
// (async () => {
//     try {
//         const data = await spotify.getTrack(links.song); // Waiting for the data 🥱
//         console.log('Downloading: ', data.name, 'by:', data.artists.join(' ')); // Keep an eye on the progress
//         const song = await spotify.downloadTrack(links.song); // Downloading goes brr brr
//         fs.writeFileSync('song.mp3', song); // Let's write the buffer to the woofer (i mean file, hehehe)
//         console.log('Download complete: song.mp3');
//     } catch (error) {
//         console.error('Error:', error);
//     }
// })();


const ytdlp = require("yt-dlp-exec");
const ytSearch = require('yt-search');

async function searchYouTube(query) {
    const results = await ytSearch(query);
    return results.videos[0]; // Retorna o primeiro vídeo da busca
  }

(async () => {
    try {
        const data = await spotify.getTrack(links.song);
        console.log('Obtendo música:', data.name, 'por:', data.artists.join(', '));
        console.log(data)
        const video = await searchYouTube(data.name);
        console.log(video)
        const youtubeUrl = video.url; // Certifique-se de que há um link do YouTube.
        if (!youtubeUrl) throw new Error("Link do YouTube não encontrado.");

        const outputFile = `${data.name.replace(/[<>:"/\\|?*]/g, "")}.mp3`;
        
        console.log("Baixando com yt-dlp...");
        await ytdlp(youtubeUrl, {
            output: outputFile,
            extractAudio: true,
            audioFormat: "mp3"
        });

        console.log("Download concluído:", outputFile);
    } catch (error) {
        console.error("Erro ao baixar a música:", error.message);
    }
})();