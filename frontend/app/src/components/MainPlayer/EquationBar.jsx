import React, { Component } from 'react';

class EquationBar extends Component {
    render() {
        return (
            <div id="equationBar">
                {this.props.equations &&
                    this.props.equations.map((x,index) =>
                    <div className="equation" onClick={() => this.props.equationOnClick(index)} key={index} style={{width:x.width, backgroundColor:x.color}} />
                )}
            </div>
        )
    }
}

export default EquationBar;