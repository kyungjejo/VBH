import React, { Component } from 'react';

class MainProgressBar extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div id="progressBar">
                <div id="background"></div>
                <div id="time" style={{width: this.props.currentPercentage}}></div>
            </div>
        )
    }
}

export default MainProgressBar;