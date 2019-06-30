import React, { Component } from "react";
import KeyboardKey from "./KeyboardKey";

export default class InfoPanel extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    return (
      <div id="InfoPanel">
        <table>
          <tbody>
            <tr>
              <th><KeyboardKey symbol={"Z"} /></th>
              <th>Undo</th> 
            </tr>
            <tr>
              <th><KeyboardKey symbol={"X"} /></th>
              <th>Redo</th> 
            </tr>
            <tr>
              <th><KeyboardKey symbol={"C"} /></th>
              <th>Toggle cross</th> 
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

