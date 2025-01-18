// import axios from 'axios';
// import SpottyDL, { Playlist } from 'spottydl'
// import * as fs from 'node:fs';
// import * as path from 'node:path';
// import yts from 'yt-search';
// import ytdl from 'ytdl-core'
// import { FFmpeg } from '@ffmpeg/ffmpeg';
// import { fetchFile } from '@ffmpeg/util';




// type musicProps = {
//     title: string,
//     artist: string,
//     year: string,
//     album: string,
//     id: string,
//     albumCoverURL: string,
//     trackNumber: number
// }


// // let musicaEscolhida : musicProps;
// // (async() => {
// //     await SpottyDL.getTrack("https://open.spotify.com/track/5WDLRQ3VCdVrKw0njWe5E5")
// //         .then(results  => { // Returns a <Track>
// //             const resultMusic : musicProps = (results) as musicProps
// //             console.log(resultMusic)
// //             GetLyrics(resultMusic);
// //         });
// // })();


// const Button = document.getElementById("changeTextButton") as  HTMLInputElement

// const playlist = "https://open.spotify.com/playlist/37i9dQZF1DX3KVUsNUmJc2";

// Button?.addEventListener('click', () => {DownloaderHandler()});

// const DownloaderHandler = async () => {
//     console.log("TEste");
//     await SpottyDL.getPlaylist(playlist)
//         .then(async (results) => { // Returns a <Track>
//             const resultPlaylist: Playlist = (results) as Playlist
//             resultPlaylist.tracks.map((element: musicProps) => {
//                 DownloadMusicHandler(element);
//                 // GetLyrics(element);

//                 console.log(element)
//             });
//         });
// }

// const OutputPath = "./lyrics";




// const DownloadMusicHandler = async (Music: musicProps) => {
//     try {
//         const ffmpeg = new FFmpeg();
//         await ffmpeg.load();
//         const music = (await yts.search(Music.title + Music.artist)).videos[0]
//         const audioStream = ytdl(music.url, { quality: 'highestaudio' });

//         const sanitizedTitle = Music.title.replace(/[<>:"/\\|?*\x00-\x1F]/g, '_');
//         const outputFilePath = path.join(__dirname, `${sanitizedTitle}.mp3`);
//         // Baixar o stream de áudio
//         const audioBuffer : any = await new Promise((resolve, reject) => {
//             const chunks: any = [];
//             const audioStream = ytdl(music.url, { quality: 'highestaudio' });

//             audioStream.on('data', (chunk) => chunks.push(chunk));
//             audioStream.on('end', () => resolve(Buffer.concat(chunks)));
//             audioStream.on('error', reject);
//         });
//         console.log('Stream de áudio baixado. Iniciando conversão...');

//         // Escrever o áudio em um arquivo temporário dentro do FS do FFmpeg.wasm
//         const inputFileName = 'audio.webm'; // Nome temporário no sistema virtual
//         ffmpeg.writeFile(inputFileName, await fetchFile(audioBuffer));

//         // Executar o FFmpeg para converter para MP3
//         await ffmpeg.exec(['-i', inputFileName, '-q:a', '0', '-map', 'a', 'output.mp3']); // Conversão de áudio

//         // Ler o arquivo convertido de volta
//         const outputBuffer : any = ffmpeg.readFile('output.mp3');

//         // Salvar o arquivo no sistema local
//         // fs.writeFileSync(path.join(__dirname, outputFilePath), Buffer.from(outputBuffer));

//         console.log(`Conversão concluída. Arquivo salvo como: ${outputFilePath}`);
//     } catch (error) {
//         console.error('Erro durante o processo:', error);
//     }
// }

// const DownloadLRC = (data: any) => {
//     console.log(data)
//     const lyrics = data.plainLyrics
//     const title = data.trackName
//     // const lyrics = data.plainLyrics

//     if (!fs.existsSync(OutputPath)) {
//         fs.mkdirSync(OutputPath, { recursive: true });
//         console.log(`Diretório criado: ${OutputPath}`);
//     }

//     const fileName = `${title}.lrc`;
//     const filePath = path.join(OutputPath, fileName);

//     // Salva o arquivo no sistema de arquivos
//     fs.writeFileSync(filePath, lyrics, 'utf-8');
//     console.log(`Arquivo .lrc salvo em: ${filePath}`);
// }

// const GetLyrics = (musicaEscolhida: musicProps) => {
//     // SpottyDL.downloadTrack(musicaEscolhida, OutputPath).then((e)=> {
//     //     console.log(e)
//     // })
//     axios.get(
//         'https://lrclib.net/api/get?',
//         {
//             params:
//             {
//                 track_name: musicaEscolhida.title,
//                 artist_name: musicaEscolhida.artist,
//                 album_name: musicaEscolhida.album,
//             }
//         })
//         .then((e) => { DownloadLRC(e.data) })
//         .catch((e) => {
//             console.log(e)
//         })
// }

// // (async () => {
// //     try {
// //         const outputDir = "output/";

// //         // Verificar se o diretório existe; se não, criar
// //         if (!fs.existsSync(outputDir)) {
// //             fs.mkdirSync(outputDir, { recursive: true });
// //             console.log(`Diretório criado: ${outputDir}`);
// //         }

// //         // Obter informações da faixa
// //         const trackInfo: any = await SpottyDL.getTrack("https://open.spotify.com/track/5xvjnyg8FHPGRSkbAhjJh6");

// //         // Sanitizar o nome do arquivo
// //         const safeFileName = sanitizeFileName(`${trackInfo.title}.mp3`);
// //         const outputPath = path.join(outputDir, safeFileName);
// //         const absolutePath = path.resolve(outputPath); 
// //         // Fazer o download da faixa
// //         try {
// //             const a = await SpottyDL.downloadTrack(trackInfo, outputPath).then( () => { 
// //                 console.log(`Faixa salva em: ${absolutePath}`)}
// //             ).catch((e) => {
// //                 console.log(e)
// //             })
// //             console.log(a)
// //         } catch (downloadError) {
// //             console.error(`Erro ao baixar a faixa ${trackInfo.title}:`, downloadError);
// //         }
// //     } catch (error) {
// //         console.error("Erro ao processar a faixa:", error);
// //     }
// // })();