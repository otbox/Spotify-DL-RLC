// import axios from "axios";

// const SPOTIFY_BASE_URL = "https://api.spotify.com/v1";
// const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
// const CLIENT_SECRET = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;



// const getAccessToken = async () => {
//     console.log(CLIENT_ID)
//     console.log(CLIENT_SECRET)
//   const response = await axios.post(
//     "https://accounts.spotify.com/api/token",
//     new URLSearchParams({ grant_type: "client_credentials" }),
//     {
//       headers: {
//         Authorization: `Basic ${btoa(`${CLIENT_ID}:${CLIENT_SECRET}`)}`,
//         "Content-Type": "application/x-www-form-urlencoded",
//       },
//     }
//   );
//   console.log("Token:", response.data.access_token);
//   return response.data.access_token;
// };

// export const fetchSpotifyData = async (url: string) => {
//   const token = await getAccessToken();
//   const url1 = `${SPOTIFY_BASE_URL}${url}`
//   console.log(url1)
//   const response = await axios.get(`${SPOTIFY_BASE_URL}${url}/tracks`, {
//     headers: { Authorization: `Bearer ${token}` },
//   });
//   return response.data;
// };
