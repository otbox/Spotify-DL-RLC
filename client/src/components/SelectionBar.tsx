import { Attributes, Component, ComponentChildren, Ref } from "preact";
import { MusicDuration, MusicType } from "../types/music";
import './style.css'

interface ExpandableProps {
    Music : MusicType
    onToggle : (e : any) => void,
    index : number,
}

interface ExpandableState { 
    selected : boolean,
    downloaded : boolean,
}

export class SelectionBar extends Component<ExpandableProps , ExpandableState> {
    
    constructor ( props : ExpandableProps ) {
        super(props);

        this.state = {
            selected : true,
            downloaded : false,
        }
    }

    render(props?: Readonly<Attributes & { children?: ComponentChildren; ref?: Ref<any> | undefined; }> | undefined, state?: Readonly<{}> | undefined, context?: any): ComponentChildren {
        const { Music , index, onToggle } = this.props
        const { album, artist, coverArt, duration, name} = Music
        const { selected } = this.state
        
        const Duration: MusicDuration = {
            hour: Math.floor(duration / (1000 * 60 * 60)),
            minutes: Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60)),
            seconds: Math.floor((duration % (1000 * 60)) / 1000)
        }

        // this.setState({selected : e.target.checked})
        return (
            <>
                <div className="SelectionBarContainer">
                    <p>{index}</p>
                    <input type="checkbox" name="Selected" value={"selected"} checked={selected} onChange={(e : any) => {this.setState({selected: e.target.checked}),onToggle({index, selected : e.target.checked})}}/>
                    <div className="MusicDetails">
                        <img src={coverArt} alt="" width={"50px"} height={"50px"} />
                        <p>{name}</p>
                        <p>{album}</p>
                        <p>{artist}</p>
                    </div>
                    <p>{Duration.hour ? Duration.hour + ":" : ""}{Duration.minutes}:{String(Duration.seconds).padStart(2, '0')}</p>
                </div>
            </>
        )
    }
}