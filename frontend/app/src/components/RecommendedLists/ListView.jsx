import React, { Component } from 'react';
import { Image, List } from 'semantic-ui-react'
class ListView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            border: 'unset',
            cursor: 'unset'
        }
        this.mouseEnter = this.mouseEnter.bind(this);
        this.mouseLeave = this.mouseLeave.bind(this);
    }

    mouseEnter() {
        this.setState(prevState => ({
            border: '1px solid',
            cursor: 'pointer',
        }))
    }

    mouseLeave() {
        this.setState(prevState => ({
            border: 'unset',
            cursor: 'unset'
        }))
    }

    render() {
        return (
            <List.Item style={{border: this.state.border, cursor: this.state.cursor}} onClick={() => this.props.onToggleHandler(this.props.i)} onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave}>
                <Image style={{height: '60px', width: '100px'}} src={"https://s3.ap-northeast-2.amazonaws.com/kixlab-recipescape/img/"+this.props.x.filepath.replace(".mp4",'')+"/"+Math.ceil(this.props.x.start)+".png"} />
                <List.Content>
                    <List.Header style={{width:'500px', overflowX: 'hidden'}}>{this.props.x.filepath.split("+").join(" ").slice(0,this.props.x.filepath.length-12)}</List.Header>
                    <List.Description>{this.props.x.step_des} (Step {this.props.x.step_num} of {this.props.x.step_len}) @ [Time - {this.props.x.time}]</List.Description>
                </List.Content>
            </List.Item>
        )
    }
}

export default ListView;