const express = require('express');
const path = require('path');
const fs = require('fs');
const ytdlp = require("yt-dlp-exec");
const app = express();
const axios = require('axios')
const searchYouTube = require('yt-search');
const cors = require('cors');
const ffmpegPath = require('ffmpeg-static');
const NodeID3 = require('node-id3');


const ffmpeg = require('fluent-ffmpeg');
ffmpeg.setFfmpegPath(ffmpegPath);


app.use(cors());
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
            ffmpegLocation: ffmpegPath,
            output: outputFile,
            extractAudio: true,
            audioFormat: "mp3",
            audioQuality: 0,
        });

        console.log("Download concluído:", outputFile);
        try {
            const coverImageResponse = await axios({
                method: 'get',
                url: music.coverArt,
                responseType: 'arraybuffer' // Get the image as a buffer
            });
            console.log(coverImageResponse.data);
            // fs.writeFileSync("outputFile", coverImageResponse.data);
            const artBuffer = Buffer.from(coverImageResponse.data)

            const tags = {
                title: music.title,
                artist: music.artist,
                album: music.album,
                year: music.year,
                APIC: {
                    mime: "image/jpeg", 
                    type: 3, 
                    description: "Cover Art",
                    imageBuffer: artBuffer
                }
            };

            // Escreve os metadados no arquivo MP3
            console.log("adicionando metadados para : ", outputFile);
            await NodeID3.write(tags, outputFile);
            console.log("metadados adicionados");  
        } catch (error) {
            console.log(error)
        }

        // Enviar o arquivo para o cliente
        res.download(outputFile, (err) => {
            if (err) {
                console.error('Erro ao enviar o arquivo:', err);
                res.status(500).send('Erro ao fazer download do arquivo.');
            } else {
                // Apaga Arquivos depois de enviado 
                fs.unlink(outputFile, (err) => {
                    if (err) console.error('Erro ao apagar o arquivo:', err)
                    else console.log("Musica Deletada");
                });
            }
        });

    } catch (error) {
        console.error('Erro ao baixar a música:', error.message);
        res.status(500).send('Erro ao processar a música.');
    }
});

app.get("/", (req, res) => {
    res.send("Servidor rodando");
})

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});