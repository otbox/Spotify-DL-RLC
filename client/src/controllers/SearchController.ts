
import { Dispatch, StateUpdater } from 'preact/hooks';
import { MusicType } from '../types/music';
import { ItemTypes, Page, PlaylistedTrack, SpotifyApi, Track } from '@spotify/web-api-ts-sdk';
import { PlaylistInfoType, PlaylistTypeRes } from '../types/playlist';


const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;

const api = SpotifyApi.withClientCredentials(
    CLIENT_ID, CLIENT_SECRET
);

// https://open.spotify.com/playlist/6WNmeutRfJLFVXtuG2ObK7

const mappingMusicArray = async (PlaylistItems : Page<PlaylistedTrack<Track>>) : Promise<MusicType[]> => { 
    return PlaylistItems.items.map((item, index) => (
        {
            id : index, 
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
            music: false
        }));
}

export const NextSongsOfPlaylist = async (url : string) : Promise<MusicType[]> => {
    const SplittedLink : string[] = url.split('/');
    const PlaylistItems = (((await api.playlists.getPlaylistItems(SplittedLink[2], undefined, undefined, undefined, 100))));
    console.log(PlaylistItems)
    return mappingMusicArray(PlaylistItems);
}

const SearchPlaylistInfo = async (id : string)  => {
    const PlaylistInfo = ((await api.playlists.getPlaylist(id)));

    console.log(PlaylistInfo);
    const res : PlaylistInfoType = {
        name: PlaylistInfo.name,
        artist: PlaylistInfo.owner.display_name,
        image_cover: PlaylistInfo.images[0].url,
    }
    return res;
}

const SearchPlaylistHandler = async (SplittedLink : string[]) : Promise<PlaylistTypeRes> => {
    const PlaylistItems = await mappingMusicArray(await api.playlists.getPlaylistItems(SplittedLink[2]))
    console.log(PlaylistItems)
    const PlaylistInfo = await SearchPlaylistInfo(SplittedLink[2]);
    return {playlistInfo : PlaylistInfo, tracks: PlaylistItems}
} 

type SearchHandleType = {
    link : string,
    setSearchedData : Dispatch<StateUpdater<MusicType[] | undefined>>,
    setSearchedInfo : Dispatch<StateUpdater<any>>,
} 

export const SearchHandle = async ({link, setSearchedData, setSearchedInfo} : SearchHandleType) => {
    const SplittedLink : string[] = link.split('/');
    const TypeOfSearch : ItemTypes = SplittedLink[1] as ItemTypes;
    switch (TypeOfSearch) {
        case 'artist':
            console.log('artist')
            break;
        case 'album':
            console.log('album')
            break;
        case 'playlist':
            const res = await SearchPlaylistHandler(SplittedLink);
            setSearchedData(prevData => [...(prevData ?? []), ...res.tracks]); 
            setSearchedInfo(res.playlistInfo) 
            break;
        case 'track':
            console.log()
            break;
        case 'show':
            console.log()
            break;
        case 'episode':
            console.log()
            break;
        case 'audiobook':
            console.log()
            break;
        default: 
            // return undefined;
            break;
    }     
}


