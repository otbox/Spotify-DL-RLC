
# Spotify Music Donwloader with Lyrics 


## Run Locally

Clone the project

```bash
  git clone https://github.com/otbox/Spotify-DL-RLC.git
```

Go to the project directory

```bash
  cd Spotify-DL-RLC
```

### Docker Way

  ```bash
    docker compose up
  ```

  Then, access the client by the link provided by terminal or bash.

  ### Or, you can run the client and server separately.

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

To run this project, you will need to add the following environment variables to your .env file get your credentials in https://developer.spotify.com/documentation/web-api and add them to your.env file.

`VITE_SPOTIFY_CLIENT_ID`

`VITE_SPOTIFY_CLIENT_SECRET`


## Tech Stack

**Other Techs:** Docker, Docker-Compose

**Client:** Vite, Preact, Axios, Spotify-API

**Server:** Node, Express, Yt-dlp-exec, yt-search, Axios, MP3-Tag 

