import { MusicType } from "./music"

export type DlOptions = {
    lyrics : boolean,
    maxSearchMusic : number,
    numberOfMusicstoDl? : number
}

export type DownLoadListType = { 
    MusicList : MusicType[],
    selected : boolean,
}