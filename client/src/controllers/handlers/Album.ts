import { Page, SimplifiedTrack, SpotifyApi } from "@spotify/web-api-ts-sdk";
import { MusicType } from "../../types/music";

const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;

const api = SpotifyApi.withClientCredentials(
    CLIENT_ID, CLIENT_SECRET
);

// export const NextSongsOfPlaylist = async (url : string) : Promise<MusicType[]> => {
//     const SplittedLink : string[] = url.split('/');
//     const PlaylistItems = (((await api.albums.getPlaylistItems(SplittedLink[2], undefined, undefined, undefined, 100))));
//     console.log(PlaylistItems)
//     return mappingMusicArray(PlaylistItems);
// }

const mappingMusicArray = async (PlaylistItems: Page<SimplifiedTrack>, albumInfo : Partial<MusicType>, idInit : number ) : Promise<MusicType[]> => { 
    return PlaylistItems.items.map((item) => (
        {
            id : idInit++, 
            name: item.name,
            album: albumInfo.name,
            artist: item.artists[0].name,
            duration: item.duration_ms,
            url: item.external_urls.spotify,
            coverArt: albumInfo.coverArt ?? "",
            year: albumInfo.year,
            selected: true,
            downloading: false,
            lyrics: false,
            music: false,
        }));
}

const SearchAlbumInfo = async (id : string)  => {
    const AlbumInfo = ((await api.albums.get(id)));

    console.log(AlbumInfo);
    const res : Partial<MusicType> = {
        name: AlbumInfo.name,
        artist: AlbumInfo.artists[0].name,
        coverArt: AlbumInfo.images[0].url,
        url : AlbumInfo.external_urls.spotify,
        year : AlbumInfo.release_date.substring(0,4),
        total : AlbumInfo.total_tracks,
    }
    console.log(res)
    return res;
}
// : Promise<PlaylistTypeRes>
// 

type AlbumTypeRes = {
    playlistInfo: Partial<MusicType> ,
    tracks: MusicType[] 
} 
export const SearchAlbumHandler = async (SplittedLink : string[], idCounter : number)  : Promise<AlbumTypeRes>  => {
    const AlbumInfo = await SearchAlbumInfo(SplittedLink[2]);
    const AlbumItems = await mappingMusicArray(await api.albums.tracks(SplittedLink[2]), AlbumInfo, idCounter);
    console.log(AlbumItems)
    console.log("items:", AlbumItems)

    if (!AlbumInfo || !AlbumInfo) {
        throw "Album não encontrado";
    }
    return {playlistInfo : AlbumInfo, tracks: AlbumItems}
} 