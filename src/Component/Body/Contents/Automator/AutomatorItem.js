import React from 'react'
import * as CommonData from '../../../../InformationData/CommonData.js';
import * as util from '../../../../Util/Util.js';
export default class AutomatorItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isChecked: false};
        this.checkBoxCheckEvent = this.checkBoxCheckEvent.bind(this);
    }

    componentWillReceiveProps(nextProps) {

    }

    checkBoxCheckEvent(checkall) {
        if (this.state.isChecked == true) {
            this.setState({ isChecked: false });
            CommonData.removeData(CommonData.addItemList, this.props.automator);
        }
        else {
            this.setState({ isChecked: true });
            CommonData.addItemList = CommonData.setData(CommonData.addItemList, this.props.automator);
        }
    }
    render() {
        return (
            <div className="div-table-item-group" style={{ paddingLeft: 17 }} >
                <div className="div-table-checkbox">
                    <div className="form-wrapper-6 w-form">
                        <form data-name="Email Form 2" id="email-form-2" name="email-form-2">
                            <div className="checkbox-field-2 w-checkbox">
                                <input className="checkbox-item w-checkbox-input" onChange={this.checkBoxCheckEvent.bind(null,null)} id="node-3" type="checkbox" />
                                <label className="field-label w-form-label" htmlFor="node-4" />
                            </div>
                        </form>
                        <div className="w-form-done" />
                        <div className="w-form-fail" />
                    </div>
                </div>
                <div className="btn_blue_circle2 w-button" style={{ marginRight: "10px", width: 17, height: 17, backgroundColor: this.props.automator.agentStatus == "eConnected" ? "#463991" : "grey" }} />
                <div style={{ width: 100, float: "left", cursor: "pointer", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", paddingRight: 5 }}>{this.props.automator.name}</div>
                <div style={{ width: 155, paddingRight: 5 }}>{this.props.automator.ipAddress}</div>
                <div style={{ width: 150, float: "left", cursor: "pointer", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", paddingRight: 5 }}>{this.props.automator.deviceGroupName}</div>
                <div style={{ width: 150, float: "left", cursor: "pointer", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", paddingRight: 5 }}>{this.props.automator.currentUser}</div>
                <div style={{ width: 155 }}>{this.props.automator.automatorRunTime != undefined ? util.toDateString(this.props.automator.automatorRunTime) : '-'}</div>
                <div style={{ width: 130 }}>{this.props.automator.automatorRunTime != undefined ? util.toDateString(this.props.automator.automatorRunTime) : '-'}</div>
            </div>
        );
    };
}