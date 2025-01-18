const express = require('express');
const path = require('path');
const fs = require('fs');
const ytdlp = require('yt-dlp-exec'); // yt-dlp library
const Spotify = require('spotifydl-core').default;
const searchYouTube = require('yt-search'); // A biblioteca de busca do YouTube

const app = express();
const port = 3000;

// Configurar SpotifyDL
const spotify = new Spotify({
    clientId: 'da08e75d968a4e1caac5082f51af9ba4',
    clientSecret: '6a7056629a204081ac1c58439b4903e6'
});

// Endpoint para baixar a música
app.get('/download', async (req, res) => {
    
    try {
        const songUrl = req.query.musicRequisition.url || "https://open.spotify.com/track/1Ub6VfiTXgyV8HnsfzrZzC?si=4412ef4ebd8141ab"; // Recebe a URL da música do Spotify como query
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

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor Express rodando em http://localhost:${port}`);
});
