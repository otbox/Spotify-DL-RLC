import { SpotifyApi } from "@spotify/web-api-ts-sdk";

const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;

const api = SpotifyApi.withClientCredentials(
    CLIENT_ID, CLIENT_SECRET
);