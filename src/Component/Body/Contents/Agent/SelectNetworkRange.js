import React from 'react';
import Axios from 'axios';
import * as properties from '../../../../Properties.js';
import NetworkRangeItem from './GroupItem.js';
import * as CommonData from '../../../../InformationData/CommonData.js';

export default class SelectNetworkRange extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            List: [],
            currentIP: "",
            applynow: false,
            sendEmail: false,
            email: ""
        }
        this.showMSG = this.showMSG.bind(this);
        this.submit = this.submit.bind(this);
        this.addIP = this.addIP.bind(this);
        this.onChange = this.onChange.bind(this);
    }
    onChange(target, e) {
        switch (target) {
            case "currentIP":
                this.setState({ currentIP: e.target.value });
                break;
            case "email":
                this.setState({ email: e.target.value });
                break;
            case "applynow":
                this.setState({ applynow: e.target.checked });
                break;
            case "sendemail":
                this.setState({ sendEmail: e.target.checked });
                break;
        }
    }
    addIP() {
        if (this.state.currentIP.length == 0)
            return;

        this.setState({
            List: this.state.List.concat(this.state.currentIP),
            currentIP: ""
        });
    }
    submit() {
        CommonData.email = this.state.email;

        CommonData.clearData(CommonData.networkRangeList);
        CommonData.newAgent_network = this.state.List;

        CommonData.applyNow = this.state.applynow;
        CommonData.sendEmail = this.state.sendEmail;
        var value = "";
        if (this.state.List.length > 1) {
            value = this.state.List[0] + " 외 " + (this.state.List.length - 1).toString() + "개";
        }
        else if (this.state.List.length == 1) {
            value = this.state.List[0];
        }
        this.props.parent.props.parent.setAgentText("networkrange", value);
    }
    showMSG(Response, text) {
        let { dispatch } = this.props;
        let action_msg = ShowMessageBox(true, Response.status == 200 ? true : false, text, "Response");
        dispatch(action_msg);
    }

    render() {

        const mapToComponent = (data) => {
            return data.map((list, i) => {
                return (
                    <li className="ipaddress_item" key={i}>
                        <div>{list}</div>
                    </li>);
            });
        };
        return (
            <div className="popup-localuser-addtogroup" style={{ left: 1085, width: 450, height: 1030 }}>
                <div className="div-popup-title" style={{ width: 450, marginTop: 12, marginLeft: 11 }}>
                    <div className="div-group-addtomember-title">
                        <div>네트워크 범위</div>
                    </div>
                </div>
                <div className="div-group-addtomember-wrapper">
                    <div className="div-network-range-wrapper">
                        <div className="div-block-6">
                            <div>주소</div>
                        </div>
                        <div className="form-block-4 w-form">
                            <form data-name="Email Form" id="email-form" name="email-form">
                                <div className="div-block-35" style={{ marginBottom: 12, width: 380 }}>
                                    <input className="text-field-7 w-input" onChange={this.onChange.bind(this, "currentIP")} value={this.state.currentIP} data-name="input" id="input" maxLength={256} name="input" type="text" />
                                    <img src={'../images/plus.png'} onClick={this.addIP} style={{ cursor: "pointer", width: 26, height: 26, marginLeft: 12 }} />
                                </div>
                            </form>
                            <div className="w-form-done">
                                <div></div>
                            </div>
                            <div className="w-form-fail">
                                <div></div>
                            </div>
                        </div>
                        <div className="div-block-36" style={{ height: 630, marginBottom: 12 }}>
                            <ul className="unordered-list w-list-unstyled" style={{ height: 630 }}>
                                {mapToComponent(this.state.List)}
                            </ul>
                        </div>
                        <div className="div-block-37">
                            <div className="w-form">
                                <form data-name="Email Form 2" id="email-form-2" name="email-form-2">
                                    <div className="w-checkbox" style={{ marginBottom: 9 }}><input onChange={this.onChange.bind(this, "applynow")} className="w-checkbox-input" id="node-4" type="checkbox" />
                                        <label className="w-form-label" htmlFor="node-4">변경한 네트워크 범위를 지금 적용합니다.</label></div>

                                    <div className="w-checkbox" style={{ marginBottom: 6 }}><input onChange={this.onChange.bind(this, "sendemail")} className="w-checkbox-input" id="node-5" type="checkbox" />
                                        <label className="w-form-label" htmlFor="node-5">변경한 네트워크 범위를 아래 전자메일로 전송합니다.</label></div>
                                    <input className="text-field-7 w-input" style={{ width: 310 }} value={this.state.email} data-name="Email" id="email" name="input" onChange={this.onChange.bind(this, "email")} maxLength={256} type="text" />

                                </form>
                                <div className="w-form-done">
                                    <div></div>
                                </div>
                                <div className="w-form-fail">
                                    <div></div>
                                </div>
                            </div>
                        </div>
                        <div className="div-block-11" style={{ top: 960, height: 50 }}>
                            <div className="div-adduser-input"><a href="#" onClick={this.submit} style={{ marginTop: 70 }} className="button-adduser-summit w-button">확인</a></div>
                        </div>
                    </div>

                </div>
            </div>
        );



    }
};