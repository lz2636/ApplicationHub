import React, {Component} from 'react';

class Landing extends Component {
    render() {
        return (
            <div className="jumbotron jumbotron-fluid bg-light">
                <div className="container">
                    <h4 className="display-4" style={{'font-size': '28px'}}>ApplicationHub</h4>
                    <hr className="my-4"/>
                    <p className="lead" style={{'font-size': '14px'}}>Save your valuable time from tedious online
                        application pages</p>
                </div>
            </div>
        );
    }
}

export default Landing;