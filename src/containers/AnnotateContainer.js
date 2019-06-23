import React, { Component } from 'react'
import axios from 'axios'
import AnnotatePage from '../components/AnnotatePage'
import config from '../config'
import queryString from 'qs'

export default class AnnotateContainer extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.loadImageURL = this.loadImageURL.bind(this);
    this.state = { imageURL: null };
  }

  componentDidMount() {
    this.loadImageURL();
  }

  loadImageURL() {
    // no server specified, use default cat pic
    
    if (config["server"] === null) {
      this.setState({ imageURL: require("../cat.jpg") });
    } else {
      // server is specified, get the imageURL from the API endpoint
      const taskId = this.props.match.params.taskId;
      console.log(taskId);
      const parsed = queryString.parse(this.props.location.search);
      
      axios.get(
        `${config["server"][process.env.NODE_ENV]}/boxes/${taskId}
        ?hitId=${parsed.hitId}
        &workerId=${parsed.workerId}
        &assignmentId=${parsed.assignmentId}`
      ).then(res => {
        console.log(res.data);
        this.setState({
          imageURL: res.data.imageUrl
        });
      })
      .catch(err => {
        console.log(err);
      });
    }
    console.log(this.state.imageURL);
  }

  render() {
    console.log(this.state.imageURL);
    return <AnnotatePage imageURL={this.state.imageURL} />
  }
}
