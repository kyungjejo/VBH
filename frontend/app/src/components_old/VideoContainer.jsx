import VideoPlayer from './VideoPlayer';
import ProgressBar from './ProgressBar';
import React, { Component } from 'react';


class VideoContainer extends Component {

    render() {
        return (
            <div style={{width: '640px', margin: 'auto'}}>
                <VideoPlayer videoId="mainVideo" onClickObjectHandler={this.props.onClickObjectHandler} width="640" height="360" filename="video3.mp4" dummyCoordinates={this.props.dummyCoordinates} videoHandler={this.props.videoHandler} updateTime={this.props.updateTime} status={this.props.status}/>
                <ProgressBar id="equationBar" width="640" height="8" dummySimVideos={this.props.dummySimVideos} simVideoHandler={this.props.simVideoHandler}/>
                <ProgressBar currentPercentage={this.props.currentPercentage} id="progressBar" width="640" color="rgba(200,200,200,0.5)" height="16" />
            </div>
        )
    }
}

export default VideoContainer;