import React, { Component } from 'react';
import { Popup, Icon } from 'semantic-ui-react'

class Bar extends Component {
    render() {
        let color = 'unset';
        let noun = '';
        let icon = '';
        if (this.props.data.ty === 'main') {
            color = '#FF851B';
            noun = 'Main player';
            icon = 'pause';
        }
        else if (this.props.data.ty === 'snippet') {
            color = '#3D9970';
            noun = 'Snippet';
            icon = 'pause';
        }
        else if (this.props.data.ty === 'item') {
            color = '#7FDBFF';
            noun = this.props.data.item.charAt(0).toUpperCase() + this.props.data.item.slice(1);
            icon = 'mouse pointer';
        }
        else if (this.props.data.ty === 'history') {
            color = '#FFDC00';
            noun = "History";
            icon = 'fast backward';
        }
        else {
            color = '#01FF70';
            noun = "Main player";
            icon = 'pointing left';
        }
        return (
            <Popup
                trigger={<div className="bar" style={{backgroundColor:color, paddingTop:'50px'}}>
                            <Icon name={icon} color="black" size="tiny" ></Icon>
                        </div>}
                position='top center'
                content={noun+' was '+this.props.data.action}
            />
        )
    }
}

export default Bar;