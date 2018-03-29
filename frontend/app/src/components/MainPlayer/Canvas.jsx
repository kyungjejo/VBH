import React, { Component } from 'react';
import { Stage, Layer, Rect, Text, Group } from 'react-konva';
import Konva from 'konva';

class Canvas extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            downX: null,
            downY: null,
            rect: null,
            dummyCoordinates: [
                {'start':0,'length':10,'data':[{'x':10,'y':10,'object':'Dough'},{'x':30,'y':200,'object':'Pizza'}]},
                {'start':10,'length':10,'data':[{'x':10,'y':10,'object':'Dough'}]},
                {'start':20,'length':10,'data':[{'x':10,'y':10,'object':'Dough'}]},
                {'start':30,'length':10,'data':[{'x':10,'y':10,'object':'Dough'}]},
                {'start':40,'length':10,'data':[{'x':10,'y':10,'object':'Dough'}]},
                {'start':50,'length':10,'data':[{'x':10,'y':10,'object':'Dough'}]},
                {'start':60,'length':10,'data':[{'x':10,'y':10,'object':'Dough'}]},
                {'start':70,'length':10,'data':[{'x':10,'y':10,'object':'Dough'}]},
                {'start':80,'length':10,'data':[{'x':10,'y':10,'object':'Dough'}]}
            ],
            hover: false
        }
        this.onMouseDown = this.onMouseDown.bind(this);
        this.onMouseUp = this.onMouseUp.bind(this);
        this.onMouseEnter = this.onMouseEnter.bind(this);
        this.onMouseLeave = this.onMouseLeave.bind(this);
    }

    onMouseDown(x,y) {
        this.setState(prevState => ({
            downX: x,
            downY: y
        }))
    }

    onMouseUp(x,y) {
        let width = x-this.state.downX;
        let height = y-this.state.downY;
        if (width>5 && height>5)
            this.setState(prevState => ({
                rect: (
                    <Group>
                        <Rect x={prevState.downX} y={prevState.downY} width={width} height={height} stroke={Konva.Util.getRandomColor()} onClick={() => this.props.onClickObjectHandler("Object")}/>
                        <Text x={prevState.downX} y={prevState.downY} text="object"/>
                    </Group>
                )
            })) 
    }

    onMouseEnter() {
        this.setState(prevState => ({
            hover: true
        }))
    }

    onMouseLeave() {
        this.setState(prevState => ({
            hover: false
        }))
    }

    render() {
        const styles = {
            position: "absolute",
        }
        let rects = null;
        if (this.state.dummyCoordinates){
            rects = this.state.dummyCoordinates[0].data.map((x,index) => 
                <Group key={index}>
                    <Rect x={x.x} 
                        y={x.y} 
                        style={{cursor:'pointer'}}
                        width={50} 
                        height={50} 
                        stroke={Konva.Util.getRandomColor()} 
                        onMouseEnter={this.onMouseEnter} 
                        onMouseLeave={this.onMouseLeave} 
                        onClick={() => this.props.coordinateOnClick(x.object)}/>
                    <Text x={x.x} y={x.y} text={x.object}/>
                </Group>);
        }
        let rect = null;
        if (this.state.rect)
            rect = this.state.rect;
        return(
            <div>
                <Stage onMouseDown={(e) => this.onMouseDown(e.evt.offsetX,e.evt.offsetY)} onMouseUp={(e) => this.onMouseUp(e.evt.offsetX,e.evt.offsetY)} style={styles} width={this.props.width} height={this.props.height}>
                    <Layer>
                        {rects}
                        {rect}
                    </Layer>
                </Stage>
            </div>
            // <canvas style={styles} />
        )
    };
    
}

export default Canvas;
