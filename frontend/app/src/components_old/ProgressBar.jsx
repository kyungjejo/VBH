import React, { Component } from 'react';
import Konva from 'konva';
import VideoPlayer from './VideoPlayer';

class ProgressBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cursor: 'unset'
        }
        this.handleClick = this.handleClick.bind(this);
        this.dummyData = [
            {'start':'0','end':'146','duration':'395','width':'10','y':'y1','equation':'y1=fx','color': Konva.Util.getRandomColor()},
            {'start':'146','end':'206','duration':'395','width':'30','y':'y2','equation':'y2=fx','color': Konva.Util.getRandomColor()},
            {'start':'206','end':'395','duration':'395','width':'60','y':'y3','equation':'y3=fx','color': Konva.Util.getRandomColor()},
        ]
    }

    handleClick(start,index) {
        let myVideo = document.getElementById('mainVideo');
        myVideo.currentTime = parseInt(start);
        this.props.simVideoHandler(index);
    }

    render() {
        let updateTime = null;
        if (this.props.id === "progressBar") {
            let myVideo = document.getElementById(this.props.videoId);
            let duration = 0;
            if (myVideo) {
                duration = myVideo.duration;
            }
            let currentPercentage = this.props.start/duration*100
            if (this.props.currentPercentage) currentPercentage = this.props.currentPercentage
            updateTime = <div id={this.props.videoId} style={{width: (currentPercentage)+"%", background: '#FF0000', height: this.props.height+"px"}} />
        }
        const styles = {
            width: this.props.width+"px",
            background: this.props.color,
            height: this.props.height+"px",
            margin: 'auto',
            display: 'flex'
        }

        let modals = null;
        if (this.props.id === "equationBar") {
            let style = {
                zIndex: 50,
                margin: 'auto',
            }
            modals = this.dummyData.map((x,index) => 
                    <div onClick={() => this.handleClick(x.start,index)} 
                        onMouseLeave={this.onMouseLeave} 
                        onMouseOver={this.onMouseOver} 
                        key={index} 
                        start={x.start} 
                        end={x.end} 
                        style={{width: ((parseInt(x.end)-parseInt(x.start))/parseInt(x.duration)*100)+"%", 
                                background: x.color, 
                                height: this.props.height+"px", 
                                cursor: "pointer"}}/>
            )
        }
            
        return (
            <div style={styles}>
                {modals}
                {updateTime}
            </div>
        )   
    }
}

export default ProgressBar;