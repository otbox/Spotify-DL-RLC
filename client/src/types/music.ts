export type MusicType = {
    name : string, 
    duration  : number,
    artist : string, 
    album : string
    coverArt : string,
    url : string,
    year? : number | string
    selected? : boolean
}

export type MusicDuration = {
    hour : Number,
    minutes : Number,
    seconds : Number
}