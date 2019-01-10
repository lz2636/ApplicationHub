import React, {Component} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {connect} from 'react-redux';
import * as actions from '../actions';

class Footer extends Component {
    renderContent() {
        switch (this.props.auth) {
            case null:
                return;
            case false:
                return (
                    <a href="http://127.0.0.1:5000/auth/github"
                       target="_blank"
                       className="btn btn-outline-success my-2 my-sm-0">
                        Login
                    </a>
                );
            default:
                return (
                    <button onClick={this.props.logoutCurrentUser}
                            className="btn btn-outline-success my-2 my-sm-0">
                        Logout
                    </button>
                );
        }
    }

    render() {
        return (
            <div>
                <div className="container">
                    <div className="row justify-content-center">
                        {this.renderContent()}
                    </div>
                    <div className="row justify-content-center">
                        <a href="https://github.com/lz2636/ApplicationHub"
                           target="_blank"
                           style={{"padding-bottom": "5px"}}>
                            <FontAwesomeIcon style={{"color": "black"}} icon={['fab', 'github']} size="lg"/>
                        </a>
                    </div>
                </div>
            </div>
        );
    }
}


function mapStateToProps({auth}) {
    return {auth};
}


export default connect(mapStateToProps, actions)(Footer);