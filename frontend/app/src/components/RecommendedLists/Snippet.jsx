import React, { Component } from 'react';

class Snippet extends Component {
    constructor(props) {
        super(props);
        this.onClickHandler = this.onClickHandler.bind(this);
        this.onTimeUpdateHandler = this.onTimeUpdateHandler.bind(this);
        this.pauseHandler = this.pauseHandler.bind(this);
    }

    componentDidMount() {
        let vid = document.getElementById(this.props.id);
        vid.currentTime = this.props.start;
    }

    onClickHandler() {
        let vid = document.getElementById(this.props.id);
        vid.paused ? vid.play() : (vid.pause(), this.props.playingVideoManager(this.props.id));
    }

    onTimeUpdateHandler() {
        let vid = document.getElementById(this.props.id);
        if (vid.currentTime >= parseInt(this.props.end)) {
            vid.pause();
            vid.currentTime = this.props.start;
        }
        // if (vid.played.length !== 0) console.log("start",vid.played.start(0),"end",vid.played.end(0))
    }

    pauseHandler() {
        console.log("snippet paused");
        let vid = document.getElementById(this.props.id);
        vid.currentTime = this.props.start;
        this.props.pauseHandler('snippet',this.props.id,this.props.filepath)
    }

    render() {
        const filepath = this.props.filepath.includes(".mp4") ? this.props.filepath : this.props.filepath+".mp4";
        return (
            <video id={this.props.id}
                    mainid={this.props.mainId}
                    filename={this.props.filepath}
                    width={this.props.width}
                    height={this.props.height}
                    onClick={this.onClickHandler}
                    onTimeUpdate={this.onTimeUpdateHandler}
                    onPause={this.pauseHandler}
                    src={"https://s3.ap-northeast-2.amazonaws.com/kixlab-recipescape/video/"+filepath}
                    type="video/mp4">
            </video>
        )
    }
}

export default Snippet;