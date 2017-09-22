import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

const API_KEY = "b028e8a2020af483";

class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      data: {},
      posts: []
    };

  };

  componentDidMount() {
    // move this out of component did mount to allow for user to enter a city and state and then fetch the data on the click
    axios.get(`http://api.wunderground.com/api/${API_KEY}/conditions/q/${state}/${city}.json`)
      .then(res => {
        const posts = res.data.data.children.map(obj => obj.data);
        this.setState({ posts });
      });
  }
  
  render() {
    
    return (
      <div className="App">
        
      </div>
    );
  }
}

export default App;
