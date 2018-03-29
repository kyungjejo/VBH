import React, { Component } from 'react';
import { Button, Icon } from 'semantic-ui-react';
import Canvas from './Canvas';
// import path from '../static/media/'

class VideoPlayer extends Component {

    componentDidMount() {
        let videoId = this.props.videoId;
        if (videoId !== "mainVideo"){
            let modalVideo = document.getElementById(videoId);
            modalVideo.currentTime = parseFloat(this.props.start);
        }
    }

    render() {
        const filepath = require('../static/media/' + this.props.filename);
        let videoId = this.props.videoId;
        let updateHistory = null;
        if (this.props.updateHistory) updateHistory = (() => this.props.updateHistory(videoId));
        return (
            <div>
                <div>
                    {(this.props.videoId === "mainVideo") &&
                        <Canvas onClickObjectHandler={this.props.onClickObjectHandler} width={this.props.width} height={this.props.height} dummyCoordinates={this.props.dummyCoordinates}/>
                    }
                    <video id={videoId} 
                            ref="vidRef" 
                            width={this.props.width} 
                            height={this.props.height} 
                            onTimeUpdate={() => this.props.updateTime(videoId)} 
                            style={{display:'block', margin:'auto'}}
                            autoPlay={this.props.autoplay}
                            onClick={() => this.props.videoHandler(videoId)}
                            updateHistory={() => this.props.updateHistory(videoId)}>
                        <source src={filepath} type="video/mp4" />
                    </video>
                </div>
                <div style={{width:'100%', textAlign:'center', margin: "10px"}}>
                    <Button basic icon labelPosition="left" onClick={() => document.getElementById(videoId).currentTime = document.getElementById(videoId).currentTime-10}>
                        <Icon name='step backward' />
                        -10 sec
                    </Button>
                    <Button basic icon labelPosition='left' onClick={() => this.props.videoHandler(videoId)}  style={{textTransform: "capitalize"}}>
                        <Icon name={this.props.status} />
                        {this.props.status}
                    </Button>
                    <Button basic icon labelPosition="right" onClick={() => document.getElementById(videoId).currentTime = document.getElementById(videoId).currentTime+10}>
                        <Icon name='step forward' />
                        +10 sec
                    </Button>
                </div>
            </div>
        )
    }
}

export default VideoPlayer;