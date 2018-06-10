import React from 'react';
import * as CommonData from '../../../../InformationData/CommonData.js';
import * as util from '../../../../Util/Util.js';
import * as StringUtil from '../../../../Util/StringUtil.js';
import AddToGroup from './AddToGroup.js';
import APIManager from '../../../../Controller/APIManager.js';
import AgentPopup from '../Agent/AgentPopup.js';
import ChangeEditable from './ChangeEditable.js'
/**
 * AddNewItem
 * 
 * props 목록
 * PopupManager
 * 
 */

export default class AddNewItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isShow: true,
            permission: [],
            name: "",
            device_type: "",
            device_OS: "",
            note: "",
            acount: "",
            firstName: "",
            lastName: "",
            userName: "",
            email: "",
            password: "",
            passwordverify: "",
            agent_distribute: "",
            agent_automator: "",
            agent_group: "",
            agent_networkrange: "",
            agent_name: "",
            agent_sevicekey: "",
            agent_coworksysServer: "",
            agent_publishAddress: "",
            agent_begin: "",
            agent_end: "",
            agent_check_publish: false,
            agent_check_automator: false,
            agent_check_group: false,
            agent_check_network: false,
            agentpopup: "",
            changepassword_sendemail: false,
            permission_1: false,
            permission_2: false,
            permission_4: false,
            permission_8: false,
            permission_16: false,
            permission_32: false,
            permission_64: false,
            modifymode: true,
            startmember: []
        }
        this.show = this.show.bind(this);
        this.close = this.close.bind(this);
        this.changeName = this.changeName.bind(this);
        this.devicetype = this.devicetype.bind(this);
        this.deviceOS = this.deviceOS.bind(this);
        this.changenote = this.changenote.bind(this);
        this.openSecondPopup = this.openSecondPopup.bind(this);
        this.done = this.done.bind(this);
        this.responseAPICallback = this.responseAPICallback.bind(this);
        this.onChangeText = this.onChangeText.bind(this);

        this.onChange = this.onChange.bind(this);
        this.onChangeText = this.onChangeText.bind(this);
        this.onChangeAcount = this.onChangeAcount.bind(this);
        this.onChangeFiratName = this.onChangeFiratName.bind(this);
        this.onChangeLastName = this.onChangeLastName.bind(this);
        this.onChangeUserName = this.onChangeUserName.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangepassword = this.onChangepassword.bind(this);
        this.onChangepasswordverify = this.onChangepasswordverify.bind(this);
        this.onChangeNote = this.onChangeNote.bind(this);

        this.showChangePassword = this.showChangePassword.bind(this);

        ///새 에이전트
        this.selectAutomator = this.selectAutomator.bind(this);
        this.selectGroup = this.selectGroup.bind(this);
        this.selectNetworkRange = this.selectNetworkRange.bind(this);
        this.onMessage = this.onMessage.bind(this);

        this.setAgentText = this.setAgentText.bind(this);
        this.showError = this.showError.bind(this);
        this.setPermission = this.setPermission.bind(this);
        this.ModifyMode = this.ModifyMode.bind(this);
        this.SetDefaultMember = this.SetDefaultMember.bind(this);
    }
    SetDefaultMember(list) {
        this.setState({ startmember: list });
    }
    ModifyMode(mode) {
        this.setState({ modifymode: mode });
    }

    showError(msg) {
        alert(msg);
    }
    showChangePassword() {
        this.ChangeEditable.show(true, "changepassword");
    }
    selectAutomator() {
        this.secondPopup.show(true, "selectautomator", "autoinstall_automator");
    }
    selectGroup() {
        this.secondPopup.show(true, "device_group", "autoinstall_group");
    }
    selectNetworkRange() {
        this.setState({ agentpopup: "selectnetworkrange" });
    }
    setAgentText(target, value) {

        switch (target) {
            case "automator":
                this.setState({ agent_automator: value });
                break;
            case "networkrange":
                this.setState({ agent_networkrange: value, agentpopup: "" });
                break;
            case "group":
                this.setState({ agent_group: value });
                break;
        }
    }
    onMessage(message) {
        switch (message.command) {
            case "selectautomator":
                this.setState({
                    agent_automator: message.value
                });
                break;
            case "selectgroup":
                this.setState({
                    agent_group: message.value
                });
                break;
            case "selectnetworkrange":
                this.setState({
                    agent_networkrange: message.value,
                    agent_begin: message.networkRangeList[0],
                    agent_end: message.networkRangeList[message.networkRangeList.length - 1]
                });
                break;
        }
    }
    componentWillReceiveProps(nextProps) {

        if (this.props != nextProps) {
            if (CommonData.selectedDevice != null) {
                this.ModifyMode(false);
            }
            if (CommonData.selectedDevice != null && CommonData.selectedDevice.permission != null) {

                var p = CommonData.selectedDevice.permission;
                if (p == -1) {
                    this.setState({
                        permission_1: true,
                        permission_2: true,
                        permission_4: true,
                        permission_8: true,
                        permission_16: true,
                        permission_32: true,
                        permission_64: true
                    });
                    return;
                }

                this.setState({
                    permission_1: false,
                    permission_2: false,
                    permission_4: false,
                    permission_8: false,
                    permission_16: false,
                    permission_32: false,
                    permission_64: false
                });
                for (var i = 64; i != 1; i /= 2) {
                    if (p - i >= 0) {
                        this.setPermission(i, true);
                        p -= i;
                    } else
                        this.setPermission(i, false);

                }
                if (p - 1 >= 0)
                    this.setPermission(1, true);
                else
                    this.setPermission(1, false);

            }
        }
    }
    onChange(target, e) {
        switch (target) {
            case "note":
                this.setState({
                    note: e.target.value
                });
                break;
            case "name":
                this.setState({
                    agent_name: e.target.value
                });
                break;
            case "coworksys":
                this.setState({
                    agent_coworksysServer: e.target.value
                });
                break;
            case "securitykey":
                this.setState({
                    agent_sevicekey: e.target.value
                });
                break;
            case "publishaddress":
                this.setState({
                    agent_publishAddress: e.target.value
                });
                break;
            case "automator_check":
                this.setState({
                    agent_check_automator: !this.state.agent_check_automator
                });
                break;
            case "publish_check":
                this.setState({
                    agent_check_publish: !this.state.agent_check_publish
                });
                break;
            case "group_check":
                this.setState({
                    agent_check_group: !this.state.agent_check_group
                });
                break;
            case "network_check":
                this.setState({
                    agent_check_network: !this.state.agent_check_network
                });
                break;
            case "changepassword_sendemail":
                this.setState({
                    changepassword_sendemail: !this.state.changepassword_sendemail
                });
                break;
        }
    }

    onChangeText(target, e) {

        switch (target) {
            case "firstname":
                StringUtil.restrictALLSpecialKey(e.target);
                this.setState({ firstName: e.target.value });
                break;
            case "lastname":
                StringUtil.restrictALLSpecialKey(e.target);
                this.setState({ lastName: e.target.value });
                break;
            case "username":
                StringUtil.restrictALLSpecialKey(e.target);
                this.setState({ userName: e.target.value });
                break;
            case "email":
                StringUtil.restrictSpecialKeyForEmail(e.target);
                this.setState({ email: e.target.value });
                break;
        }

    }

    onChangeAcount(e) {
        this.setState({ acount: e.target.value });
    }
    onChangeFiratName(e) {
        StringUtil.restrictALLSpecialKey(e.target);
        this.setState({ firstName: e.target.value });
    }
    onChangeLastName(e) {
        this.setState({ lastName: e.target.value });
    }
    onChangeUserName(e) {
        this.setState({ userName: e.target.value });
    }
    onChangeEmail(e) {
        this.setState({ email: e.target.value });
    }
    onChangepassword(e) {
        this.setState({ password: e.target.value });
    }
    onChangepasswordverify(e) {
        this.setState({ passwordverify: e.target.value });
    }
    onChangeNote(e) {
        this.setState({ note: e.target.value });
    }
    setPermission(p, check) {
        switch (p) {
            case 1:
                this.setState({ permission_1: check != null ? check : !this.state.permission_1 });
                break;
            case 2:
                this.setState({ permission_2: check != null ? check : !this.state.permission_2 });
                break;
            case 4:
                this.setState({ permission_4: check != null ? check : !this.state.permission_4 });
                break;
            case 8:
                this.setState({ permission_8: check != null ? check : !this.state.permission_8 });
                break;
            case 16:
                this.setState({ permission_16: check != null ? check : !this.state.permission_16 });
                break;
            case 32:
                this.setState({ permission_32: check != null ? check : !this.state.permission_32 });
                break;
            case 64:
                this.setState({ permission_64: check != null ? check : !this.state.permission_64 });
                break;
        }
    }

    responseAPICallback(response, key) {

        if (key == null) {
            this.close();
            return;
        }

        var IDlist = [];
        switch (key) {
            case "deviceGroupID":
                var newAPI = util.newAPICommand();
                newAPI.put(
                    "/coworksys", "/api/device/insert/deviceGroup", util.getDefaultHeader(),
                    {
                        "deviceIDList": this.state.startmember,
                        "deviceGroupID": response.data[key]
                    },
                    null,
                    null);
                APIManager.requestAPI(
                    newAPI.get("apikey"),
                    newAPI.get("apicommand"),
                    newAPI.get("apiheader"),
                    newAPI.get("apibody"),
                    this.responseAPICallback,
                    newAPI.get("apilistkey"));
                this.setState({ startmember: [] });
                break;
        }

    }
    openSecondPopup(content, info) {
        this.secondPopup.show(true, content, info)
    }
    changeName(e) {
        this.setState({ name: e.target.value })
    }
    deviceOS(e) {
        this.setState({ device_OS: e.target.value })
    }
    devicetype(e) {
        this.setState({ device_type: e.target.value })
    }
    changenote(e) {
        this.setState({ note: e.target.value })
    }
    show(visibility) {

        if (CommonData.selectedDevice != null)
            this.ModifyMode(false);
        this.setState({ isShow: visibility });
    }
    done() {
        console.log("", this.props.popup.list[0].popuptype)
        switch (this.props.popup.list[0].popuptype) {
            case "add_user":
                if (this.state.firstName.length == 0) {
                    this.showError("성을 입력해주세요.");
                    return;
                }
                else if (this.state.lastName.length == 0) {
                    this.showError("이름을 입력해주세요.");
                    return;
                }
                else if (this.state.email.length == 0) {
                    this.showError("메일 주소를 입력해주세요.");
                    return;
                }
                else if (this.state.password.length == 0) {
                    this.showError("비밀번호를 입력해주세요.");
                    return;
                }
                else if (this.state.password != this.state.passwordverify) {
                    this.showError("비밀번호가 일치하지 않습니다.");
                    return;
                }

                var api = util.newAPICommand();
                api.put(
                    "/coworksys", "/api/user/insert", util.getDefaultHeader(),
                    {
                        "firstName": this.state.firstName,
                        "lastName": this.state.lastName,
                        "email": this.state.email,
                        "userName": this.state.firstName + " " + this.state.lastName,
                        "password": this.state.password,
                        "note": this.state.note,
                        "networkType": "eLocal"
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
                this.showError("사용자가 추가되었습니다.");
                break;
            case "modifydevicegroup":
                var name = this.state.name;
                var type = this.state.device_type;
                var os = this.state.device_OS;
                var note = this.state.note;
                if (this.state.name.length == 0) {
                    name = CommonData.selectedDevice.name;
                }
                if (this.state.device_type.length == 0) {
                    type = CommonData.selectedDevice.deviceGroupType;
                }
                if (this.state.device_OS.length == 0) {
                    os = CommonData.selectedDevice.deviceAdvancedOption;
                }
                if (this.state.note.length == 0) {
                    if (CommonData.selectedDevice.note != null)
                        note = CommonData.selectedDevice.note;
                    else
                        note = "";
                }
                ///디바이스 조직 업데이트 API
                var api = util.newAPICommand();
                var body = {
                    "deviceGroupID": CommonData.selectedDevice.id,
                    "note": note,
                    "deviceGroupType": type,
                    "deviceAdvancedOption": os,
                    "name": name
                };
                console.log("body", body,this.state)
                api.put(
                    "/coworksys", "/api/deviceGroup/update/note", util.getDefaultHeader(),
                    body,
                    null,
                    null);
                APIManager.requestAPI(
                    api.get("apikey"),
                    api.get("apicommand"),
                    api.get("apiheader"),
                    api.get("apibody"),
                    this.responseAPICallback,
                    api.get("apilistkey"));

                break;
            case "adddevicegroup":
                var type = this.state.device_type;
                var os = this.state.device_OS;
                if (this.state.name.length == 0) {
                    this.showError("이름을 입력해주세요.");
                    return;
                }
                if (type.length == 0) {
                    type = "eManagedGroup";
                }
                if (os.length == 0) {
                    os = "eNon";
                }
                var api = util.newAPICommand();
                api.put(
                    "/coworksys", "/api/deviceGroup/insert", util.getDefaultHeader(),
                    {
                        "name": this.state.name,
                        "deviceGroupType": type,
                        "deviceAdvancedOption": os,
                        "permission": 1
                    },
                    null,
                    "deviceGroupID");
                APIManager.requestAPI(
                    api.get("apikey"),
                    api.get("apicommand"),
                    api.get("apiheader"),
                    api.get("apibody"),
                    this.responseAPICallback,
                    api.get("apilistkey"));
                this.showError("장치 조직이 추가되었습니다.");
                break;
            case "add_user_group":
                if (CommonData.selectedDevice != null) {
                    this.close();
                    return;
                }

                if (this.state.name.length == 0) {
                    this.showError("이름을 입력해주세요.");
                    return;
                }

                var IDlist = [];
                for (var i = 0; i < CommonData.addItemList.length; i++)
                    IDlist = IDlist.concat(CommonData.addItemList[i].id);

                var p = 0;
                p += this.state.permission_1 ? 1 : 0;
                p += this.state.permission_2 ? 2 : 0;
                p += this.state.permission_4 ? 4 : 0;
                p += this.state.permission_8 ? 8 : 0;
                p += this.state.permission_16 ? 16 : 0;
                p += this.state.permission_32 ? 32 : 0;
                p += this.state.permission_64 ? 64 : 0;
                if (p == 127)
                    p = -1;
                var api = util.newAPICommand();
                api.put(
                    "/coworksys", "/api/userGroup/insert", util.getDefaultHeader(),
                    {
                        "name": this.state.name,
                        "note": this.state.note,
                        "userList": IDlist,
                        "permission": p
                    },
                    null,
                    null);
                var body = {
                    "name": this.state.name,
                    "note": this.state.note,
                    "userList": IDlist,
                    "permission": p
                }

                APIManager.requestAPI(
                    api.get("apikey"),
                    api.get("apicommand"),
                    api.get("apiheader"),
                    api.get("apibody"),
                    this.responseAPICallback,
                    api.get("apilistkey"));
                this.showError("사용자 조직이 추가되었습니다.");
                break;
            case "add_agent_group":
                if (this.state.agent_name.length == 0) {
                    this.showError("에이전트 이름을 입력해주세요.");
                    return;
                }
                if (this.state.agent_coworksysServer.length == 0) {
                    this.showError("CoworkSys 주소를 입력해주세요.");
                    return;
                }
                if (this.state.agent_check_publish == true) {
                    if (this.state.agent_publishAddress.length == 0) {
                        this.showError("배포할 주소를 입력해주세요.");
                        return;
                    }
                }
                else
                    this.setState({ agent_publishAddress: "" });

                if (this.state.agent_check_automator == true) {
                    if (CommonData.newAgent_automator.length == 0) {
                        this.showError("오토메이터를 입력해주세요.");
                        return;
                    }
                }
                else
                    CommonData.clearData(CommonData.newAgent_automator);

                if (this.state.agent_check_group == true) {
                    if (CommonData.newAgent_group.length == 0) {
                        this.showError("장치 조직을 입력해주세요.");
                        return;
                    }
                }
                else
                    CommonData.clearData(CommonData.newAgent_group);

                if (this.state.agent_check_network == true) {
                    if (CommonData.newAgent_network.length == 0) {
                        this.showError("네트워크 범위를 입력해주세요.");
                        return;
                    }
                }
                else {
                    CommonData.clearData(CommonData.newAgent_network);
                }

                var aList = [];
                if (CommonData.newAgent_automator != undefined) {
                    for (var i = 0; i < CommonData.newAgent_automator.length; i++) {
                        aList = aList.concat(CommonData.newAgent_automator[i].id);
                    }
                }
                var dList = [];
                if (CommonData.newAgent_group != undefined) {
                    for (var i = 0; i < CommonData.newAgent_group.length; i++) {
                        dList = dList.concat(CommonData.newAgent_group[i].id);
                    }
                }
                var body = {
                    "name": this.state.agent_name,
                    "deviceGroupIDList": dList,
                    "automatorIDList": aList,
                    "coworksysServer": this.state.agent_coworksysServer,
                    "publishAddress": this.state.agent_publishAddress,
                    "note": this.state.note,
                    "networkBeginArea": CommonData.newAgent_network[0] != null ? CommonData.newAgent_network[0] : "",
                    "networkEndArea": CommonData.newAgent_network.length > 0 ? CommonData.newAgent_network[CommonData.newAgent_network.length - 1] : "",
                    "userID": 1,
                    "version": "1.0.0"
                }

                var api = util.newAPICommand();
                api.put(
                    "/coworksys", "/api/agentGroup/insert", util.getDefaultHeader(),
                    body,
                    null,
                    "deviceGroupID");
                APIManager.requestAPI(
                    api.get("apikey"),
                    api.get("apicommand"),
                    api.get("apiheader"),
                    body,
                    this.responseAPICallback,
                    null);
                this.setState({
                    agent_distribute: "",
                    agent_automator: "",
                    agent_group: "",
                    agent_networkrange: "",
                    agent_name: "",
                    agent_sevicekey: "",
                    agent_coworksysServer: "",
                    agent_publishAddress: "",
                    agent_begin: "",
                    agent_end: "",
                    agent_check_publish: false,
                    agent_check_automator: false,
                    agent_check_group: false,
                    agent_check_network: false,
                    agentpopup: ""
                })
                CommonData.clearData(CommonData.newAgent_automator);
                CommonData.clearData(CommonData.newAgent_group);
                CommonData.clearData(CommonData.newAgent_network);
                CommonData.applyNow = false;
                CommonData.email = "";
                CommonData.sendEmail = false;
                this.showError("에이전트 조직이 추가되었습니다.");
                break;
        }
        this.close();
    }
    close() {
        this.props.PopupManager.close();
        CommonData.selectedDevice = null;
        if (this.secondPopup != null)
            this.secondPopup.show(false);
        this.setState({
            agentpopup: "",
            firstName: "",
            name: "",
            lastName: "",
            device_type: "",
            device_OS: "",
            note: ""
        });
    }


    render() {

        let html_devicegroup =
            <div className="div-addgroup-devicegroup">
                <div className="div-adduser-title">
                    <div className="div-bulk-close" style={{ marginTop: 5 }}>
                        <img src="../images/write.png" onClick={this.ModifyMode.bind(null, !this.state.modifymode)} width={20} height={20} style={{ display: CommonData.selectedDevice != null ? "block" : "none", marginRight: 5, cursor: "pointer" }} />
                        <img src="../images/close_white.png" width={20} height={20} onClick={this.close} />
                    </div>
                </div>
                <div className="form-adduser w-form">
                    <form id="email-form-4" name="email-form-4" data-name="Email Form 4" className="form-2">
                        <div className="div-adduser-preview"><label htmlFor="UserName-7" className="field-label-8">조직 이름</label>
                            <input type="text" id="name-7" onChange={this.changeName} name="name-7" data-name="Name 7" maxLength={256} className="text-adduser w-input"
                                defaultValue={CommonData.selectedDevice != null ? CommonData.selectedDevice.name : ""}
                                style={{ width: 175, height: 37, marginLeft: 12, borderColor: CommonData.selectedDevice != null ? "#3588d8" : "" }}
                                disabled={!this.state.modifymode} /></div>
                        <div className="div-form-checkbox-wrapper" style={{ marginTop: 38 }}><label htmlFor="UserName" className="field-label-8" style={{ marginBottom: 11 }}>종류</label>
                            <div className="form-radio-text w-radio">
                                <input type="radio" id="manageddevice" name="GroupType"
                                    disabled={!this.state.modifymode}
                                    defaultChecked={CommonData.selectedDevice != null ? CommonData.selectedDevice.deviceGroupType == "eManagedGroup" ? true : false : true}
                                    onClick={this.devicetype} defaultValue="eManagedGroup" data-name="GroupType" className="w-radio-input" /><label htmlFor="manageddevice" className="w-form-label">Managed device group</label></div>
                            <div className="form-radio-text w-radio">
                                <input type="radio" id="unmanageddevice" name="GroupType"
                                    disabled={!this.state.modifymode}
                                    defaultChecked={CommonData.selectedDevice != null ? CommonData.selectedDevice.deviceGroupType == "eUnmanagedGroup" ? true : false : false}
                                    onClick={this.devicetype} defaultValue="eUnmanagedGroup" data-name="GroupType" className="w-radio-input" /><label htmlFor="unmanageddevice" className="w-form-label">Un-managed device group</label></div>
                            <div className="form-radio-text w-radio">
                                <input type="radio" id="asset" name="GroupType" defaultValue="eAssetGroup"
                                    disabled={!this.state.modifymode}
                                    defaultChecked={CommonData.selectedDevice != null ? CommonData.selectedDevice.deviceGroupType == "eAssetGroup" ? true : false : false}
                                    onClick={this.devicetype} data-name="GroupType" className="w-radio-input" /><label htmlFor="asset" className="w-form-label">Asset group</label></div>
                        </div>
                        <div className="div-form-checkbox-wrapper" style={{ marginTop: 57 }}><label htmlFor="UserName" className="field-label-8" style={{ marginBottom: 11 }}>Advanced Option</label>
                            <div className="form-radio-text w-radio">
                                <input type="radio" id="Mac"
                                    disabled={!this.state.modifymode}
                                    defaultChecked={CommonData.selectedDevice != null ? CommonData.selectedDevice.deviceAdvancedOption == "eMacOsOnly" ? true : false : false} onClick={this.deviceOS} name="Advanced-Option" defaultValue="eMacOsOnly" data-name="Advanced Option" className="w-radio-input" /><label htmlFor="Mac" className="w-form-label">Mac OS only</label></div>
                            <div className="form-radio-text w-radio">
                                <input type="radio" id="windows"
                                    disabled={!this.state.modifymode}
                                    defaultChecked={CommonData.selectedDevice != null ? CommonData.selectedDevice.deviceAdvancedOption == "eWindowsOnly" ? true : false : false} onClick={this.deviceOS} name="Advanced-Option" defaultValue="eWindowsOnly" data-name="Advanced Option" className="w-radio-input" /><label htmlFor="windows" className="w-form-label">Windows only</label></div>
                            <div className="form-radio-text w-radio">
                                <input type="radio" id="all"
                                    disabled={!this.state.modifymode}
                                    defaultChecked={CommonData.selectedDevice != null ? CommonData.selectedDevice.deviceAdvancedOption == "eNon" ? true : false : true} onClick={this.deviceOS} name="Advanced-Option" defaultValue="eNon" data-name="Advanced Option" className="w-radio-input" /><label htmlFor="all" className="w-form-label">모두</label></div>
                        </div>
                        <div className="div-centeralign-h50">
                            <a href="#" className="button-roundrectangle w-button" onClick={this.openSecondPopup.bind(null, CommonData.selectedDevice != null ? "getdevicefromgroup" : "device_device", "adddevicegroup")}
                                style={{ marginTop: 58, width: 140, height: 35, paddingTop: 6, fontWeight: 700, fontSize: "12pt", letterSpacing: -2, backgroundColor: "#364aae"/*backgroundColor: CommonData.selectedDevice != null ? "#364aae" : "#999"*/ }}>{CommonData.selectedDevice != null ? "구성원 보기" : "구성원 추가하기"}</a></div>
                    </form>
                    <div className="w-form-done" />
                    <div className="w-form-fail" />
                </div>
                <div className="form-block-5 w-form">
                    <form id="email-form-5" name="email-form-5" data-name="Email Form 5" className="form-6" style={{ marginTop: 40 }}>
                        <div className="div-adduser-note"><label htmlFor="Note-5" className="text-adduser-18" style={{ fontSize: "11pt" }}>설명</label></div>
                        <textarea
                            disabled={!this.state.modifymode}
                            id="Note-4" onChange={this.changenote} name="Note-4" maxLength={5000} data-name="Note 4" className="textarea-2 w-input" defaultValue={CommonData.selectedDevice != null && CommonData.selectedDevice.note ? CommonData.selectedDevice.note : ""} />
                        <div className="div-adduser-input" style={{ marginTop: 40 }}><a href="#" onClick={this.done} className="button-adduser-summit w-button">확인</a></div>
                    </form>
                    <div className="w-form-done">
                    </div>
                    <div className="w-form-fail">
                    </div>
                </div>
            </div>

        let html_adduser =
            <div className="div-addgroup-devicegroup" >
                <div className="div-adduser-title">
                    <div className="div-bulk-close" >
                        <img src="../images/close_white.png" width={20} height={20} onClick={this.close} />
                    </div>
                </div>
                <div className="form-adduser w-form">
                    <form id="email-form-4" name="email-form-4" data-name="Email Form 4" className="form-2"
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center"
                        }}>


                        <div className="row w-row" width={400} style={{ marginTop: 18 }}>
                            <div className="column-3 w-col w-col-6">
                                <label className="field-label-8" style={{ fontSize: "11pt", marginLeft: 25 }} htmlFor="First-Name">성</label>
                                <input className="text-adduser w-input"
                                    data-name="First Name" id="First-Name"
                                    defaultValue={CommonData.selectedDevice != null ? CommonData.selectedDevice.firstName : ""}
                                    style={{
                                        border: this.state.firstName.length > 0 ? "1px solid #7795cf" : "1px solid #ff3330",
                                        width: 118,
                                        height: 37, marginLeft: 30
                                    }} onChange={this.onChangeText.bind(this, "firstname")} maxLength={256} name="First-Name" type="text" />
                            </div>

                            <div className="column-3 w-col w-col-6">
                                <label className="field-label-8" style={{ fontSize: "11pt", marginLeft: -15 }} htmlFor="Last-Name">이름</label>
                                <input className="text-adduser w-input" data-name="Last Name" id="Last-Name"
                                    defaultValue={CommonData.selectedDevice != null ? CommonData.selectedDevice.lastName : ""}
                                    style={{
                                        border: this.state.firstName.length > 0 ? "1px solid #7795cf" : "1px solid #ff3330",
                                        width: 118,
                                        height: 37, marginLeft: 8
                                    }} onChange={this.onChangeText.bind(this, "lastname")} maxLength={256} name="Last-Name" type="text" />
                            </div>
                        </div>
                        <div className="div-adduser-preview" style={{ marginTop: 15, width: 177 }}>
                            <label className="field-label-8" style={{ fontSize: "11pt", width: 177 }} htmlFor="First-Name">사용자 이름</label>
                            <div className="text-adduser w-input" style={{
                                border: "1px solid #333",
                                height: 38, width: 177
                            }}>{this.state.firstName + " " + this.state.lastName}</div>
                        </div>

                        <div className="div-adduser-input" style={{ marginTop: 15 }}>
                            <label className="field-label-8" style={{ fontSize: "11pt", width: 177 }} htmlFor="UserName-4">메일 주소</label>
                            <input className="text-adduser w-input" data-name="User Name 4"
                                defaultValue={CommonData.selectedDevice != null ? CommonData.selectedDevice.email : ""}
                                style={{ border: "1px solid #333", height: 38, width: 177 }} id="UserName-4" onChange={this.onChangeText.bind(this, "email")} maxLength={256} name="UserName-4" type="text" />
                        </div>

                        {CommonData.selectedDevice != null ?
                            <div className="div-changepassword" style={{ top: 315, left: 20, display: CommonData.selectedDevice != null ? "block" : "none" }}>
                                <div className="div-changepassword-round" style={{ marginTop: 65, marginLeft: 65, cursor: "pointer" }}>
                                    <div onClick={this.showChangePassword}>Change the Password</div>
                                </div>
                            </div>
                            :
                            <div>
                                <div className="div-adduser-input" style={{ marginTop: 20 }}>
                                    <label className="field-label-8" style={{ fontSize: "11pt" }} htmlFor="UserName-3">비밀번호</label>
                                    <input className="text-adduser w-input" data-name="User Name 3"
                                        style={{ border: this.state.password.length > 0 ? "1px solid #7795cf" : "1px solid #ff3330", height: 38, width: 177, marginTop: 1 }} id="UserName-3" onChange={this.onChangepassword} maxLength={256} name="UserName-3" type="password" />
                                </div>
                                <div className="div-adduser-input" style={{ marginTop: 15 }}>
                                    <label className="field-label-8" style={{ fontSize: "11pt" }} htmlFor="UserName-2">비밀번호 확인</label>
                                    <input className="text-adduser w-input" data-name="User Name 2"
                                        style={{ border: this.state.passwordverify.length > 0 ? "1px solid #7795cf" : "1px solid #ff3330", height: 38, width: 177 }} id="UserName-2" onChange={this.onChangepasswordverify} maxLength={256} name="UserName-2" type="password" />
                                </div>
                            </div>
                        }

                        <div className="div-form-checkbox-wrapper" style={{ marginTop: 18 }}>
                            <div className="form-checkbox-text w-checkbox">
                                <input style={{ display: "none" }} className="w-checkbox-input" data-name="Checkbox 4" id="check-password-info" name="checkbox-4" type="checkbox" />
                                <img src={this.state.changepassword_sendemail ? '../images/chkbox2_on.png' : '../images/chkbox2_off.png'} onClick={this.onChange.bind(null, "changepassword_sendemail")} />
                                <label className="w-form-label" htmlFor="check-sendkey-toemail">변경된 보안키를 연결된 전자메일로 전달합니다.</label>
                            </div>
                            <div className="form-checkbox-text w-checkbox">
                                <input style={{ display: "none" }} className="w-checkbox-input" data-name="Checkbox 5" id="check-sendkey-toemail" name="check-sendkey-toemail" type="checkbox" />
                                <label className="w-form-label" htmlFor="check-password-info">처음 로그인 시 비밀번호를 변경해야합니다.</label>
                            </div>
                        </div>
                    </form>
                    <div className="w-form-done" />
                    <div className="w-form-fail" />
                </div>
                <div className="form-block-5 w-form">
                    <form id="email-form-5" name="email-form-5" data-name="Email Form 5" className="form-6" style={{ marginTop: 0 }}>
                        <div className="div-adduser-note"><label htmlFor="Note-5" className="text-adduser-18" style={{ fontSize: "11pt" }}>설명</label></div><textarea id="Note-4" onChange={this.changenote} name="Note-4" maxLength={5000} data-name="Note 4" className="textarea-2 w-input" defaultValue={""} />
                        <div className="div-adduser-input" style={{ marginTop: 30 }}><a href="#" onClick={this.done} className="button-adduser-summit w-button">확인</a></div>
                    </form>
                    <div className="w-form-done">
                    </div>
                    <div className="w-form-fail">
                    </div>
                </div>
            </div>

        let html_usergroup =
            <div className="div-addgroup-devicegroup" >
                <div className="div-adduser-title">
                    <div className="div-bulk-close" style={{ marginTop: 5 }}>
                        <img src="../images/write.png" width={20} height={20} style={{ marginRight: 5 }} />
                        <img src="../images/close_white.png" width={20} height={20} onClick={this.close} />
                    </div>
                </div>
                <div className="form-adduser w-form">
                    <form id="email-form-4" name="email-form-4" data-name="Email Form 4" className="form-2">
                        <div className="div-adduser-preview"><label htmlFor="UserName-7" className="field-label-8"
                            style={{
                                marginTop: 6,
                                marginBottom: 4,
                                letterSpacing: -0.5
                            }}>조직 이름</label>
                            <input type="text" id="name-7" onChange={this.changeName}
                                defaultValue={CommonData.selectedDevice != null ? CommonData.selectedDevice.name : ""}
                                name="name-7" data-name="Name 7" maxLength={256} className="text-adduser w-input" style={{ height: 36 }}
                                style={{ border: "1px solid #333" }} /></div>
                        <div className="div-form-checkbox-wrapper" style={{ width: 255, marginTop: 47, marginLeft: 20 }}>
                            <label htmlFor="UserName" className="field-label-8" style={{ marginLeft: -25 }}>권한</label>
                            <div className="div-form-permission-checkbox"
                                style={{ width: 315, marginLeft: 0 }}>
                                <div className="form-checkbox-text w-checkbox" style={{ width: 150, marginBottom: 7 }}>
                                    <img style={{ marginRight: 5 }} src={this.state.permission_1 ? '../images/chkbox2_on.png' : '../images/chkbox2_off.png'} onClick={this.setPermission.bind(null, 1, null)} />
                                    <label className="w-form-label" onClick={this.setPermission.bind(null, 1, null)}>장치관리자</label>
                                </div>
                                <div className="form-checkbox-text w-checkbox" style={{ width: 150, marginBottom: 7 }}>
                                </div>
                                <div className="form-checkbox-text w-checkbox" style={{ width: 150, marginBottom: 7 }}>
                                    <img style={{ marginRight: 5 }} src={this.state.permission_2 ? '../images/chkbox2_on.png' : '../images/chkbox2_off.png'} onClick={this.setPermission.bind(null, 2, null)} />
                                    <label className="w-form-label" onClick={this.setPermission.bind(null, 2, null)}>원격접속</label>
                                </div>
                                <div className="form-checkbox-text w-checkbox" style={{ marginLeft: 13, width: 150, marginBottom: 7 }}>
                                    <img style={{ marginRight: 5 }} src={this.state.permission_4 ? '../images/chkbox2_on.png' : '../images/chkbox2_off.png'} onClick={this.setPermission.bind(null, 4, null)} />
                                    <label className="w-form-label" onClick={this.setPermission.bind(null, 4, null)} >원격제어</label>
                                </div>
                                <div className="form-checkbox-text w-checkbox" style={{ width: 150, marginBottom: 7 }}>
                                    <img style={{ marginRight: 5 }} src={this.state.permission_8 ? '../images/chkbox2_on.png' : '../images/chkbox2_off.png'} onClick={this.setPermission.bind(null, 8, null)} />
                                    <label className="w-form-label" onClick={this.setPermission.bind(null, 8, null)} htmlFor="checkbox-6">오토메이터</label>
                                </div>
                                <div className="form-checkbox-text w-checkbox" style={{ marginLeft: 13, width: 150, marginBottom: 7 }}>
                                    <img style={{ marginRight: 5 }} src={this.state.permission_16 ? '../images/chkbox2_on.png' : '../images/chkbox2_off.png'} onClick={this.setPermission.bind(null, 16, null)} />
                                    <label className="w-form-label" onClick={this.setPermission.bind(null, 16, null)}>고급 오토메이터</label>
                                </div>
                                <div className="form-checkbox-text w-checkbox" style={{ width: 150, marginBottom: 7 }}>
                                    <img style={{ marginRight: 5 }} src={this.state.permission_32 ? '../images/chkbox2_on.png' : '../images/chkbox2_off.png'} onClick={this.setPermission.bind(null, 32, null)} />
                                    <label className="w-form-label" onClick={this.setPermission.bind(null, 32, null)}>자산정보 관리자</label>
                                </div>
                                <div className="form-checkbox-text w-checkbox" style={{ width: 150, marginBottom: 7 }}>
                                </div>
                                <div className="form-checkbox-text w-checkbox" style={{ width: 150, marginBottom: 7 }}>
                                    <img style={{ marginRight: 5 }} src={this.state.permission_64 ? '../images/chkbox2_on.png' : '../images/chkbox2_off.png'} onClick={this.setPermission.bind(null, 64, null)} />
                                    <label className="w-form-label" onClick={this.setPermission.bind(null, 64, null)}>비밀번호 관리자</label>
                                </div>
                            </div>
                        </div>
                        <div className="div-centeralign-h50">
                            <a href="#" className="button-roundrectangle w-button"
                                onClick={this.openSecondPopup.bind(null, CommonData.selectedDevice != null ? "getuserfromgroup" : "setting_user", "adduser_togroup")}
                                style={{
                                    fontWeight: 700,
                                    marginTop: 30,
                                    fontSize: "12pt",
                                    width: 140,
                                    height: 36,
                                    paddingTop: 7,
                                    letterSpacing: -1,
                                    backgroundColor: CommonData.selectedDevice != null ? "#364aae" : "#999"
                                }}>{CommonData.selectedDevice != null ? "구성원 보기" : "구성원 추가하기"}</a></div>
                    </form>
                    <div className="w-form-done" />
                    <div className="w-form-fail" />
                </div>
                <div className="form-block-5 w-form">
                    <form id="email-form-5" name="email-form-5" data-name="Email Form 5" className="form-6" style={{ marginTop: 88 }}>
                        <div className="div-adduser-note"><label htmlFor="Note-5" className="text-adduser-18">설명</label></div><textarea id="Note-4" onChange={this.changenote} name="Note-4" maxLength={5000} data-name="Note 4" className="textarea-2 w-input" defaultValue={""} />
                        <div className="div-adduser-input" style={{ marginTop: 57 }}><a href="#" onClick={this.done} className="button-adduser-summit w-button">확인</a></div>
                    </form>
                    <div className="w-form-done">
                    </div>
                    <div className="w-form-fail">
                    </div>
                </div>
            </div>

        var html_addagent_group =
            <div className="div-addgroup-devicegroup" >
                <div className="div-adduser-title">
                    <div className="div-bulk-close" style={{ marginTop: 5 }}>
                        <img src="../images/write.png" width={20} height={20} style={{ marginRight: 5 }} />
                        <img src="../images/close_white.png" width={20} height={20} onClick={this.close} />
                    </div>
                </div>
                <div className="form-adduser w-form">
                    <form className="form-2" data-name="Email Form 4" id="email-form-4" name="email-form-4">
                        <div className="row w-row" style={{ marginTop: "0px", display: "flex", flexDirection: "column" }}>
                            <div className="div-adduser-input" style={{ marginTop: 9 }}>
                                <label className="field-label-8" htmlFor="UserName" >에이전트</label>
                                <input className="text-adduser-username w-input" data-name="UserName" id="UserName"
                                    onChange={this.onChange.bind(this, "name")}
                                    maxLength={256} name="UserName" type="text"
                                    style={{
                                        width: 180,
                                        border: this.state.agent_name.length > 0 ? "1px solid #333" : "1px solid #ff3330"
                                    }} />
                            </div>
                            <div className="div-adduser-input" style={{ marginTop: 2 }}>
                                <label className="field-label-8" htmlFor="UserName">에이전트 고유번호</label>
                                <div className="text-adduser-username w-input"
                                    onChange={this.onChange.bind(this, "securitykey")} maxLength={256} name="UserName" type="text"
                                    style={{ width: 180, border: "1px solid #333" }} />
                            </div>
                            <div className="div-adduser-input" style={{ marginTop: 2 }}>
                                <label className="field-label-8" htmlFor="UserName-4">coworksys 주소</label>
                                <input className="text-adduser-username w-input" data-name="User Name 4" id="UserName-4"
                                    onChange={this.onChange.bind(this, "coworksys")} maxLength={256} name="UserName-4" type="text"
                                    style={{
                                        width: 180,
                                        border: this.state.agent_coworksysServer.length > 0 ? "1px solid #333" : "1px solid #ff3330"
                                    }} />
                            </div>
                            <div style={{ fontSize: "17px", marginTop: 29, fontWeight: 700, marginBottom: 8 }}>고급 설정</div>
                            <div className="form-checkbox-text w-checkbox" style={{ marginTop: 1, marginLeft: -25 }}>
                                <img src={this.state.agent_check_publish ? '../images/chkbox2_on.png' : '../images/chkbox2_off.png'} onClick={this.onChange.bind(null, "publish_check")} style={{ marginRight: 10 }} />
                                <label className="w-form-label" onClick={this.onChange.bind(null, "publish_check")} style={{ width: 190, color: "black", fontSize: "10pt", letterSpacing: -1 }}>배포할 주소</label>
                            </div>
                            <input className="text-adduser-username w-input" onChange={this.onChange.bind(this, "publishaddress")}
                                style={{
                                    height: 30, width: 230, alignContent: "center", justifyContent: "center", marginBottom: 6,
                                    border: this.state.agent_publishAddress.length > 0 ? "1px solid #333" : "1px solid #ff3330"
                                }} type="text" />

                            <div className="form-checkbox-text w-checkbox" style={{ marginTop: 2, marginLeft: -25 }}>
                                <img src={this.state.agent_check_automator ? '../images/chkbox2_on.png' : '../images/chkbox2_off.png'} onClick={this.onChange.bind(null, "automator_check")} style={{ marginRight: 10 }} />
                                <label className="w-form-label" onClick={this.onChange.bind(null, "automator_check")} style={{ width: 190, color: "black", fontSize: "10pt", letterSpacing: -1 }}>설치후 자동실행할 오토메이터</label>
                            </div>
                            <div className="text-adduser-username w-input" onClick={this.selectAutomator}
                                style={{
                                    height: 30, width: 230, alignContent: "center", justifyContent: "center", marginBottom: 6,
                                    border: this.state.agent_automator.length > 0 ? "1px solid #333" : "1px solid #ff3330"
                                }}>
                                {this.state.agent_automator}
                            </div>

                            <div className="form-checkbox-text w-checkbox" style={{ marginTop: 2, marginLeft: -25 }}>
                                <img src={this.state.agent_check_group ? '../images/chkbox2_on.png' : '../images/chkbox2_off.png'} onClick={this.onChange.bind(null, "group_check")} style={{ marginRight: 10 }} />
                                <label className="w-form-label" onClick={this.onChange.bind(null, "group_check")}
                                    style={{ width: 190, color: "black", fontSize: "10pt", letterSpacing: -1 }}>설치후 포함될 장치 조직</label>
                            </div>
                            <div className="text-adduser-username w-input" onClick={this.selectGroup}
                                style={{
                                    height: 30, width: 230, alignContent: "center", justifyContent: "center", marginBottom: 6,
                                    border: this.state.agent_group.length > 0 ? "1px solid #333" : "1px solid #ff3330"
                                }}>
                                {this.state.agent_group}
                            </div>

                            <div className="form-checkbox-text w-checkbox" style={{ marginTop: 2, marginLeft: -25 }}>
                                <img src={this.state.agent_check_network ? '../images/chkbox2_on.png' : '../images/chkbox2_off.png'} onClick={this.onChange.bind(null, "network_check")} style={{ marginRight: 10 }} />
                                <label className="w-form-label" onClick={this.onChange.bind(null, "network_check")} style={{ width: 190, color: "black", fontSize: "10pt", letterSpacing: -1 }}>작동가능한 네트워크 범위</label>
                            </div>
                            <div className="text-adduser-username w-input" onClick={this.selectNetworkRange}
                                style={{
                                    height: 30, width: 230, alignContent: "center", justifyContent: "center", marginBottom: 6,
                                    border: this.state.agent_networkrange.length > 0 ? "1px solid #333" : "1px solid #ff3330"
                                }}>
                                {this.state.agent_networkrange}
                            </div>
                        </div>
                    </form>
                    <div className="w-form-done" />
                    <div className="w-form-fail" />
                </div>
                <div className="form-block-5 w-form" style={{ marginTop: 0 }}>
                    <form id="email-form-5" name="email-form-5" data-name="Email Form 5" className="form-6">
                        <div className="div-adduser-note"><label htmlFor="Note-5" className="text-adduser-18" style={{ fontSize: "11pt" }}>설명</label></div><textarea id="Note-4" onChange={this.changenote} name="Note-4" maxLength={5000} data-name="Note 4" className="textarea-2 w-input" defaultValue={""} />
                        <div className="div-adduser-input"><a href="#" onClick={this.done} style={{ marginTop: -15 }} className="button-adduser-summit w-button">확인</a></div>
                    </form>
                    <div className="w-form-done">
                    </div>
                    <div className="w-form-fail">
                    </div>
                </div>
            </div>

        var html = null;

        if (this.state.isShow && this.props.popup != null && this.props.popup.list.length > 0) {
            switch (this.props.popup.list[0].popuptype) {
                case "modifydevicegroup":
                case "adddevicegroup":
                    html = html_devicegroup;
                    break;
                case "add_user":
                    html = html_adduser;
                    break;
                case "user_detail":
                    html = html_adduser;
                    break;
                case "add_user_group":
                    html = html_usergroup;
                    break;
                case "add_agent_group":
                    html = html_addagent_group;
                    break;
                case "add_automator_group":
                    html;
                    break;
            }
            return (
                <div style={{ display: this.state.isShow && this.props.popup != null && CommonData.bulkactionList.length == 0 ? "flex" : "none", height: "100%", paddingLeft: 10, float: "right", paddingRight: 224 }}>
                    <AgentPopup popup={this.state.agentpopup} parent={this} />
                    <AddToGroup ref={ref => this.secondPopup = ref} isBulkaction={false} popup={null} PopupManager={null} parent={this} />
                    <ChangeEditable ref={ref => this.ChangeEditable = ref} />
                    {html}
                </div>
            );
        } else {
            return (<div />);
        }
    }
}