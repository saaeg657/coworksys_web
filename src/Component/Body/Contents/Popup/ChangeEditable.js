import React from 'react';
import * as CommonData from '../../../../InformationData/CommonData.js';
import ModelManager from '../../../../Controller/ModelManager.js';
import APIManager from '../../../../Controller/APIManager.js';
import * as util from '../../../../Util/Util.js';
/**
 * ChangeEditable
 * 
 * props 목록
 * PopupManager
 * 
 */

export default class ChangeEditable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isShow: false,
            popuptype: "default",
            password: "",
            passwordverify: "",
            edit: "",
            email: "",
            sendemail: false
        }
        this.show = this.show.bind(this);
        this.done = this.done.bind(this);
        this.onChangeNote = this.onChangeNote.bind(this);
        this.onChange = this.onChange.bind(this);
        this.responseAPICallback = this.responseAPICallback.bind(this);
        this.close = this.close.bind(this);
        this.showError = this.showError.bind(this);

    }
    showError(e) {
        alert(e);
    }
    close() {
        this.props.PopupManager.closeSubpopup();
        this.setState({
            isShow: false,
            popuptype: "default",
            password: "",
            passwordverify: "",
            edit: "",
            email: ""
        })
    }
    responseAPICallback(response, key) {
        console.log("Response-ChangeEdit", response, key);
    }
    onChange(event, value) {
        switch (event) {
            case "password":
                this.setState({ password: value.target.value });
                break;
            case "passwordverify":
                this.setState({ passwordverify: value.target.value });
                break;
            case "email":
                this.setState({ email: value.target.value });
                break;
            case "sendemail":
                this.setState({ sendemail: !this.state.sendemail });
                break;
        }
    }
    onChangeNote(e) {
        this.setState({ edit: e.target.value });
    }
    show(visible, type) {
        this.setState({ isShow: visible, popuptype: type });
    }
    done() {
        api = util.newAPICommand();
        var IDlist = [];
        switch (this.state.popuptype) {
            case "changenote":
                switch (CommonData.CurrentMenu) {
                    case "setting_user":
                        for (var i = 0; i < CommonData.bulkactionList.length; i++) {
                            var api = util.newAPICommand();
                            api.put(
                                "/coworksys", "/api/user/update/note", util.getDefaultHeader(),
                                {
                                    "userID": CommonData.bulkactionList[i].id,
                                    "note": this.state.edit
                                },
                                null,
                                null);
                            APIManager.requestAPI(
                                api.get("apikey"),
                                api.get("apicommand"),
                                api.get("apiheader"),
                                api.get("apibody"),
                                this.responseAPICallback,
                                api.get("apilistkey"));
                        }
                        this.showError("사용자의 설명이 변경되었습니다.");
                        break;
                    case "setting_group":
                        for (var i = 0; i < CommonData.bulkactionList.length; i++) {
                            var api = util.newAPICommand();
                            api.put(
                                "/coworksys", "/api/userGroup/update/note", util.getDefaultHeader(),
                                {
                                    "userGroupID": CommonData.bulkactionList[i].id,
                                    "note": this.state.edit
                                },
                                null,
                                null);
                            APIManager.requestAPI(
                                api.get("apikey"),
                                api.get("apicommand"),
                                api.get("apiheader"),
                                api.get("apibody"),
                                this.responseAPICallback,
                                api.get("apilistkey"));
                        }
                        this.showError("사용자 조직의 설명이 변경되었습니다.");
                        break;
                    case "device_group":
                        for (var i = 0; i < CommonData.bulkactionList.length; i++) {
                            var api = util.newAPICommand();
                            api.put(
                                "/coworksys", "/api/deviceGroup/update/note", util.getDefaultHeader(),
                                {
                                    "deviceGroupID": CommonData.bulkactionList[i].id,
                                    "note": this.state.edit
                                },
                                null,
                                null);
                            APIManager.requestAPI(
                                api.get("apikey"),
                                api.get("apicommand"),
                                api.get("apiheader"),
                                api.get("apibody"),
                                this.responseAPICallback,
                                api.get("apilistkey"));
                        }
                        this.showError("장치조직의 설명이 변경되었습니다.");
                        break;
                }

                break;
            case "changepassword":
                console.log(this.state.password, this.state.passwordverify)
                if (this.state.password.length == 0) {
                    this.showError("비밀번호를 입력해주세요.");
                    return;
                }
                else if (this.state.password != this.state.passwordverify) {
                    this.showError("비밀번호가 일치하지 않습니다.");
                    return;
                }
                for (var i = 0; i < CommonData.bulkactionList.length; i++) {
                    var api = util.newAPICommand();
                    api.put(
                        "/coworksys", "/api/user/update/password", util.getDefaultHeader(),
                        {
                            "userID": CommonData.bulkactionList[i].id,
                            "password": this.state.password
                        },
                        null,
                        null);
                    APIManager.requestAPI(
                        api.get("apikey"),
                        api.get("apicommand"),
                        api.get("apiheader"),
                        api.get("apibody"),
                        this.responseAPICallback,
                        api.get("apilistkey"));
                }
                this.showError("사용자의 비밀번호가 변경되었습니다.");
                break;
            case "changesecurity":
                break;
        }
        this.close();
    }
    render() {
        let html_password = <div className="popup-note" style={{ display: this.state.isShow ? "block" : "none", left: CommonData.selectedDevice != null ? 1055 : 1167 }}>
            <div className="div-popup-title">
                <div className="text_bold_white">비밀번호 변경하기</div>
            </div>
            <div className="div-resetpassword-wrapper">
                <div className="form-wrapper-password w-form">
                    <form className="form" data-name="Email Form 3" id="email-form-3" name="email-form-3">
                        <div className="text_bold_blue">비밀번호</div>
                        <input className="form-password w-input" data-name="Security key" onChange={this.onChange.bind(this, "password")} id="Security-key" maxLength={256} name="Security-key" required="required" type="password" />
                        <div className="div-spacer-h10" />
                        <div className="text_bold_blue">확인</div>
                        <input className="form-password w-input" data-name="Verify" onChange={this.onChange.bind(this, "passwordverify")} id="Verify" maxLength={256} name="Verify" required="required" type="password" />
                        <div className="div-form-checkbox-wrapper">
                            <div className="form-checkbox-text w-checkbox">
                                <img src={this.state.sendemail ? '../images/chkbox2_on.png' : '../images/chkbox2_off.png'} onClick={this.onChange.bind(null, "sendemail")} />
                                <label className="w-form-label" htmlFor="checkbox-2">변경된 비밀번호를 연결된 전자메일로 전달합니다.</label>
                            </div>
                        </div>
                        <div className="div-block-11"><a className="button-circle-gray-nomargin w-button" style={{ fontWeight: 700, fontSize: 17, marginTop:20 }} onClick={this.done} href="#">확인</a>
                        </div>
                    </form>
                    <div className="w-form-done">
                    </div>
                    <div className="w-form-fail">
                    </div>
                </div>
            </div>
        </div>

        let html = <div className="popup-note" style={{ display: this.state.isShow ? "block" : "none" }}>
            <div className="div-popup-title">
                <div>설명 변경하기</div>
            </div>
            <div className="div-note-wrapper">
                <div className="form-block-2">
                    <form className="form-3" data-name="Email Form 5" id="email-form-5" name="email-form-5">
                        <textarea className="text-field-2 w-input" id="field-2" maxLength="5000" onChange={this.onChangeNote} name="field-2" placeholder="" />
                        <div className="div-block-11">
                            <a className="button-circle-gray-nomargin w-button" style={{ fontWeight: 700, fontSize: 17,marginTop:450 }} onClick={this.done} href="#">확인</a>
                        </div>
                    </form>
                    <div className="w-form-done" />
                    <div className="w-form-fail" />
                </div>

            </div>
        </div>

        let html_security = <div className="popup-note" style={{ display: this.state.isShow ? "block" : "none" }}>
            <div className="div-popup-title">
                <div className="text_bold_white">보안키 변경하기</div>
            </div>
            <div className="div-resetpassword-wrapper">
                <div className="form-wrapper-password w-form">
                    <form className="form" data-name="Email Form 3" id="email-form-3" name="email-form-3">
                        <div className="text_bold_blue">보안키</div>
                        <input className="form-password w-input" data-name="Security key" onChange={this.onChange.bind(this, "password")} id="Security-key" maxLength={256} name="Security-key" required="required" type="password" />
                        <div className="div-spacer-h10" />
                        <div className="text_bold_blue">확인</div>
                        <input className="form-password w-input" data-name="Verify" onChange={this.onChange.bind(this, "passwordverify")} id="Verify" maxLength={256} name="Verify" required="required" type="password" />
                        <div className="div-form-checkbox-wrapper">
                            <div className="form-checkbox-text w-checkbox">
                                <img src={this.state.sendemail ? '../images/chkbox2_on.png' : '../images/chkbox2_off.png'} onClick={this.onChange.bind(null, "sendemail")} />
                                <label className="w-form-label" htmlFor="checkbox-2">변경된 보안키를 연결된 전자메일로 전달합니다.</label>
                            </div>
                            <input className="form-password" data-name="Email" id="email" value={this.state.email}
                                onChange={this.onChange.bind(this, "email")} maxLength={256} name="email" type="text" />
                        </div>
                        <div className="div-block-11"><a className="button-circle-gray-nomargin w-button" style={{ fontWeight: 700, fontSize: 17,marginTop:20 }} onClick={this.done} href="#">확인</a>
                        </div>
                    </form>

                </div>
            </div>
        </div>

        switch (this.state.popuptype) {
            case "changenote":
                return (html);
            case "changepassword":
                return (html_password)
            case "changesecurity":
                return (html_security)
        }
        return (<div />);
    }
}