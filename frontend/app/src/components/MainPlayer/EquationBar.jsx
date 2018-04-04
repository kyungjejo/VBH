import React, { Component } from 'react';
import { Popup } from 'semantic-ui-react';
class EquationBar extends Component {
    render() {
        let vid = document.getElementById("mainPlayer")
        return (
            <div id="equationBar">
                {this.props.equations.equations &&
                    this.props.equations.equations.map((x,index) =>
                    <Popup
                        key={index}
                        mainid={this.props.mainId}
                        trigger={<div className="equation" onClick={() => (vid.currentTime = x.step_start,this.props.equationOnClick(x.step_num,this.props.mainId))} key={index} style={{width:(x.length/vid.duration*100)+"%", backgroundColor:x.color}} />}
                        content={"Step "+x.step_num+": "+x.step_des}
                        position='top center'
                    />
                )}
            </div>
        )
    }
}

export default EquationBar;