import React, {Component} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

class Footer extends Component {
    render() {
        return (
            <div>
                <div className="container">
                    <div className="row justify-content-center">
                        <button className="btn btn-outline-success my-2 my-sm-0">Login</button>
                    </div>
                    <div className="row justify-content-center">
                        <FontAwesomeIcon icon={['fab', 'github']} size="lg"/>
                    </div>
                </div>
            </div>
        );
    }
}

export default Footer;