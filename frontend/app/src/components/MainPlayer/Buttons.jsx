import React, { Component } from 'react';
import {Button, Icon} from 'semantic-ui-react';

class Buttons extends Component {
    render() {
        let vid = document.getElementById("mainPlayer");
        return (
            <div>
                {vid &&
                <div id="buttons">               
                    <Button basic icon labelPosition="left" onClick={() => vid.currentTime = vid.currentTime-10}>
                        <Icon name='step backward' />
                        -10 sec
                    </Button>
                    <Button basic icon labelPosition='left' onClick={() => (vid.paused ? vid.play() : (vid.pause(), this.props.playingVideoManager('mainPlayer')))}>
                        <Icon name={vid.paused ? "play" : "pause"} />
                        {vid.paused ? "Play" : "Pause"}
                    </Button>
                    <Button basic icon labelPosition="right" onClick={() => vid.currentTime = vid.currentTime+10}>
                        <Icon name='step forward' />
                        +10 sec
                    </Button>
                </div>
                }
            </div>
        )
    }
}

export default Buttons;