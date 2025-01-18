const express = require('express');
const path = require('path');
const fs = require('fs');
const ytdlp = require("yt-dlp-exec");
const app = express();
const Spotify = require('spotifydl-core').default
const axios = require('axios')
const ytSearch = require('yt-search');
const searchYouTube = require('yt-search');
const MP3Tag = require('mp3tag.js')

const credentials = {
    clientId: 'da08e75d968a4e1caac5082f51af9ba4',
    clientSecret: '6a7056629a204081ac1c58439b4903e6'
}

const spotify = new Spotify(credentials)

const port = 3000;


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
    // musicRequisition ? console.log(musicRequisition) : console.log('Nenhum musica foi escolhida.');
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
        const music = req.query.musicRequisition; 
        // const songUrl = req.query.musicRequisition.url; 
        // if (!songUrl) {
        //     return res.status(400).send('URL da música do Spotify não fornecida');
        // }

        console.log('Obtendo música:', music.name, 'por:', music.artist);

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
            audioQuality: 0,
        });
        
        console.log("Download concluído:", outputFile);
        
        // writeMP3Tags(outputFile, music);

        // const tags = await constructMetadata(music);
        // const outputFile = "/home/tboxo/Documentos/Projetos/Server/David Guetta - Hey Mama (Official Video) ft Nicki Minaj_ Bebe Rexha _ Afrojack(MP3_160K)_1.mp3"
        // const buffer = fs.readFileSync(outputFile)
        // const mp3tag = new MP3Tag(buffer, true)

        // if (music.coverArt) {
        //         try {
        //             const coverImageResponse = await axios({
        //                 method: 'get',
        //                 url: music.coverArt,
        //                 responseType: 'arraybuffer' // Get the image as a buffer
        //             });
        //             console.log(coverImageResponse.data);
        //             fs.writeFileSync("outputFile", coverImageResponse.data);
        //             const artBuffer =  new Uint8Array(coverImageResponse.data)

        //             if (!mp3tag.tags) {
        //                 mp3tag.tags = {};
        //             }
        //             if (!mp3tag.tags.v2) {
        //                 mp3tag.tags.v2 = {};
        //             }

        //             mp3tag.tags.v2.APIC = [
        //                 {
        //                   format: 'image/jpg',
        //                   type: 3,
        //                   description: 'Album image',
        //                   data: artBuffer
        //                 }
        //             ]
                    
        //         } catch (error) {
        //             console.error('Erro ao baixar a imagem da capa:', error.message);
        //         }
        //     }

        // console.log(music)
        // mp3tag.tags.title = music.name;
        // mp3tag.tags.artist = music.artist;
        // mp3tag.tags.album =  music.album;
        // mp3tag.tags.year = music.year;

        // mp3tag.save()

        // // Handle error if there's any
        // if (mp3tag.error !== '') throw new Error(mp3tag.error)

        // mp3tag.read()
        // console.log(mp3tag.tags)

        // fs.writeFileSync("outputFile.mp3", mp3tag.buffer);

        // Enviar o arquivo para o cliente
        res.download(outputFile, (err) => {
            if (err) {
                console.error('Erro ao enviar o arquivo:', err);
                res.status(500).send('Erro ao fazer download do arquivo.');
            } else {
                // Apagar o arquivo depois de enviado (se desejar)
                fs.unlink(outputFile, (err) => {
                    if (err) console.error('Erro ao apagar o arquivo:', err) 
                        else  console.log("Musica Deletada"); 
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