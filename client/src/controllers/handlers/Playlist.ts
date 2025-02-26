import { Page, PlaylistedTrack, SpotifyApi, Track } from "@spotify/web-api-ts-sdk";
import { PlaylistInfoType, PlaylistTypeRes } from "../../types/playlist";
import { MusicType } from "../../types/music";

const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;

const api = SpotifyApi.withClientCredentials(
    CLIENT_ID, CLIENT_SECRET
);

const mappingMusicArray = async (PlaylistItems : Page<PlaylistedTrack<Track>>, idInit : number) : Promise<MusicType[]> => { 
    return PlaylistItems.items.map((item) => (
        {
            id : idInit++, 
            name: item.track.name,
            album: item.track.album.name,
            artist: item.track.artists[0].name,
            duration: item.track.duration_ms,
            url: item.track.external_urls.spotify,
            coverArt: item.track.album.images[0].url,
            year: item.track.album.release_date.substring(0,4),
            selected: true,
            downloading: false,
            lyrics: false,
            music: false,
        }));
}


export const NextSongsOfPlaylist = async (url : string, idCounter : number) : Promise<MusicType[]> => {
    const SplittedLink : string[] = url.split('/');
    const PlaylistItems = (((await api.playlists.getPlaylistItems(SplittedLink[2], undefined, undefined, undefined, 100))));
    console.log(PlaylistItems)
    return mappingMusicArray(PlaylistItems, idCounter);
}

const SearchPlaylistInfo = async (id : string, total : number)  => {
    const PlaylistInfo = ((await api.playlists.getPlaylist(id)));

    console.log(PlaylistInfo);
    const res : PlaylistInfoType = {
        name: PlaylistInfo.name,
        artist: PlaylistInfo.owner.display_name,
        coverArt: PlaylistInfo.images[0].url,
        total: total
    }
    return res;
}

export const SearchPlaylistHandler = async (SplittedLink : string[], idCounter : number) : Promise<PlaylistTypeRes> => {
    const PlaylistItems = await mappingMusicArray(await api.playlists.getPlaylistItems(SplittedLink[2]), idCounter);
    const PlaylistInfo = await SearchPlaylistInfo(SplittedLink[2], PlaylistItems.length);
    if (!PlaylistInfo || !PlaylistItems) {
        throw "Playlist não encontrado";
    }

    return {playlistInfo : PlaylistInfo, tracks: PlaylistItems}
} 
