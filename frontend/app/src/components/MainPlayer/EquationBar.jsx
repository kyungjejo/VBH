import React, { Component } from 'react';
import { Popup } from 'semantic-ui-react';
class EquationBar extends Component {
    render() {
        return (
            <div id="equationBar">
                {this.props.equations.equations &&
                    this.props.equations.equations.map((x,index) =>
                    <Popup
                        mainid={this.props.mainId}
                        trigger={<div className="equation" onClick={() => this.props.equationOnClick(index,this.props.mainId)} key={index} style={{width:(x.length+1/this.props.equations.duration*100)+"%", backgroundColor:x.color}} />}
                        content={"Step "+x.step_num+": "+x.step_des}
                        position='top center'
                    />
                )}
            </div>
        )
    }
}

export default EquationBar;