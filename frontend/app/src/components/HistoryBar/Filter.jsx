import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';

class Filter extends Component {
    showAll() {
        let e = '';
        let divs = document.getElementsByClassName('ui cards')[0].querySelectorAll('div');
        let as = document.getElementsByClassName('ui cards')[0].querySelectorAll('a');
        for (e=0; e<divs.length; e++){
            divs[e].style.display = 'block';
        }
        for (e=0; e<as.length; e++){
            as[e].style.display = 'block';
        }
    }

    showMain() {
        let e = '';
        let divs = document.getElementsByClassName('ui cards')[0].querySelectorAll('div');
        let as = document.getElementsByClassName('ui cards')[0].querySelectorAll('a');
        for (e=0; e<divs.length; e++){
            divs[e].style.display = 'none';
        }
        for (e=0; e<as.length; e++){
            if (as[e].getAttribute("main") !== 'mainPlayer')
                as[e].style.display = 'none';
            else as[e].style.display = 'block';
        }
    }

    showSnippet() {
        let e = '';
        let divs = document.getElementsByClassName('ui cards')[0].querySelectorAll('div');
        let as = document.getElementsByClassName('ui cards')[0].querySelectorAll('a');
        for (e=0; e<divs.length; e++){
            divs[e].style.display = 'none';
        }
        for (e=0; e<as.length; e++){
            if (as[e].getAttribute("main") !== 'snippet')
            as[e].style.display = 'none';
        else as[e].style.display = 'block';
        }
    }

    render() {
        return (
            <div>
                <Button className="filterBtn" onClick={this.showAll}>Show All</Button>
                <Button className="filterBtn" onClick={this.showMain}>Show Main Player</Button>
                <Button className="filterBtn" onClick={this.showSnippet}>Show Snippets</Button>
            </div>
        )
    }
}

export default Filter;