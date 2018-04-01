import React, { Component } from 'react';
import VideoPlayer from './VideoPlayer';
import MainProgressBar from './MainProgressBar';
import EquationBar from './EquationBar';
import Buttons from './Buttons';
import Canvas from './Canvas';
import Konva from 'konva';

import {Header} from 'semantic-ui-react';

import './index.css';

class MainPlayer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPercentage: 0,
            currentTime: 0,
        }
        this.getCurrentTime = this.getCurrentTime.bind(this);
        this.isPlaying = this.isPlaying.bind(this);
        this.equations = [{width:"10%",color:Konva.Util.getRandomColor()},
        {width:"80%",color:Konva.Util.getRandomColor()},
        {width:"10%",color:Konva.Util.getRandomColor()},
        ]
    }

    getCurrentTime(cT,cP) {
        this.setState(prevState => ({
            currentPercentage: cP+"%",
            currentTime: cT
        }))
    }

    isPlaying() {
        let vid = document.getElementById("mainPlayer");
        if (vid) return vid.paused
    }

    render() {
        return (
            <div>
                <Header as="h2">Main Video</Header>
                <div>
                    {this.isPlaying() && <Canvas coordinates={this.props.coordinates} coordinateOnClick={this.props.coordinateOnClick} width="640" height="360" />}
                    <VideoPlayer mainId={this.props.mainId} t={this.props.t} pauseHandler={this.props.pauseHandler} filepath={this.props.filepath} getCurrentTime={this.getCurrentTime} width="640" height="360" id="mainPlayer" />
                </div>
                <div style={{margin: '3px'}}>
                    <EquationBar equationOnClick={this.props.equationOnClick} equations={this.equations}/>
                    <MainProgressBar highlightItem={this.props.highlightItem} highlights={this.props.highlights} currentPercentage={this.state.currentPercentage}/>
                    <Buttons playingVideoManager={this.props.playingVideoManager}/>
                </div>
            </div>
        )
    }
}

export default MainPlayer;