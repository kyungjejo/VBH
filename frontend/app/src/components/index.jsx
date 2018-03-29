import React, { Component } from 'react';
import { Grid, Header, Divider, Segment, Card } from 'semantic-ui-react';

import MainPlayer from './MainPlayer';
import HistoryBar from './HistoryBar';
import RecommendedLists from './RecommendedLists';

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

class Components extends Component {
    constructor(props){
        super(props);
        this.state = {
            main: 'Bread Pizza Roll Recipe _ Quick and Easy Bread Roll Recipe _ How to Make Bread Pizza Roll-Wz93s6OKvU4.mp4',
            h: [
            ],
            playing: 'mainPlayer',
            snippets: [
                // [10,20,'video4.mp4'],
                // [10,20,'video5.mp4'],
                // [10,20,'video6.mp4'],
                // [10,20,'video7.mp4'],
                // [10,20,'video8.mp4'],
            ],
            historyHighlight: null,
        }
        this.updateMainVideo = this.updateMainVideo.bind(this);
        this.playingVideoManager = this.playingVideoManager.bind(this);
        this.pauseHandler = this.pauseHandler.bind(this);
        this.equationOnClick = this.equationOnClick.bind(this);
        this.coordinateOnClick = this.coordinateOnClick.bind(this);
    }

    playingVideoManager(vid) {
        console.log(this.state.playing,vid);
        if (this.state.playing && document.getElementById(this.state.playing) && this.state.playing!==vid) {
            document.getElementById(this.state.playing).pause();
        }
        this.setState(prevState => ({
            playing: vid,
        }))
    }

    componentDidMount() {
        fetch('/app/dummyData/')
          .then(res => res.json())
          .then((result) => (
            this.dummyCoordinates = result.dummyCoordinates,
            this.setState(prevState => ({
              dummySimVideos: result.dummySimVideos
            }))
          ));
      }

    equationOnClick(equation) {
        console.log("please fetch from database");
    }

    pauseHandler(videoId,filepath) {
        let id = videoId==="mainPlayer" ? "mainPlayer" : "snippet";
        let vid = document.getElementById(videoId);
        let h = this.state.h.slice();
        let start = 0;
        let end = 0;
        if (vid.played.length > 0){
            start = vid.played.start(0).toFixed(2);
            end = vid.played.end(0).toFixed(2);
        }
        if (id==="mainPlayer") {
            for (let i=0; i<h.length; i++) {
                if (h[i].id==="mainPlayer" && h[i].filename===filepath) start = h[i].end;
            }
        }
        let data = {id:id,filename:filepath,start:start,end:end};
        h.push(data);
        this.setState(prevState => ({
            h: h
        }))
    }

    coordinateOnClick(item) {
        console.log(item,'clicked');
    }

    historyManage() {

    }

    updateMainVideo(vid) {
        this.setState(prevState => ({
            main: vid,
            snippets: null
        }))
    }

    render() {
        let title = "RecipeScape";
        const vid = this.props.match.params.number;
        return (
            <div>
                <Header as='h1' textAlign="center" style={{margin: "30px 0px"}}>{title}</Header>
                <Divider />
                <Grid>
                    <Grid.Column width={1} />
                    <Grid.Column width={14}>
                        <Header as="h2" textAlign="center">View History</Header>
                        <HistoryBar updateMainVideo={this.updateMainVideo} data={this.state.h}/>
                    </Grid.Column>
                    <Grid.Column width={1} />
                </Grid>
                <Grid>
                    <Grid.Column width={1} />
                    <Grid.Column width={7}>
                        <MainPlayer coordinateOnClick={this.coordinateOnClick} equationOnClick={this.equationOnClick} pauseHandler={this.pauseHandler} playingVideoManager={this.playingVideoManager} filepath={this.state.main} width="640" height="360" id="mainPlayer"/>
                    </Grid.Column>
                    <Grid.Column width={7}>
                        <RecommendedLists snippets={this.state.snippets} pauseHandler={this.pauseHandler} playingVideoManager={this.playingVideoManager} updateMainVideo={this.updateMainVideo}/>
                    </Grid.Column>
                    <Grid.Column width={1} />
                </Grid>
            </div>
        )
    }
}

export default Components;