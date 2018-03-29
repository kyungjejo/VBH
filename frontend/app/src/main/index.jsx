import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Segment, Container } from 'semantic-ui-react';
import './index.css';

class Main extends Component {
    render() {
        return(
            <div className="segments">
                <Container>
                    <Segment.Group>
                        <Link to="/pizza/0"><Segment>Top</Segment></Link>
                        <Link to="/pizza/0"><Segment>Top</Segment></Link>
                        <Link to="/pizza/0"><Segment>Top</Segment></Link>
                    </Segment.Group>
                </Container>
                {/* <Link to="/pizza">Main</Link> */}
            </div>
        )
    }
}

export default Main;