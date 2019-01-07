import React from 'react';
import './index.css';
import axios from 'axios';


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
      id: props.id,
      name: props.name,
      content: props.content,
    };

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleContentChange = this.handleContentChange.bind(this);
    this.handleModifyProject = this.handleModifyProject.bind(this);
    this.handleDeleteProject = this.handleDeleteProject.bind(this);
  }

  // used to record typed text on the fly when user is entering a new project
  handleNameChange(e) {
    this.setState({name: e.target.value});
  }

  // used to record typed text on the fly when user is entering a new project
  handleContentChange(e) {
    this.setState({content: e.target.value});
  }

  handleModifyProject(e) {
    e.preventDefault();
    this.setState({showModifyProject: false});
    axios.post('/projects/update', {
      id: this.state.id,
      tag: 'project',
      name: this.state.name,
      text: this.state.content
    })
    .then(function (res) {
      // TODO: only reload with success response
      window.location.reload();
    })
    .catch(function (err) {
      console.log(err);
    });
  }

  handleDeleteProject(e) {
    e.preventDefault();
    axios.post('/projects/delete', {
      id: this.state.id,
      tag: 'project'
    })
    .then(function (res) {
      window.location.reload();
    })
    .catch(function (err) {
      console.log(err);
    });
  }

  renderModifyProject() {
    if (this.state.showModifyProject) {
      return (
        <form onSubmit={this.handleModifyProject}>
          <div>
            Name:
            <input type="text" value={this.state.name} onChange={this.handleNameChange}/>
            Description:
            <input type="text" value={this.state.content} onChange={this.handleContentChange}/>
            <input type="submit" value="Submit"/>
          </div>
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
          <button onClick={this.handleDeleteProject}>Delete</button>
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
      newName: '',
      newContent: '',
      projects: props.projects, // props are array of projects(string)
    };

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleContentChange = this.handleContentChange.bind(this);
    this.handleAddProject = this.handleAddProject.bind(this);
  }

  // used to record typed text on the fly when user is entering a new project
  handleNameChange(e) {
    this.setState({newName: e.target.value});
  }

  // used to record typed text on the fly when user is entering a new project
  handleContentChange(e) {
    this.setState({newContent: e.target.value});
  }

  handleAddProject(e) {
    e.preventDefault();
    // get id and account from server
    axios.post('/projects/put', {
      tag: 'project',
      name: this.state.newName,
      text: this.state.newContent
    })
    .then(function (res) {
      // TODO: only reload with success response
      window.location.reload();
    })
    .catch(function (err) {
      console.log(err);
    });
    // const p = this.state.newProject;
    // p.
    // const projectsCopy = this.state.projects.slice();
    // projectsCopy.push(this.state.newProject);
    // this.setState({projects: projectsCopy, showAddProject: false});
  }

  renderAddProject() {
    if (this.state.showAddProject) {
      return (
        <form onSubmit={this.handleAddProject}>
          <div>
            Name:
            <input type="text" onChange={this.handleNameChange}/>
            Description:
            <input type="text" onChange={this.handleContentChange}/>
            <input type="submit" value="Submit"/>
          </div>
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
        (p) => <Project id={p.id} name={p.name} content={p.info.text} />
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