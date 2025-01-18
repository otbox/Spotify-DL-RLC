
import { MusicType } from '../types/music';
import { ItemTypes, SpotifyApi } from '@spotify/web-api-ts-sdk';

// const sdk = SpotifyApi.withClientCredentials("client-id", "secret", ["scope1", "scope2"]);
const api = SpotifyApi.withClientCredentials(
    "da08e75d968a4e1caac5082f51af9ba4",
    "6a7056629a204081ac1c58439b4903e6"
);

type SearchResultType = {

}


const SearchPlaylistItems = async (SplittedLink : string[]) : Promise<MusicType[]> => {
    const PlaylistItems = await api.playlists.getPlaylistItems(SplittedLink[2]);

    return PlaylistItems.items.map((item, index) => (
        {
            name: item.track.name,
            album: item.track.album.name,
            artist: item.track.artists[0].name,
            duration: item.track.duration_ms,
            url: item.track.external_urls.spotify,
            coverArt: item.track.album.images[0].url,
            year: item.track.album.release_date.substring(0,4),
        }));
} 

export const SearchHandle = async (link : string) : Promise<MusicType[] | any[] | undefined> => {
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
            return(SearchPlaylistItems(SplittedLink))
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


