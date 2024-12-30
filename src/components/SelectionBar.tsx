import { Attributes, Component, ComponentChildren, Ref } from "preact";

interface ExpandableProps {
    name : string, 
    time : string,
    autor : string, 
    album : string
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
        return (
            <>
                <div className="teste">
                    <input type="checkbox" name="toDownload" value={"toDownload"}/>
                </div>
            </>
        )
    }
}