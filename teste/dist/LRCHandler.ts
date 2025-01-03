import axios from "axios"
import * as fs from 'node:fs';
import * as path from 'node:path';

export type musicProps = {
    title: string,
    artist: string,
    year: string,
    album: string,
    id: string,
    albumCoverURL: string,
    trackNumber: number
}

export type FileDataProps = {
    name : string, 
    content : string,
}

export const GetLyrics = (musicaEscolhida: musicProps) : FileDataProps => {
    // SpottyDL.downloadTrack(musicaEscolhida, OutputPath).then((e)=> {
    //     console.log(e)
    // })
    let FileD : FileDataProps = { content: "", name : ""};
    axios.get(
        'https://lrclib.net/api/get?',
        {
            params:
            {
                track_name: musicaEscolhida.title,
                artist_name: musicaEscolhida.artist,
                album_name: musicaEscolhida.album,
            }
        })
        .then((e) => {() =>  {
            const LRCData = e.data; 
            const lyrics = LRCData.plainLyrics;
            const title = LRCData.trackName;
            FileD = { name : `${title}.lrc`, content : lyrics }  
        }})
        .catch((e) => {
            console.log(e)
        })
        return FileD;
}

// const DownloadLRC = (data: any) => {

//     console.log(data)
//     const lyrics = data.plainLyrics
//     const title = data.trackName
//     // const lyrics = data.plainLyrics

//     // if (!fs.existsSync(OutputPath)) {
//     //     fs.mkdirSync(OutputPath, { recursive: true });
//     //     console.log(`Diretório criado: ${OutputPath}`);
//     // }

//     const fileName = `${title}.lrc`;
//     const filePath = path.join(OutputPath, fileName);

//     // Salva o arquivo no sistema de arquivos
//     fs.writeFileSync(filePath, lyrics, 'utf-8');
//     console.log(`Arquivo .lrc salvo em: ${filePath}`);
// }