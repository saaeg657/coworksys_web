import React, { Component } from 'react';
import Axios from 'axios';

import ViewManager from './Controller/ViewManager.js';
import ActionManager from './Controller/ActionManager.js';

import Communicator from './Communicator/Communicator.js' ;
import * as properties from './Properties.js';
import * as util from './Util/Util.js' ; 


export var communicator = new Communicator() ; 



export default class App extends React.Component {
  
  constructor(props) {
        super(props);
        this.ActionManager = new ActionManager();
    }

  componentDidMount()
  {
    properties.UserUUID = util.generateUUID() ; 
    communicator.connect('ws://' + properties.TestServerURL + '/coworksys/websocket');
  }
  render() {
    return (
      <div className="div-app">
       <ViewManager ActionManager={this.ActionManager}/>       
      </div>
    );
  }
};

