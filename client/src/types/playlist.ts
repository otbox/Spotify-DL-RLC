import { MusicType } from "./music"

export type PlaylistInfoType = {
    name : string,
    artist : string,
    coverArt : string,
    total? : number,
}

export type PlaylistTypeRes = {
    playlistInfo: PlaylistInfoType,
    tracks: MusicType[] | any
} 