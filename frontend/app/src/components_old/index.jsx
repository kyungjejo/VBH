import React, { Component } from 'react';
import { Grid, Header, Divider, Segment, Card } from 'semantic-ui-react';

import VideoContainer from './VideoContainer'
import RecommendedLists from './RecommendedLists'

class OuterContainer extends Component {
    constructor(props) {
      super(props);
      this.state ={
        dummySimVideos: null,
        dummyCoordinates: null,
        videoLists: null,
        width: 0,
        currentTime: 0,
        currentPercentage: 0,
        isPlaying: false,
        status: "play",
        history: [],
        showRecommended: false,
      }
      this.videoHandler = this.videoHandler.bind(this);
      this.updateTime = this.updateTime.bind(this);
      this.simVideoHandler = this.simVideoHandler.bind(this);
      this.pauseHandler = this.pauseHandler.bind(this);
      this.fetchCoordinates = this.fetchCoordinates.bind(this);
      this.updateHistory = this.updateHistory.bind(this);
      this.onClickObjectHandler = this.onClickObjectHandler.bind(this);
    }

    componentDidMount() {
      fetch('app/dummyData/')
        .then(res => res.json())
        .then((result) => (
          this.dummyCoordinates = result.dummyCoordinates,
          this.setState(prevState => ({
            dummySimVideos: result.dummySimVideos
          }))
        ));
    }
  
    videoHandler(videoId) {
        let mainVideo = document.getElementById('mainVideo');
        this.state.isPlaying ? this.pauseHandler(mainVideo) : this.playHandler(mainVideo);
        this.setState(prevState => ({
            isPlaying: !prevState.isPlaying,
            status: prevState.isPlaying ? "play" : "pause",
        }));
    }
  
    playHandler(vid) {
      vid.play();
      this.setState(prevState => ({
        dummyCoordinates: null
      }))
    }

    pauseHandler(vid) {
        vid.pause();
        let currentTime = vid.currentTime;
        this.fetchCoordinates(currentTime);
    }

    fetchCoordinates(cTime) {
        for (let i=0; i<this.dummyCoordinates.length; i++){
            let data = this.dummyCoordinates[i];
            if (data.start<cTime && cTime<data.start+data.length){
              this.setState(prevState => ({
                dummyCoordinates: data
              }))
            }
        }
    }

    onClickObjectHandler(obj) {
      if (!this.state.showRecommended) this.setState(prevState => ({showRecommended: !prevState.showRecommended}));
      this.setState(prevState => ({
        videoLists: [{"start":1,"end":2,"videoPath":"video3.mp4","title":obj}]
      }))
    }

    updateHistory(item) {
      console.log(item);
      let history = this.state.history.slice()
      history.push(item)
      this.setState(prevState => ({
        history: history
      }))
    }

    updateTime(videoId) {
        let mainVideo = document.getElementById('mainVideo');
        this.setState(prevState => ({
            currentTime: mainVideo.currentTime,
            currentPercentage: mainVideo.currentTime/mainVideo.duration*100,
        }))
    }
  
    simVideoHandler(index) {
      if (!this.state.showRecommended) this.setState(prevState => ({showRecommended: !prevState.showRecommended}));
      this.setState(prevState => ({
        videoLists: this.state.dummySimVideos[index],
        dummyCoordinates: null
      }))
    }
  
    render() {
      const title = "RecipeScape";
      return (
        <div className="outerContainer">
            <Header as='h1' textAlign="center" style={{margin: "30px 0px"}}>{title}</Header>
            <Divider />
            <Grid>
              <Grid.Column width={1} />
              <Grid.Column width={14}>
                <div style={{height: "100px", border: "1px solid #efefef"}}>
                <Card.Group style={{margin: "auto", height: "100px", overflowX: "scroll", overflowY: 'hidden', display: "flex", flexWrap: "nowrap"}}>
                  {this.state.history.map((x,index) => <Card style={{flex:'0 0 auto', width:'350px', height:'60px'}} key={index}>{x}</Card>)}
                </Card.Group>
                </div>
                </Grid.Column>
                <Grid.Column width={1} />
            </Grid>
            <Grid>
              <Grid.Column width={1} />
              <Grid.Column width={7} >
                <Segment>
                <VideoContainer onClickObjectHandler={this.onClickObjectHandler} dummyCoordinates={this.state.dummyCoordinates} currentPercentage={this.state.currentPercentage} videoHandler={this.videoHandler} updateTime={this.updateTime} status={this.state.status} dummySimVideos={this.state.dummySimVideos} simVideoHandler={this.simVideoHandler}/>
                </Segment>
              </Grid.Column>
              <Grid.Column width={7}>
                <div style={{border: "1px solid #efefef", height: '470px'}}>
                  <RecommendedLists videoLists={this.state.videoLists} updateHistory={this.updateHistory} />
                </div>
              </Grid.Column>      
              <Grid.Column width={1} />
            </Grid>
        </div>
      );
    }
  }

export default OuterContainer;