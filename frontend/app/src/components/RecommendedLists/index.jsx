import React, { Component } from 'react';

import { Header, Button, Icon, List, Segment } from 'semantic-ui-react';

import Slider from 'react-slick';
import Snippet from './Snippet';
import ListView from './ListView';

import './index.css'

function NextArrow(props) {
    let {className, style, onClick} = props
    return (
      <div
        className={className}
        style={{...style, display: 'block', background: 'grey'}}
        onClick={() => (console.log(onClick),onClick)}
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
        this.state = {
            toggle: 'ListView',
            snippet: [],
            slidesToShow: 0,
            same: true,
        }
        this.set = this.set.bind(this);
        this.onToggleHandler = this.onToggleHandler.bind(this);
    }

    set() {
        let filename = document.getElementsByClassName("slick-slide slick-active")[0].querySelector("video").getAttribute('filename');
        let t = document.getElementsByClassName("slick-slide slick-active")[0].querySelector("video").currentTime;
        let vid = document.getElementsByClassName("slick-slide slick-active")[0].querySelector("video").getAttribute('mainId');
        alert(filename)
        this.props.updateMainVideo(filename,t,vid,'snippet');
        this.setState({
            toggle: 'ListView',
            slidesToShow: 0
        })
    }

    onToggleHandler(num) {
        // alert(num);
        this.setState({
            toggle: 'Slider',
            slidesToShow: num
        })
        // .remove('slick-active slick-center slick-current');
        // document.querySelector('div[data-index="'+num+'"').add("slick-active slick-center slick-current");
    }

    render() {
        let settings = {
            className: 'center',
            centerMode: true,
            centerPadding: '60px',
            dots: true,
            slidesToShow: 1,
            initialSlide: this.state.slidesToShow,
            speed: 500,
            nextArrow: <NextArrow />,
            prevArrow: <PrevArrow />,
          };
        return (
            <div id="recommendedLists">
                <Header as="h3" textAlign="center">Related Snippets <Button onClick={() => this.setState(prevState => ({toggle: this.state.toggle==="Slider"?"ListView":"Slider"}))} size="tiny" className="primary">Change View Mode</Button></Header>
                {this.state.toggle === "Slider" ?    
                    (
                        this.props.snippets.same &&
                        this.props.snippets.same.length > 0  && 
                        <div>
                            <Slider {...settings}>
                                {this.props.snippets.same.map((x,index) => 
                                    <div key={index} >
                                        <Header as="h5" textAlign="center">{x.filepath.split("+").join(" ").slice(0,x.filepath.length-12)}<br/>Time - {x.time}</Header>
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
                    )
                    :
                    (
                        this.props.snippets.same &&
                        this.props.snippets.same.length > 0 &&
                        <List style={{overflowY: 'scroll', height:'400px'}}>
                            <List.Item>
                                <List.Content>
                                    <Segment onClick={() => document.getElementById("sameSnippets").style.display === "none" ? 
                                                            document.getElementById("sameSnippets").style.display = "block" :
                                                            document.getElementById("sameSnippets").style.display = "none"}>
                                            Snippets of the same step - <b>{this.props.snippets.same[0].step_des}</b> (Total: {this.props.snippets.same.length} snippets)
                                    </Segment>
                                </List.Content>
                                <List.List id="sameSnippets" style={{display:'none'}}>
                                    {this.props.snippets.same.map((x,index) => 
                                        <ListView onToggleHandler={this.onToggleHandler} i={index} key={index} x={x}/>
                                    )}
                                </List.List>
                            </List.Item>
                            {this.props.snippets.not &&
                            <List.Item>
                                <List.Content>
                                    <Segment onClick={() => document.getElementById("differentSnippets").style.display === "none" ? 
                                                            document.getElementById("differentSnippets").style.display = "block" :
                                                            document.getElementById("differentSnippets").style.display = "none"}>
                                                Snippets of different steps
                                    </Segment>
                                </List.Content>
                                <List.List id="differentSnippets" style={{display:'none'}}>
                                    {this.props.snippets.not &&
                                    Object.keys(this.props.snippets.not).map((x,index) => 
                                    (
                                        <List.Item>
                                            <List.Content>
                                                <Segment onClick={() => document.getElementById(x).style.display === "none" ? 
                                                                document.getElementById(x).style.display = "block" :
                                                                document.getElementById(x).style.display = "none"}>
                                                    Step: {x} (Total: {this.props.snippets.not[x].length} snippets)
                                                </Segment>
                                            </List.Content>
                                            <List.List id={x} style={{display:'none'}}>
                                                {this.props.snippets.not[x].map((y,index) =>
                                                 <ListView onToggleHandler={this.onToggleHandler} i={index} key={index} x={y}/>
                                                )}
                                            </List.List>
                                        </List.Item>   
                                    )
                                        
                                    )}
                                </List.List>
                            </List.Item>
                            }
                        </List>
                    )
                }
            </div>
        )
    }
}

export default RecommendedLists;
