
import { musicProps, GetLyrics } from './LRCHandler';
// import {getData, getPreview, getTracks, getDetails} from 'spotify-url-info'

// import  SpotifyUrlInfo  from "spotify-url-info";
// import fetch from "node-fetch";
// const { getData } = await require('spotify-url-info')(fetch);
import { ItemTypes, SpotifyApi } from '@spotify/web-api-ts-sdk';

// const sdk = SpotifyApi.withClientCredentials("client-id", "secret", ["scope1", "scope2"]);
const api = SpotifyApi.withClientCredentials(
    "da08e75d968a4e1caac5082f51af9ba4",
    "6a7056629a204081ac1c58439b4903e6"
);



export const SearchHandle = async (link : string) => {
    const SplittedLink : string[] = link.split('/');
    const TypeOfSearch : ItemTypes = SplittedLink[1] as ItemTypes;
    
    const PlaylistItems = await api.playlists.getPlaylistItems(SplittedLink[2]);
    // const items = await api.search(SplittedLink[2], [TypeOfSearch]);
    // console.log(link)
    // console.log(link.split('/'))
    // SplittedLink.map((a) => {
    //     console.log(a);
    // })
    console.log(PlaylistItems.items.map((item) => ({
        name: item.track.name,
        // popularity: item.popularity,
    })));

//     try {
//         spdl.getInfo(link);
//     } catch (error) {
//     }
//     // await SpottyDL.getPlaylist(link)
//     //     .then(async (results) => { // Returns a <Track>
//     //         const resultPlaylist: Playlist = (results) as Playlist
//     //         resultPlaylist.tracks.map((element: musicProps) => {
//     //             // DownloadMusicHandler(element);
//     //             // GetLyrics(element);
//     //             console.log(element)
//     //             // console.log(GetLyrics(element))
//     //         });
//     //     });
//     // // const music : musicProps;
  }