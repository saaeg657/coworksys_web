import React from 'react';
import SelectAutomator from './SelectAutomator';
import SelectGroup from './SelectGroup';
import SelectNetworkRange from './SelectNetworkRange';
import ChangeNetworkRange from './ChangeNetworkRange';

export default class AgentPopup extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                {this.props.popup == "selectautomator" ? <SelectAutomator /> : <div />}
                {this.props.popup == "selectgroup" ? <SelectGroup /> : <div />}
                {this.props.popup == "selectnetworkrange" ? <SelectNetworkRange parent={this}/> : <div />}
                {this.props.popup == "changenetworkrange" ? <ChangeNetworkRange /> : <div />}

            </div>
        );
    }
}