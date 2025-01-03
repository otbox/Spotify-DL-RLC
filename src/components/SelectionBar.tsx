import { Attributes, Component, ComponentChildren, Ref } from "preact";
import { MusicType } from "../types/music";
import './style.css'

interface ExpandableProps extends MusicType {
    
}

interface ExpandableState { 
    selected : boolean,
    downloaded : boolean,
}

export class SelectionBar extends Component<ExpandableProps , ExpandableState> {
    
    constructor ( props : ExpandableProps ) {
        super(props);

        this.state = {
            selected : false,
            downloaded : false,
        }
    }

    componentDidMount(): void {
        
    }

    render(props?: Readonly<Attributes & { children?: ComponentChildren; ref?: Ref<any> | undefined; }> | undefined, state?: Readonly<{}> | undefined, context?: any): ComponentChildren {
        const { album , autor , name , time } = this.props
        return (
            <>
                <div className="SelectionBarContainer">
                    <input type="checkbox" name="Selected" value={"Selected"}/>
                    <p>{name}</p>
                    <p>{album}</p>
                    <p>{autor}</p>
                    <p>{time}</p>
                </div>
            </>
        )
    }
}