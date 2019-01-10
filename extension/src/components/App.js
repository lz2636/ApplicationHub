import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions';

import Footer from "./Footer";
import Landing from "./Landing";
import Dashboard from "./Dashboard";

import {library} from '@fortawesome/fontawesome-svg-core';
import {fab} from '@fortawesome/free-brands-svg-icons';
import {faCheckCircle, faClock, faHome} from '@fortawesome/free-solid-svg-icons'

library.add(fab, faCheckCircle, faClock, faHome);

class App extends Component {
    componentDidMount() {
        this.props.fetchUser();
    }

    renderContent() {
        switch (this.props.auth) {
            case null:
                return;
            case false:
                return (
                    <Landing/>
                );
            default:
                return (
                    <Dashboard/>
                );
        }
    }

    render() {
        return (
            <div>
                {this.renderContent()}
                <Footer/>
            </div>
        );
    }
}

function mapStateToProps({auth}) {
    return {auth};
}

export default connect(mapStateToProps, actions)(App);
