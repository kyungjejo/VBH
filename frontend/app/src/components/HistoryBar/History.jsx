import React, { Component } from 'react';
import { Card, Image } from 'semantic-ui-react'
import './index.css';

class History extends Component {
    render() {
      const time = Math.floor(this.props.end)+1;
      const filepath = "https://s3.ap-northeast-2.amazonaws.com/kixlab-recipescape/img/"+this.props.title.replace(".mp4",'')+"/"+time+".png"
      return (
          <Card className={this.props.color==='red' ? 'history' : 'small history' }
                main={this.props.id}
                mainid={this.props.mainId}
                color={this.props.color}
                onClick={() => this.props.updateMainVideo(this.props.title, time-1,this.props.mainId,'history')}>
            <Image className='historyImage' src={filepath} />
          </Card>
      )
    }
}

export default History;