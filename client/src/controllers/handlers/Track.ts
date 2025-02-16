import { SpotifyApi } from "@spotify/web-api-ts-sdk";
import { MusicType } from "../../types/music";

const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;

const api = SpotifyApi.withClientCredentials(
    CLIENT_ID, CLIENT_SECRET
);

export const SearchTrack = async (SplittedLink : string[], idInit : number) : Promise<MusicType> => {
    const Track = await api.tracks.get(SplittedLink[2]);
    return ({
        id : idInit,
        name : Track.name,
        artist : Track.artists[0].name,
        album : Track.album.name,
        url : Track.external_urls.spotify,
        coverArt : Track.album.images[0].url,
        duration : Track.duration_ms,
        downloading : false,
        lyrics : false,
        music : false, 
        selected : true,
        year : Track.album.release_date.substring(0,4),
    });
}