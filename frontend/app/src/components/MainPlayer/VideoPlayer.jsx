import React, { Component } from 'react';

class VideoPlayer extends Component {
    constructor(props) {
        super(props);
        this.timeUpdate = this.timeUpdate.bind(this);
        
    }

    timeUpdate() {
        let vid = document.getElementById(this.props.id);
        let cTime = vid.currentTime;
        let p = cTime/vid.duration*100;
        this.props.getCurrentTime(cTime,p);
    }

    render() {
        // const filepath = require('video/' + this.props.filepath);
        const src = "https://s3.ap-northeast-2.amazonaws.com/kixlab-recipescape/video/"+this.props.filepath.split(" ").join("+");
        return (
            <video id={this.props.id}
                    width={this.props.width}
                    height={this.props.height}
                    onTimeUpdate={this.timeUpdate}
                    src={src}
                    type="video/mp4"
                    onPause={() => this.props.pauseHandler("mainPlayer",this.props.filepath)}
                    autoPlay>
            </video>
        )
    }
}

export default VideoPlayer;