import React, { Component } from 'react';

import 'semantic-ui/dist/semantic.min.css';
import { Segment, Modal, Tab } from 'semantic-ui-react';
import VideoPlayer from './VideoPlayer';
import ProgressBar from './ProgressBar';

import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

import Slider from 'react-slick'


import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

class RecommendedLists extends Component {
    constructor(props) {
        super(props);
        this.state = {width: 0,
            currentTime: 0,
            currentPercentage: 0,
            isPlaying: false,
            status: "play"
        }
        this.videoHandler = this.videoHandler.bind(this);
        this.updateTime = this.updateTime.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.onClose = this.onClose.bind(this);
    }

    handleClick() {

    }
    
    videoHandler(vid) {
        let modalVideo = document.getElementById(vid);
        let mainVideo = document.getElementById('mainVideo');
        mainVideo.pause();
        this.state.isPlaying ? modalVideo.pause() : modalVideo.play();
        this.setState(prevState => ({
            isPlaying: !prevState.isPlaying,
            status: prevState.isPlaying ? "play" : "pause",
        }));
    }

    updateTime(vid) {
        let mainVideo = document.getElementById(vid);
        this.setState(prevState => ({
            currentTime: mainVideo.currentTime,
            currentPercentage: mainVideo.currentTime/mainVideo.duration*100,
        }))
        // this.props.updateHistory(vid);
    }

    onClose() {
        this.setState(prevState => ({
            width: 0,
            currentTime: 0,
            currentPercentage: 0,
            isPlaying: true,
            status: "pause",
            onSwipe: () => console.log("slide")
        }))
    }

    render() {
        let videoLists = null;
        let vid = null;
        if (this.props.videoLists){
            videoLists = this.props.videoLists.map((x,index) =>
                    (vid = "modalVideo"+index,
                    <div key={index}>
                        <VideoPlayer videoId={vid} start={x.start} end={x.end} updateHistory={this.props.updateHistory} filename={x.videoPath} width='640' height='360' videoHandler={this.videoHandler} updateTime={this.updateTime} status={this.state.status} autoplay={false}/>
                        <ProgressBar videoId={vid} start={x.start} end={x.end} id="progressBar" width="640" color="grey" height="16" />
                    </div>
                    )
            )
        }
        const settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1
          };
        return (
            <Slider {... settings} style={{height:'470px'}}>
                {videoLists}
            </Slider>
        )
    }
}

export default RecommendedLists;
