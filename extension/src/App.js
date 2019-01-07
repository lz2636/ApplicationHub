import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Footer from "./Footer";
import Landing from "./Landing";
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';

library.add(fab);

const Dashboard = ()=> <h2>Dashboard</h2>;

class App extends Component {
  render() {
    return (
      <div>
          <BrowserRouter>
            <div>
              <Route path="/login" component={Dashboard}/>
              <Route path="/" component={Landing}/>
              <Footer/>
            </div>
          </BrowserRouter>
      </div>
    );
  }
}

export default App;
