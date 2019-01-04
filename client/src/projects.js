import React from 'react';
import './index.css';
import axios from 'axios';

var projects = [];
projects.push("compiler");
projects.push("web service");

// A project object from backend has following structure:
// Item: {
//   "id": uuid(),
//   "account": test_account,
//   "tag": "project",
//   "name": "intern at A",
//   "info": {
//       "text": "I worked for a compiler project"
//   }
// }
class Project extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModifyProject: false,
      name: props.name,
      content: props.content,
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleModifyProject = this.handleModifyProject.bind(this);
  }

  handleChange(e) {
    this.setState({content: e.target.value});
  }

  handleModifyProject(e) {
    e.preventDefault();
    this.setState({showModifyProject: false});
  }

  renderModifyProject() {
    if (this.state.showModifyProject) {
      return (
        <form onSubmit={this.handleModifyProject}>
          <input type="text" value={this.state.content} onChange={this.handleChange}/>
          <input type="submit" value="Submit"/>
        </form>
      )
    }
  }

  renderSelf() {
    if (!this.state.showModifyProject) {
      return (
        <div>
          <div className="template-name">{this.state.name}</div>
          <div className="template-content">{this.state.content}</div>
          <button onClick={
            () => this.setState({showModifyProject: true})}>Modify
          </button>
        </div>
      )
    }
  }

  render() {
    return (
      <div> 
        {this.renderSelf()}
        {this.renderModifyProject()}        
      </div>
    )
  }
}

class ProjectContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showAddProject: false, // to add new project
      newProject: '',
      projects: props.projects, // props are array of projects(string)
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleAddProject = this.handleAddProject.bind(this);
  }

  handleChange(e) {
    this.setState({newProject: e.target.value});
  }

  handleAddProject(e) {
    e.preventDefault()
    const projectsCopy = this.state.projects.slice();
    projectsCopy.push(this.state.newProject);
    this.setState({projects: projectsCopy, showAddProject: false});
  }

  renderAddProject() {
    if (this.state.showAddProject) {
      return (
        <form onSubmit={this.handleAddProject}>
            New project:
            <input type="text" onChange={this.handleChange}/>
          <input type="submit" value="Submit"/>
        </form>
      );
    }
  }

  render() {
    return (
      <div className="template-header">
        Project templates:
        <button onClick={
          () => this.setState({showAddProject: true})}>Add</button>
        <hr/>
        {this.renderAddProject()}
        {this.state.projects.map(
        (p) => <Project name={p.name} content={p.info.text} />
        )}
      </div>
    );
  }

}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: [],
      dataReceived: false
    }; // expect a list of projects from database
  }
  
  // invoked before render, fetch data from db here
  componentDidMount() {
    // will be directed to the proxy set up in package.json
    // which is supposed to be the nodejs backend
    // TODO: need to call db api to get all projects for an account
    // and then update state of App
    axios.get('/projects').then(res => {
      this.setState({
        projects: res.data,
        dataReceived: true
      });
      console.log(this.state.projects);
    });
  }

  render() {
    if (!this.state.dataReceived) {return null}
    return (
      <div>
        <ProjectContainer projects={this.state.projects}/>
      </div>
    );
  }
}

export default App;