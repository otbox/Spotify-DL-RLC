export type MusicType = {
    id : number,
    name : string, 
    duration  : number,
    artist : string, 
    album : string
    coverArt : string,
    url : string,
    year? : number | string,
    selected? : boolean,
    downloading : boolean | "failed",
    lyrics : boolean | "failed",
    music : boolean | "failed"
}

export type MusicDuration = {
    hour : Number,
    minutes : Number,
    seconds : Number
}