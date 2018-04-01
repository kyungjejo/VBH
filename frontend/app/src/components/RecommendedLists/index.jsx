import React, { Component } from 'react';

import { Header, Button, Icon } from 'semantic-ui-react';

import Slider from 'react-slick';
import Snippet from './Snippet';

import './index.css'

function NextArrow(props) {
    let {className, style, onClick} = props
    return (
      <div
        className={className}
        style={{...style, display: 'block', background: 'grey'}}
        onClick={onClick}
      ></div>
    );
  }
  
function PrevArrow(props) {
    let {className, style, onClick} = props
    return (
        <div
        className={className}
        style={{...style, display: 'block', background: 'grey'}}
        onClick={onClick}
        ></div>
    );
}

class RecommendedLists extends Component {
    constructor(props) {
        super(props);
        this.set = this.set.bind(this);
    }

    set() {
        let filename = document.getElementsByClassName("slick-slide slick-active")[0].querySelector("video").getAttribute('filename');
        let t = document.getElementsByClassName("slick-slide slick-active")[0].querySelector("video").currentTime;
        let vid = document.getElementsByClassName("slick-slide slick-active")[0].querySelector("video").getAttribute('mainId');
        this.props.updateMainVideo(filename,t,vid,'snippet');
    }

    render() {
        let settings = {
            className: 'center',
            centerMode: true,
            // infinite: true,
            centerPadding: '60px',
            dots: true,
            slidesToShow: 1,
            speed: 500,
            nextArrow: <NextArrow />,
            prevArrow: <PrevArrow />
          };
        return (
            <div id="recommendedLists">
                <Header as="h2" textAlign="center">Related Snippets</Header>      
                {this.props.snippets.length > 0  && 
                <div>
                    <Slider {...settings}>
                        {this.props.snippets.map((x,index) => 
                            <div key={index}>
                                <Snippet mainId={x.id} pauseHandler={this.props.pauseHandler} playingVideoManager={this.props.playingVideoManager} start={x.start} end={x.end} filepath={x.filepath} width="540" height="260" id={"snippet"+index} />
                            </div>
                        )}
                    </Slider>
                    <div style={{textAlign: 'center'}}>
                        <Button onClick={this.set} animated>
                            <Button.Content visible>Set as Main Video</Button.Content>
                            <Button.Content hidden>
                                <Icon name='left arrow' />
                            </Button.Content>
                        </Button>
                    </div>
                </div>
                }
            </div>
        )
    }
}

export default RecommendedLists;