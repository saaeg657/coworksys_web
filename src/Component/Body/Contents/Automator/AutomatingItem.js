import React from 'react';
import * as CommonData from '../../../../InformationData/CommonData.js';
import * as util from '../../../../Util/Util.js';
export default class AutomatingItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isChecked: this.props.checkall };
        this.checkBoxCheckEvent = this.checkBoxCheckEvent.bind(this);
        this.buttonActionEvent = this.buttonActionEvent.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props != nextProps) {
            if (nextProps.checkall != null && this.props.checkall != nextProps.checkall) {
                this.checkBoxCheckEvent(nextProps.checkall);
            }
        }
    }

    checkBoxCheckEvent(checkall) {
        if (checkall != null) {
            //이미 선택된 체크박스 예외처리
            if (checkall == true && this.state.isChecked == true) {
                return;
            }
            else if (checkall == true && this.state.isChecked == false) {
                this.setState({ isChecked: true });
                CommonData.bulkactionList = CommonData.setData(CommonData.bulkactionList, this.props.automator);
            }
            else if (checkall == false && this.state.isChecked == true) {
                this.setState({ isChecked: false });
                CommonData.removeData(CommonData.bulkactionList, this.props.automator);
            }
            else {
                return;
            }
        } else {
            if (this.state.isChecked == true) {
                this.setState({ isChecked: false });
                CommonData.removeData(CommonData.bulkactionList, this.props.automator);
            }
            else {
                this.setState({ isChecked: true });
                CommonData.bulkactionList = CommonData.setData(CommonData.bulkactionList, this.props.automator);
            }
        }
        this.props.ContentsArea.tableEvent_bulkaction();
    }
    buttonActionEvent(action) {
        CommonData.selectedAutomator = this.props.automator;
        this.props.ContentsArea.tableEvent_buttonEvent(action);
    }
    render() {
        return (
            <div >
                <div className="div-table-item-automator" style={{ backgroundColor: this.props.index % 2 == 1 ? "#ffffff" : "#f6f6f8", paddingLeft: 24 }}>
                    <div className="div-table-checkbox">
                        <div className="form-wrapper-6 w-form">
                            <form data-name="Email Form 2" id="email-form-2" name="email-form-2">
                                <div className="checkbox-field-2 w-checkbox">
                                    <input className="checkbox-item w-checkbox-input"
                                        checked={this.state.isChecked} onChange={this.checkBoxCheckEvent.bind(null, null)}
                                        id="node-3" type="checkbox" style={{ display: "none" }} />
                                    <img src={this.state.isChecked ? '../images/chkbox2_on.png' : '../images/chkbox2_off.png'} onClick={this.checkBoxCheckEvent.bind(null, null)} />
                                    <label className="field-label w-form-label" htmlFor="node-4" />
                                </div>
                            </form>
                            <div className="w-form-done" />
                            <div className="w-form-fail" />
                        </div>
                    </div>
                    <div className="div-table-username" style={{ width: 182, paddingRight: 10 , cursor:"pointer"}}
                        onClick={this.buttonActionEvent.bind(null, "automator")}>
                        {this.props.automator.name}
                    </div>
                    <div className="div-170" style={{ width: 170 }}>{this.props.automator.userName}
                    </div>
                    <div className="div-170" style={{ width: 110 }}>
                    </div>
                    <div className="div-150" style={{ width: 150 }}>{util.toDateStringYMDHHmmss_Short(this.props.automator.modifiedTime)}
                    </div>
                </div>
            </div>
        );
    };
}
