import { MusicType } from "./music"

export type PlaylistInfoType = {
    name : string,
    artist : string,
    image_cover : string
}

export type PlaylistTypeRes = {
    playlistInfo: PlaylistInfoType,
    tracks: MusicType[] | any
} 