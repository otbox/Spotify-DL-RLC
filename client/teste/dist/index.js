var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import axios from 'axios';
import SpottyDL from 'spottydl';
import * as fs from 'node:fs';
import * as path from 'node:path';
import yts from 'yt-search';
import ytdl from 'ytdl-core';
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile } from '@ffmpeg/util';
// let musicaEscolhida : musicProps;
// (async() => {
//     await SpottyDL.getTrack("https://open.spotify.com/track/5WDLRQ3VCdVrKw0njWe5E5")
//         .then(results  => { // Returns a <Track>
//             const resultMusic : musicProps = (results) as musicProps
//             console.log(resultMusic)
//             GetLyrics(resultMusic);
//         });
// })();
const Button = document.getElementById("changeTextButton");
const playlist = "https://open.spotify.com/playlist/37i9dQZF1DX3KVUsNUmJc2";
Button === null || Button === void 0 ? void 0 : Button.addEventListener('click', () => { DownloaderHandler(); });
const DownloaderHandler = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log("TEste");
    yield SpottyDL.getPlaylist(playlist)
        .then((results) => __awaiter(void 0, void 0, void 0, function* () {
        const resultPlaylist = (results);
        resultPlaylist.tracks.map((element) => {
            DownloadMusicHandler(element);
            // GetLyrics(element);
            console.log(element);
        });
    }));
});
const OutputPath = "./lyrics";
const DownloadMusicHandler = (Music) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ffmpeg = new FFmpeg();
        yield ffmpeg.load();
        const music = (yield yts.search(Music.title + Music.artist)).videos[0];
        const audioStream = ytdl(music.url, { quality: 'highestaudio' });
        const sanitizedTitle = Music.title.replace(/[<>:"/\\|?*\x00-\x1F]/g, '_');
        const outputFilePath = path.join(__dirname, `${sanitizedTitle}.mp3`);
        // Baixar o stream de áudio
        const audioBuffer = yield new Promise((resolve, reject) => {
            const chunks = [];
            const audioStream = ytdl(music.url, { quality: 'highestaudio' });
            audioStream.on('data', (chunk) => chunks.push(chunk));
            audioStream.on('end', () => resolve(Buffer.concat(chunks)));
            audioStream.on('error', reject);
        });
        console.log('Stream de áudio baixado. Iniciando conversão...');
        // Escrever o áudio em um arquivo temporário dentro do FS do FFmpeg.wasm
        const inputFileName = 'audio.webm'; // Nome temporário no sistema virtual
        ffmpeg.writeFile(inputFileName, yield fetchFile(audioBuffer));
        // Executar o FFmpeg para converter para MP3
        yield ffmpeg.exec(['-i', inputFileName, '-q:a', '0', '-map', 'a', 'output.mp3']); // Conversão de áudio
        // Ler o arquivo convertido de volta
        const outputBuffer = ffmpeg.readFile('output.mp3');
        // Salvar o arquivo no sistema local
        // fs.writeFileSync(path.join(__dirname, outputFilePath), Buffer.from(outputBuffer));
        console.log(`Conversão concluída. Arquivo salvo como: ${outputFilePath}`);
    }
    catch (error) {
        console.error('Erro durante o processo:', error);
    }
});
const DownloadLRC = (data) => {
    console.log(data);
    const lyrics = data.plainLyrics;
    const title = data.trackName;
    // const lyrics = data.plainLyrics
    if (!fs.existsSync(OutputPath)) {
        fs.mkdirSync(OutputPath, { recursive: true });
        console.log(`Diretório criado: ${OutputPath}`);
    }
    const fileName = `${title}.lrc`;
    const filePath = path.join(OutputPath, fileName);
    // Salva o arquivo no sistema de arquivos
    fs.writeFileSync(filePath, lyrics, 'utf-8');
    console.log(`Arquivo .lrc salvo em: ${filePath}`);
};
const GetLyrics = (musicaEscolhida) => {
    // SpottyDL.downloadTrack(musicaEscolhida, OutputPath).then((e)=> {
    //     console.log(e)
    // })
    axios.get('https://lrclib.net/api/get?', {
        params: {
            track_name: musicaEscolhida.title,
            artist_name: musicaEscolhida.artist,
            album_name: musicaEscolhida.album,
        }
    })
        .then((e) => { DownloadLRC(e.data); })
        .catch((e) => {
        console.log(e);
    });
};
// (async () => {
//     try {
//         const outputDir = "output/";
//         // Verificar se o diretório existe; se não, criar
//         if (!fs.existsSync(outputDir)) {
//             fs.mkdirSync(outputDir, { recursive: true });
//             console.log(`Diretório criado: ${outputDir}`);
//         }
//         // Obter informações da faixa
//         const trackInfo: any = await SpottyDL.getTrack("https://open.spotify.com/track/5xvjnyg8FHPGRSkbAhjJh6");
//         // Sanitizar o nome do arquivo
//         const safeFileName = sanitizeFileName(`${trackInfo.title}.mp3`);
//         const outputPath = path.join(outputDir, safeFileName);
//         const absolutePath = path.resolve(outputPath); 
//         // Fazer o download da faixa
//         try {
//             const a = await SpottyDL.downloadTrack(trackInfo, outputPath).then( () => { 
//                 console.log(`Faixa salva em: ${absolutePath}`)}
//             ).catch((e) => {
//                 console.log(e)
//             })
//             console.log(a)
//         } catch (downloadError) {
//             console.error(`Erro ao baixar a faixa ${trackInfo.title}:`, downloadError);
//         }
//     } catch (error) {
//         console.error("Erro ao processar a faixa:", error);
//     }
// })();
