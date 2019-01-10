import React, {Component} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

class Dashboard extends Component {
    render() {
        return (
            <div className="btn-group-vertical w-100">
                <button type="button" className="btn btn-block btn-outline-secondary text-left">
                    <FontAwesomeIcon icon="check-circle"/> Add TODO List
                </button>
                <button type="button" className="btn btn-block btn-outline-secondary text-left">
                    <FontAwesomeIcon icon="clock"/> Add Timeline
                </button>
                <button type="button" className="btn btn-block btn-outline-secondary text-left">
                    <FontAwesomeIcon icon="home"/> My Applications
                </button>
            </div>
        );
    }
}

export default Dashboard;