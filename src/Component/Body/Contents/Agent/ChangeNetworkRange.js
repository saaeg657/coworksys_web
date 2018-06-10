import React from 'react';
import NetworkRangeItem from './GroupItem.js';
import * as CommonData from '../../../../InformationData/CommonData.js';
import Axios from 'axios';
import * as properties from '../../../../Properties.js';
export default class ChangeNetworkRange extends React.Component {
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
        this.refresh = this.refresh.bind(this);
    }
    refresh() {
        let { dispatch } = this.props;
        let action_msg = RefreshPage(true);
        dispatch(action_msg)
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
        let { dispatch } = this.props;
        let action_msg = ActivePopup("", "", "");
        dispatch(action_msg);

        let IDlist = [];
        for (var i = 0; i < this.props.agentList.length; i++)
            IDlist = IDlist.concat(this.props.agentList[i].id);

        var header = {
            headers: {
                'Content-Type': "application/json; charset=utf-8",
            }
        };

        Axios.post(properties.ServerURL + '/coworksys/api/agentGroup/update/networkArea',
            {
                "agentGroupIDList": IDlist,
                "networkBeginArea": this.state.List[0],
                "networkEndArea": this.state.List[this.state.List[0].length - 1]
            }, header)
            .then(
            Response => {
                this.refresh();
                this.showMSG(Response, "에이전트 네트워크범위 수정");
            }
            );
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
            <div className="popup-localuser-addtogroup" style={{ left: "1120px", width: 450}}>
                <div className="div-popup-title" >
                    <div className="div-group-addtomember-title" style={{ width: 450, marginTop: 12, marginLeft: 30 }}>
                        <div>네트워크 범위111</div>
                    </div>
                </div>
                <div className="div-group-addtomember-wrapper" style={{ height: "960px" }}>
                    <div className="div-network-range-wrapper">
                        <div className="div-block-6">
                            <div>주소</div>
                        </div>
                        <div className="form-block-4 w-form">
                            <form data-name="Email Form" id="email-form" name="email-form">
                                <div className="div-block-35">
                                    <input className="text-field-7 w-input" onChange={this.onChange.bind(this, "currentIP")} value={this.state.currentIP} data-name="input" id="input" maxLength={256} name="input" type="text" />
                                    <a className="btn_blue_circle_nomargin w-button" onClick={this.addIP} href="#">+</a></div>
                            </form>
                            <div className="w-form-done">
                                <div></div>
                            </div>
                            <div className="w-form-fail">
                                <div></div>
                            </div>
                        </div>
                        <div className="div-block-36">
                            <ul className="unordered-list w-list-unstyled">
                                {mapToComponent(this.state.List)}
                            </ul>
                        </div>
                        <div className="div-block-37">
                            <div className="w-form">
                                <form data-name="Email Form 2" id="email-form-2" name="email-form-2">
                                    <div className="w-checkbox"><input onChange={this.onChange.bind(this, "applynow")} className="w-checkbox-input" id="node-4" type="checkbox" /><label className="w-form-label" htmlFor="node-4">변경한 네트워크 범위를 지금 적용합니다.</label></div>
                                    <div className="w-checkbox"><input onChange={this.onChange.bind(this, "sendemail")} className="w-checkbox-input" id="node-4" type="checkbox" /><label className="w-form-label" htmlFor="node-5">변경한 네트워크 범위를 아래 전자메일로 전송합니다.</label></div>
                                    <input className="w-input" data-name="Email" id="email" value={this.state.email} onChange={this.onChange.bind(this, "email")} maxLength={256} name="email" required="required" type="text" />
                                </form>
                                <div className="w-form-done">
                                    <div></div>
                                </div>
                                <div className="w-form-fail">
                                    <div></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="div-block-11"><a className="button-circle-gray-nomargin w-button" onClick={this.submit} href="#">확인</a>
                    </div>
                </div>
            </div>
        );

    }
};
