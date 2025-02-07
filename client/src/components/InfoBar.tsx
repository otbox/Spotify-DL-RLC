import { Component } from "preact";
import { Dispatch, StateUpdater } from "preact/hooks";
import { MusicType } from "../types/music";

interface infoBarProps {
    numberOfMusic: number,
    image_cover : string,
    name: string,
    setSearchedData : Dispatch<StateUpdater<MusicType[] | undefined>>,
    setSearchedInfo : Dispatch<StateUpdater<any>>,
    moreMusic : () => void 
}

export class InfoBar extends Component<infoBarProps> {

    constructor(props : infoBarProps) {
      super(props);
    }
  
    render() {
      const { numberOfMusic, image_cover, name, setSearchedData, setSearchedInfo, moreMusic } = this.props;
      return (
        <div className={"SelectionBarContainer"} style={{marginTop: "1vw", paddingRight: "5vw"}}>
            <div className="InfoHeader">
              <div>
                <p>Number of Music found : {numberOfMusic}</p>
              </div>
              <div>
                <button onClick={() => {setSearchedData([]); setSearchedInfo(undefined)}}>Clear</button>
                <button onClick={() => moreMusic()}>Next Songs</button>
              </div>
            </div>
              <div className="Info">
              <img src={image_cover} alt="" width={"100px"} height={"100px"}/>
              <h3>Info: {name}</h3>
            </div>
          </div>
      )
    }
  }
  