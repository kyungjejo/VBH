import React, { Component } from 'react';
import { Grid, Header, Divider, Segment, Card } from 'semantic-ui-react';

import MainPlayer from './MainPlayer';
import HistoryBar from './HistoryBar';
import RecommendedLists from './RecommendedLists';

import { Link } from 'react-router-dom';

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

class Components extends Component {
    constructor(props){
        super(props);
        this.state = {
            main: null,
            mainId: null,
            coordinates: [],
            t: 0,
            h: [],
            playing: 'mainPlayer',
            snippets: [],
            highlights: [],
            historyHighlight: null,
            highlightItem: '',
            timing: [],
            interval: false,
            equations: {},
        }
        this.url = 'https://server.kyungjejo.com';
	this.cors = {'Access-Control-Allow-Origin':'*'};
        this.updateMainVideo = this.updateMainVideo.bind(this);
        this.playingVideoManager = this.playingVideoManager.bind(this);
        this.pauseHandler = this.pauseHandler.bind(this);
        this.equationOnClick = this.equationOnClick.bind(this);
        this.coordinateOnClick = this.coordinateOnClick.bind(this);
        this.startInterval = this.startInterval.bind(this);
        this.fetchequations = this.fetchequations.bind(this);
    }

    playingVideoManager(vid) {
        if (this.state.playing && document.getElementById(this.state.playing) && this.state.playing!==vid) {
            document.getElementById(this.state.playing).pause();
        }
        this.setState(prevState => ({
            playing: vid,
        }))
    }

    startInterval(timing) {
        if (!(this.state.interval)) {
            let interval = setInterval(function() {
                let time = Math.ceil(document.getElementById("mainPlayer").currentTime);
                if (timing.includes(time-1) && !(document.getElementById("mainPlayer").paused)){
                    document.getElementById('objectDetected').innerHTML = 'Objects are detected. Press pause to browse objects.';
                    document.getElementById('objectDetected').style.color = 'red';
                    document.getElementById('videoWrapper').style.backgroundColor = 'red';
                    setTimeout(function() {
                        document.getElementById('videoWrapper').style.color = 'unset';
                        document.getElementById('objectDetected').innerHTML = '';
                        document.getElementById('videoWrapper').style.backgroundColor = 'unset';
                    },3000);
                }
            },1000);
            this.setState(prevState => ({
                interval: interval
            }))
        }
    }

    componentWillUnmount() {
        clearInterval(this.state.interval);
    }

    componentWillMount() {
        fetch(this.url+'/app/fetchTitle?id='+this.props.match.params.number,this.cors)
        .then(res => res.json())
        .then((result) => (
            this.setState(prevState => ({
                main: result.title.split(' ').join("+"),
                mainId: this.props.match.params.number
            }))  
        ));
        fetch(this.url+'/app/fetchTiming?id='+this.props.match.params.number,this.cors)
            .then(res => res.json())
            .then((result) => (this.startInterval(result.timing),this.setState(prevState => ({timing: result.timing}))))
            
        fetch(this.url+'/app/fetchEquations?id='+this.props.match.params.number,this.cors)
            .then(res => res.json())
            .then((result) => 
                    this.setState(prevState => ({
                        equations: result
                    }))
                )
    }

    equationOnClick(equation,mainId) {
        fetch(this.url+'/app/fetchSimEquation?eq='+equation+'&num='+mainId,this.cors)
            .then(res => res.json())
            .then((result) => (console.log(result.snippets.same), this.setState(prevState => ({snippets: result.snippets}))))
        // console.log("please ,this.corsfetch from database", equation, mainId);
    }

    pauseHandler(ty,videoId,filepath) {
        let id = videoId==="mainPlayer" ? "mainPlayer" : "snippet";
        let vid = document.getElementById(videoId);
        let h = this.state.h.slice();
        let start = 0;
        let end = 0;
        if (vid.played.length > 0){
            start = vid.played.start(vid.played.length-1).toFixed(2);
            end = vid.currentTime.toFixed(2);
        }
        let data = {id:id,filename:filepath,start:end-5,end:end,ty:ty,mainId:vid.getAttribute("mainid")};
        if (id==="mainPlayer"){
            fetch(this.url+'/app/fetchCoordinates?id='+vid.getAttribute("mainId")+'&time='+vid.currentTime,this.cors)
                .then(res => res.json())
                .then((result) => (
                    console.log(result),
                    this.setState(prevState => ({
                        coordinates: result.coordinates
                    }))
                ))
        }
        h.push(data);
        id==="mainPlayer" ? h.push({'display':'bar','ty':'main',action:'paused'}) : h.push({'display':'bar','ty':'snippet',action:'paused'})
        this.setState(prevState => ({
            h: h
        }))
    }

    coordinateOnClick(item) {
        console.log(item+'clicked')
        let data = {ty:'item',display:'bar',item:item,action:'clicked'};
        let h = this.state.h.slice();
        h.push(data);
        this.setState(prevState => ({
            h: h
        }))
        const id = document.getElementById('mainPlayer').getAttribute("mainId");
        const time = Math.ceil(parseInt(document.getElementById('mainPlayer').currentTime))
        fetch(this.url+'/app/fetchSnippets?time='+time+'&id='+id+'&item='+item,this.cors)
            .then(res => res.json())
            .then((result) => (
                this.setState(prevState => ({
                    snippets: result.snippets,
                    highlights: result.highlights,
                    highlightItem: item,
                }))
            ))
    }

    updateMainVideo(vid,t,i,ty) {
        clearInterval(this.state.interval);
        this.setState(prevState => ({
            interval: null,
            mainId: i
        }))
        fetch(this.url+'/app/fetchTiming?id='+i,this.cors)
            .then(res => res.json())
            .then((result) => (this.startInterval(result.timing),this.setState(prevState => ({timing: result.timing}))))
        let h = this.state.h.slice();
        ty==="snippet" ? h.push({ty:'change',display:'bar',action:'changed'}) : h.push({ty:'history',display:'bar',action:'clicked'})
        this.setState(prevState => ({
            h: h,
            highlights: [],
            highlightItem: ''
        }))
        this.setState(prevState => ({
            main: vid.includes(".mp4") ? vid : vid+".mp4",
            snippets: [],
            t: t,
            coordinates: [],
        }))
    }

    fetchequations() {
        return (
            this.state.mainId && 
            fetch(this.url+'/app/fetchEquations?id='+this.state.mainId,this.cors)
                .then(res => res.json())
                .then((result) =>                    
                    this.setState(prevState => ({
                    equations: result
                })))
        )
    }

    render() {
        const vid = this.props.match.params.number;
        return (
            <div>
                <Grid style={{marginTop:'10px'}}>
                    <Grid.Column width={1} />
                    <Grid.Column width={14}>
                        <Header as="h5" textAlign="center">View History</Header>
                        <HistoryBar updateMainVideo={this.updateMainVideo} data={this.state.h}/>
                    </Grid.Column>
                    <Grid.Column width={1} />
                </Grid>
                <Link to={"/"}><Header as='h2' textAlign="center" style={{margin: "30px 0px"}}>{this.state.main && this.state.main.slice(0,this.state.main.length-16).split("+").join(" ")}</Header></Link>
                {/* <Divider /> */}
                <Grid>
                    <Grid.Column width={1} />
                    <Grid.Column width={7}>
                        <MainPlayer equations={this.fetchequations}
                                    highlightItem={this.state.highlightItem} 
                                    highlights={this.state.highlights} 
                                    mainId={this.state.mainId} 
                                    coordinates={this.state.coordinates} 
                                    coordinateOnClick={this.coordinateOnClick} 
                                    t={this.state.t} 
                                    equationOnClick={this.equationOnClick} 
                                    pauseHandler={this.pauseHandler} 
                                    playingVideoManager={this.playingVideoManager} 
                                    filepath={this.state.main} 
                                    equations={this.state.equations}
                                    width="640" height="360" id="mainPlayer"/>
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
