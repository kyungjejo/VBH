import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Segment, Container } from 'semantic-ui-react';
import './index.css';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: null
        }
    }
    componentDidMount() {
        fetch('/app/listView/')
          .then(res => res.json())
          .then((result) => (
              console.log(result.items),
            this.setState(prevState => ({
              items: result.items
            }))
          ));
      }

    render() {
        return(
            <div className="segments">
                <Container>
                    <Segment.Group>
                        {this.state.items && this.state.items.map((x) =>
                            <Link key={x.id} title={x.title.split(" ").join("+")} to={"/pizza/"+x.id}><Segment>{x.title}</Segment></Link>
                        )}
                    </Segment.Group>
                </Container>
                {/* <Link to="/pizza">Main</Link> */}
            </div>
        )
    }
}

export default Main;