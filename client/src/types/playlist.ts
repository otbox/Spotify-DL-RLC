import { MusicType } from "./music"

export type PlaylistInfoType = {
    name : string,
    artist : string,
    coverArt : string
}

export type PlaylistTypeRes = {
    playlistInfo: PlaylistInfoType,
    tracks: MusicType[] | any
} 