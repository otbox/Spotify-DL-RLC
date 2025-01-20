
# Spotify Music Donwloader with Lyrics 




## Run Locally

Clone the project

```bash
  git clone https://link-to-project
```

Go to the project directory

```bash
  cd my-project
```

1. #### Install the node modules 

    On client directory run
    ```bash
    yarn 
    ```
    On server directory run
    ```bash
    npm install
    ```
2. #### Run the client and server
    On client run 
    ```bash
    yarn dev
    ```
    create a new terminal, acccess server on server run 
    ```bash
    node index.js
    ```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`VITE_SPOTIFY_CLIENT_ID`

`VITE_SPOTIFY_CLIENT_SECRET`


## Tech Stack

**Client:** Vite, Preact, Axios, Spotify-API

**Server:** Node, Express, Yt-dlp-exec, yt-search, Axios, MP3-Tag 

