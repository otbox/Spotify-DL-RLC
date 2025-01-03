var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import SpottyDL from 'spottydl';
import * as fs from 'node:fs';
import * as path from 'node:path';
import yts from 'yt-search';
import ytdl from 'ytdl-core';
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile } from '@ffmpeg/util';
// Função para obter o diretório escolhido pelo usuário
const getOutputDirectory = () => __awaiter(void 0, void 0, void 0, function* () {
    // Aqui você pode implementar um diálogo para o usuário escolher o diretório
    // Por exemplo, usando Electron ou input em um navegador.
    // Para este exemplo, vamos simular com uma entrada via prompt no Node.js
    const prompt = require('prompt-sync')();
    const outputDir = prompt('Digite o diretório onde deseja salvar os arquivos: ');
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
        console.log(`Diretório criado: ${outputDir}`);
    }
    return outputDir;
});
const DownloadMusicHandler = (Music) => __awaiter(void 0, void 0, void 0, function* () {
    const OutputPath = yield getOutputDirectory();
    try {
        const ffmpeg = new FFmpeg();
        yield ffmpeg.load();
        const music = (yield yts.search(Music.title + ' ' + Music.artist)).videos[0];
        const audioStream = ytdl(music.url, { quality: 'highestaudio' });
        const sanitizedTitle = Music.title.replace(/[<>:"/\\|?*\x00-\x1F]/g, '_');
        const outputFilePath = path.join(OutputPath, `${sanitizedTitle}.mp3`);
        // Baixar o stream de áudio
        const audioBuffer = yield new Promise((resolve, reject) => {
            const chunks = [];
            audioStream.on('data', (chunk) => chunks.push(chunk));
            audioStream.on('end', () => resolve(Buffer.concat(chunks)));
            audioStream.on('error', reject);
        });
        console.log('Stream de áudio baixado. Iniciando conversão...');
        // Escrever o áudio em um arquivo temporário dentro do FS do FFmpeg.wasm
        const inputFileName = 'audio.webm';
        ffmpeg.writeFile(inputFileName, yield fetchFile(audioBuffer));
        // Executar o FFmpeg para converter para MP3
        yield ffmpeg.exec(['-i', inputFileName, '-q:a', '0', '-map', 'a', 'output.mp3']);
        // Ler o arquivo convertido de volta
        const outputBuffer = ffmpeg.readFile('output.mp3');
        // Salvar o arquivo no sistema local
        fs.writeFileSync(outputFilePath, Buffer.from(outputBuffer));
        console.log(`Conversão concluída. Arquivo salvo como: ${outputFilePath}`);
    }
    catch (error) {
        console.error('Erro durante o processo:', error);
    }
});
const DownloaderHandler = () => __awaiter(void 0, void 0, void 0, function* () {
    const playlist = 'https://open.spotify.com/playlist/37i9dQZF1DX3KVUsNUmJc2';
    try {
        console.log('Obtendo playlist...');
        const results = yield SpottyDL.getPlaylist(playlist);
        const resultPlaylist = results;
        console.log('Iniciando download das músicas...');
        for (const track of resultPlaylist.tracks) {
            yield DownloadMusicHandler(track);
        }
    }
    catch (error) {
        console.error('Erro ao processar a playlist:', error);
    }
});
// Exemplo de execução ao clicar no botão
const Button = document.getElementById('changeTextButton');
Button === null || Button === void 0 ? void 0 : Button.addEventListener('click', () => {
    DownloaderHandler();
});
