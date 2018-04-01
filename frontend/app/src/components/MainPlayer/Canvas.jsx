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
            hover: false
        }
        this.onMouseDown = this.onMouseDown.bind(this);
        this.onMouseUp = this.onMouseUp.bind(this);
        // this.onMouseEnter = this.onMouseEnter.bind(this);
        // this.onMouseLeave = this.onMouseLeave.bind(this);
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

    // onMouseEnter() {
    //     this.setState(prevState => ({
    //         hover: true
    //     }))
    // }

    // onMouseLeave() {
    //     this.setState(prevState => ({
    //         hover: false
    //     }))
    // }

    render() {
        const styles = {
            position: "absolute",
        }
        let rects = null;
        if (this.props.coordinates && this.props.coordinates.length > 0) {
            console.log(this.state.coordinates)
            rects = this.props.coordinates.map((x,index) => 
                <Group key={index}>
                    <Rect x={x.x} 
                        y={x.y} 
                        style={{cursor:'pointer'}}
                        width={x.width} 
                        height={x.height} 
                        stroke={x.color} 
                        // onMouseEnter={this.onMouseEnter} 
                        // onMouseLeave={this.onMouseLeave} 
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
