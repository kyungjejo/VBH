import React, { Component } from 'react';

class VideoPlayer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            t: this.props.t > 0 ? this.props.t : 0,
        }
        this.timeUpdate = this.timeUpdate.bind(this);
    }

    componentDidUpdate() {
        this.state.t !== this.props.t ? this.setState(({t: this.props.t})) : null;
    }

    timeUpdate() {
        let vid = document.getElementById(this.props.id);
        let cTime = vid.currentTime;
        let p = cTime/vid.duration*100;
        this.props.getCurrentTime(cTime,p);
    }

    render() {
        const src = this.props.filepath ? "https://s3.ap-northeast-2.amazonaws.com/kixlab-recipescape/video/"+this.props.filepath : null
        return (
            <div id='videoWrapper' style={{width:'646px',height:'366px', padding:'3px'}}>
                <video id={this.props.id}
                        width={this.props.width}
                        height={this.props.height}
                        onTimeUpdate={this.timeUpdate}
                        src={src+"#t="+this.state.t}
                        mainid={this.props.mainId}
                        type="video/mp4"
                        onPause={() => this.props.pauseHandler('main',"mainPlayer",this.props.filepath)}
                        autoPlay>
                </video>
            </div>
        )
    }
}

export default VideoPlayer;