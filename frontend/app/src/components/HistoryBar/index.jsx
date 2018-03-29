import React, { Component } from 'react';
import { Card } from 'semantic-ui-react'
import './index.css';
import History from './History'

class HistoryBar extends Component {
    render() {
        console.log(this.props.data);
        return (
            <div id="historyBar">
                <Card.Group>
                {this.props.data && this.props.data.map((x,index) => 
                    <History thumbnail={x.id}
                            color={x.id==="mainPlayer" ? "red" : "blue"}
                            key={index}
                            title={x.filename}
                            start={x.start}
                            updateMainVideo={this.props.updateMainVideo}
                            end={x.end} />
                )}
                </Card.Group>
            </div>
        )
    }
}

export default HistoryBar;