import React, { Component } from 'react';
import { Card } from 'semantic-ui-react'
import './index.css';
import History from './History'
import Bar from './Bar';
import Filter from './Filter';

class HistoryBar extends Component {
    render() {
        return (
            <div>
                <div className="filterContainer" style={{textAlign:'center'}}>
                    <Filter />
                </div>
                <div id="historyBar">
                    <Card.Group>
                    {this.props.data && this.props.data.map((x,index) => (
                        (x.display === 'bar') ?
                        <Bar key={index} data={x}/> :
                        <History id={x.id}
                        mainId={x.mainId}
                        color={x.id==="mainPlayer" ? "red" : "blue"}
                        key={index}
                        title={x.filename}
                        start={x.start}
                        updateMainVideo={this.props.updateMainVideo}
                        end={x.end} />
                    ))}
                    </Card.Group>
                </div>
            </div>
        )
    }
}

export default HistoryBar;