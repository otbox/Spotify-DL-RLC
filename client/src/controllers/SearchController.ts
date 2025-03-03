
import { Dispatch, StateUpdater } from 'preact/hooks';
import { MusicType } from '../types/music';
import { ItemTypes } from '@spotify/web-api-ts-sdk';
import { NextSongsOfPlaylist, SearchPlaylistHandler } from './handlers/Playlist';
import { SearchAlbumHandler } from './handlers/Album';
import { SearchTrack } from './handlers/Track';

// https://open.spotify.com/playlist/6WNmeutRfJLFVXtuG2ObK7


type SearchHandleType = {
    link: string,
    setSearchedData: Dispatch<StateUpdater<MusicType[] | undefined>>,
    setSearchedInfo: Dispatch<StateUpdater<any>>,
}

let idCounter = 0;

export const NextSongsHandler = async (link: string): Promise<MusicType[] | undefined> => {
    const SplittedLink: string[] = link.split('/');
    const TypeOfSearch: ItemTypes = SplittedLink[1] as ItemTypes;
    switch (TypeOfSearch) {
        case 'playlist':
            const res = await NextSongsOfPlaylist(link, idCounter);
            idCounter += res.length;
            return res;
            break;
        case 'album':
            console.log("Album")
            break;
        // const resA = await NextSongsOfPlaylist(link, idCounter);
        // idCounter += resA.length;
        // const res1 = await SearchAlbumHandler(SplittedLink, id
        default:
            return undefined;
            break;
    }

}

export const SearchHandle = async ({ link, setSearchedData, setSearchedInfo }: SearchHandleType) => {
    const SplittedLink: string[] = link.split('/');
    const TypeOfSearch: ItemTypes = SplittedLink[1] as ItemTypes;
    try {
        switch (TypeOfSearch) {
            case 'artist':
                console.log('artist')
                break;
            case 'album':
                const res1 = await SearchAlbumHandler(SplittedLink, idCounter);
                setSearchedData(prevData => [...(prevData ?? []), ...res1.tracks]);
                setSearchedInfo(res1.playlistInfo)
                idCounter += res1.tracks.length;
                // console.log("Album")
                break;
            case 'playlist':
                const res = await SearchPlaylistHandler(SplittedLink, idCounter);
                setSearchedData(prevData => [...(prevData ?? []), ...res.tracks]);
                setSearchedInfo(res.playlistInfo)
                idCounter += res.tracks.length;
                break;
            case 'track':
                const res2 = await SearchTrack(SplittedLink, idCounter);
                if (res2) {
                    setSearchedData(prevData => [...(prevData ?? []), res2]);
                    idCounter++;
                }
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
    } catch (error : any) {
        setSearchedInfo("erro")
        if (error.message.includes("404")) {
            setSearchedInfo("404");
        }
    }
}


