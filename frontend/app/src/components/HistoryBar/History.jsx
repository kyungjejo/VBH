import React, { Component } from 'react';
import { Card, Icon, Image } from 'semantic-ui-react'

class History extends Component {
    render() {
      const time = Math.floor(this.props.end);
      return (
          <Card className={this.props.color==='red' ? 'history' : 'small history' } 
                color={this.props.color}
                onClick={() => this.props.updateMainVideo(this.props.title)}>
            {this.props.thumbnail}
            {/* <Image src={filepath} /> */}
            {/* <Card.Content>
              <Card.Description>
                {this.props.title}
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Icon name='video play' />
                Rewatch from {this.props.start} to {this.props.end}
            </Card.Content> */}
          </Card>
      )
    }
}

export default History;