import React, { Component } from 'react';
import { Popup } from 'semantic-ui-react'
class MainProgressBar extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        const duration = document.getElementById("mainPlayer") ? document.getElementById("mainPlayer").duration : 1;
        return (
            <div id="progressBar">
                {this.props.highlights && this.props.highlights.map((x,index) => 
                    <Popup
                        key={index}
                        trigger={
                            <div className="highlight" 
                                key={index} 
                                style={{width: '3px', height: '100%', 'left': (parseFloat(x)/duration)*100+"%"}}
                                onClick={() => document.getElementById("mainPlayer").currentTime = parseFloat(x)}>
                            </div>}
                        position='top center'
                    >
                    <Popup.Content><b>{this.props.highlightItem.charAt(0).toUpperCase()+this.props.highlightItem.slice(1)}</b> also appears here.</Popup.Content>
                    </Popup>
                )}
                <div id="time" style={{width: this.props.currentPercentage}}></div>
            </div>
        )
    }
}

export default MainProgressBar;