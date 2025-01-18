const express = require('express');
const path = require('path');
const fs = require('fs');
const ytdlp = require("yt-dlp-exec");
const app = express();
const Spotify = require('spotifydl-core').default
const axios = require('axios')
const ytSearch = require('yt-search');
const searchYouTube = require('yt-search');
const NodeID3 = require('node-id3')


const credentials = {
    clientId: 'da08e75d968a4e1caac5082f51af9ba4',
    clientSecret: '6a7056629a204081ac1c58439b4903e6'
}

const spotify = new Spotify(credentials)

const port = 3000;

const DownloadMusic = async (music, res) => {
    try {
        const songUrl = music.url; // Recebe a URL da música do Spotify como query
        if (!songUrl) {
            return res.status(400).send('URL da música do Spotify não fornecida');
        }

        console.log('Obtendo música:', music.name, 'por:', music.artists.join(', '));

        // Buscar o vídeo no YouTube com o nome da música
        const video = await searchYouTube(music.name);
        const youtubeUrl = video.videos[0]?.url; // Pega o primeiro vídeo da busca
        if (!youtubeUrl) throw new Error("Link do YouTube não encontrado.");

        const outputFile = path.join(__dirname, `${music.name.replace(/[<>:"/\\|?*]/g, "")}.mp3`);

        console.log("Baixando com yt-dlp...");

        // Baixar o áudio do YouTube e salvar como mp3
        await ytdlp(youtubeUrl, {
            output: outputFile,
            extractAudio: true,
            audioFormat: "mp3",
        });

        const tags = {
            title: music.name,
            artist: music.artist.join(', '),
            album:  music.album,
            year:  music.year,
        };
        console.log("coloquei Tags");
        // if (music.coverArt) {
        //     try {
        //         const coverImageResponse = await axios({
        //             method: 'get',
        //             url: music.coverArt,
        //             responseType: 'arraybuffer' // Get the image as a buffer
        //         });

        //         // Add the image buffer to the tags
        //         tags.image = {
        //             mime: 'image/jpeg', // or 'image/png' depending on the image format
        //             type: {
        //                 id: 3, // ID3v2.3: 3 = cover (front)
        //                 name: 'front cover'
        //             },
        //             description: 'Cover Image',
        //             data: coverImageResponse.data // Use the image buffer directly
        //         };
        //     } catch (error) {
        //         console.error('Erro ao baixar a imagem da capa:', error.message);
        //     }
        // }

        NodeID3.write(tags, outputFile, (err) => {
            if (err) {
                console.error('Erro ao adicionar metadados:', err);
            } else {
                console.log('Metadados adicionados com sucesso:', tags);
            }
        });

        console.log("Download concluído:", outputFile);

        // Enviar o arquivo para o cliente
        res.download(outputFile, (err) => {
            if (err) {
                console.error('Erro ao enviar o arquivo:', err);
                res.status(500).send('Erro ao fazer download do arquivo.');
            } else {
                // Apagar o arquivo depois de enviado (se desejar)
                console.log("Apagando Arquivo");
                fs.unlink(outputFile, (err) => {
                    if (err) console.error('Erro ao apagar o arquivo:', err);
                });
            }
        });

    } catch (error) {
        console.error('Erro ao baixar a música:', error.message);
        res.status(500).send('Erro ao processar a música.');
    }
 }

  const GetLyrics = async (musicaEscolhida) => {
    let FileD = { content: "", name: "" };
    try {
        const response = await axios.get('https://lrclib.net/api/get?', {
            params: {
                track_name: musicaEscolhida.name,
                artist_name: musicaEscolhida.artist,
                album_name: musicaEscolhida.album,
            }
        });

        const LRCData = response.data;
        const lyrics = LRCData.syncedLyrics;
        const title = LRCData.trackName;
        FileD = { name: `${title}.lrc`, content: lyrics };
    } catch (error) {
        console.log(error);
    }
    return FileD;
};

app.get('/downloadLRC', async (req, res) => {
    const { musicRequisition } = req.query;
    console.log(musicRequisition);
    musicRequisition ? console.log(musicRequisition) : console.log('Nenhum musica foi escolhida.');
    // const MusicTest = { name: 'For Whom The Bell Tolls', album: 'Ride The Lightning', artist: 'Metallica' };
    const LRCdata = await GetLyrics(musicRequisition);
    
    if (LRCdata.content) {
        // Set headers to indicate a file download
        res.setHeader('Content-Disposition', `attachment; filename="${LRCdata.name}"`);
        res.setHeader('Content-Type', 'text/plain');
        
        // Send the lyrics content directly
        res.send(LRCdata.content);
    } else {
        res.status(500).send('Erro ao obter as letras da música.');
    }
});

app.get('/downloadMp3', async (req, res) => {
    try {
        const songUrl = req.query.musicRequisition.url; // Recebe a URL da música do Spotify como query
        if (!songUrl) {
            return res.status(400).send('URL da música do Spotify não fornecida');
        }

        // Obter dados da música via Spotify
        const data = await spotify.getTrack(songUrl);
        console.log('Obtendo música:', data.name, 'por:', data.artists.join(', '));

        // Buscar o vídeo no YouTube com o nome da música
        const video = await searchYouTube(data.name);
        const youtubeUrl = video.videos[0]?.url; // Pega o primeiro vídeo da busca
        if (!youtubeUrl) throw new Error("Link do YouTube não encontrado.");

        const outputFile = path.join(__dirname, `${data.name.replace(/[<>:"/\\|?*]/g, "")}.mp3`);

        console.log("Baixando com yt-dlp...");

        // Baixar o áudio do YouTube e salvar como mp3
        await ytdlp(youtubeUrl, {
            output: outputFile,
            extractAudio: true,
            audioFormat: "mp3"
        });

        console.log("Download concluído:", outputFile);

        // Enviar o arquivo para o cliente
        res.download(outputFile, (err) => {
            if (err) {
                console.error('Erro ao enviar o arquivo:', err);
                res.status(500).send('Erro ao fazer download do arquivo.');
            } else {
                // Apagar o arquivo depois de enviado (se desejar)
                fs.unlink(outputFile, (err) => {
                    if (err) console.error('Erro ao apagar o arquivo:', err);
                });
            }
        });

    } catch (error) {
        console.error('Erro ao baixar a música:', error.message);
        res.status(500).send('Erro ao processar a música.');
    }
});


app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
  });