import { Attributes, Component, ComponentChildren, Ref } from "preact";
import { MusicDuration, MusicType } from "../types/music";
import './style.css'
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

interface ExpandableProps {
    Music : MusicType
    onToggle : (e : any) => void,
    index : number,
}

interface ExpandableState { 
    selected : boolean,
}

export class SelectionBar extends Component<ExpandableProps , ExpandableState> {
    
    constructor ( props : ExpandableProps ) {
        super(props);

        this.state = {
            selected : true,
        }
    }

    render(_props?: Readonly<Attributes & { children?: ComponentChildren; ref?: Ref<any> | undefined; }> | undefined, _state?: Readonly<{}> | undefined, _context?: any): ComponentChildren {
        const { Music , index, onToggle} = this.props
        const { album, artist, coverArt, duration, name, selected,downloading,lyrics,music,url,year} = Music
        // const { selected } = this.state
        
        const Duration: MusicDuration = {
            hour: Math.floor(duration / (1000 * 60 * 60)),
            minutes: Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60)),
            seconds: Math.floor((duration % (1000 * 60)) / 1000)
        }

        return (
            <>
                <div className="SelectionBarContainer">
                    <p>{index}</p>
                    <input type="checkbox" name="Selected" value={"selected"} checked={selected} onChange={(e : any) => {this.setState({selected: e.target.checked}),onToggle({index, selected : e.target.checked})}}/>
                    <div className="MusicDetails">
                        <a href={url} target={"_blank"}><img src={coverArt} alt="" width={"50px"} height={"50px"} /></a>
                        <p>{name}</p>
                        <p>{album} ({year})</p>
                        <p>{artist}</p>
                    </div>
                    <p>{Duration.hour ? Duration.hour + ":" : ""}{Duration.minutes}:{String(Duration.seconds).padStart(2, '0')}</p>
                    {/* <iframe src="https://lottie.host/embed/ab71f12c-fc2d-49ea-9c70-e9525681a971/VknaSxE49H.lottie"/>
                    //  */}

                    {downloading && <DotLottieReact
                        src="https://lottie.host/ab71f12c-fc2d-49ea-9c70-e9525681a971/VknaSxE49H.lottie" // Ampulheta
                        loop
                        autoplay
                        className={"dollitle"}
                        />
                        }
                    {music && <DotLottieReact
                        src="https://lottie.host/c135baf5-d513-4c7b-8427-55a375d0eef5/1KsX7C4dIi.lottie" // Music 
                        autoplay
                        className={"dollitle"}
                        />
                    }
                    {lyrics && <DotLottieReact
                        src="https://lottie.host/b556a89c-c996-44cb-bcd1-44beabf1dc21/SRPaKNqNoS.lottie" // Letter 
                        autoplay
                        className={"dollitle"}
                        />
                    }
                    {lyrics === "failed" && <DotLottieReact
                        src="https://lottie.host/00c72a77-4f12-4cb1-aa62-b29673b1c34f/MT0Vt3fNws.lottie" // Letter 
                        autoplay
                        className={"dollitle"}
                        />
                    }
                    {music === "failed" && <DotLottieReact
                        src="https://lottie.host/00c72a77-4f12-4cb1-aa62-b29673b1c34f/MT0Vt3fNws.lottie" // Letter 
                        autoplay
                        className={"dollitle"}
                        />
                    }
                </div>
            </>
        )
    }
}