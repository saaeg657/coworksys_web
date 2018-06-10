import React from 'react';
import * as CommonData from '../../../../InformationData/CommonData.js';
import ModelManager from '../../../../Controller/ModelManager.js';
import APIManager from '../../../../Controller/APIManager.js';
import * as util from '../../../../Util/Util.js';
import Dropdown from 'react-dropdown';

export default class PopupModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isShow: false,
            popuptype: "delete",
            deleteOption: "deletefromlist",
            message: "",
            SelectedGroupName: "",
            osType: "",
            SelectedGroup: -1,
            savename: ""
        };
        this.show = this.show.bind(this);
        this.close = this.close.bind(this);
        this.done = this.done.bind(this);
        this.responseAPICallback_done = this.responseAPICallback_done.bind(this);
        this.responseAPICallback = this.responseAPICallback.bind(this);
        this.radioClick = this.radioClick.bind(this);
        this.changeMessage = this.changeMessage.bind(this);
        this.closePopup = this.closePopup.bind(this);
        this.category = this.category.bind(this);
        this.changename = this.changename.bind(this);
        this.saveas = this.saveas.bind(this)
        this.restore = this.restore.bind(this);
        this.remove = this.remove.bind(this);
    }

    restore() {
        console.log("Restore", CommonData.currentoption)
        var newAPI = util.newAPICommand();
        var IDlist = [];
        for (var i = 0; i < CommonData.bulkactionList.length; i++) {
            IDlist = IDlist.concat(CommonData.bulkactionList[i].id)
        }
        switch (CommonData.currentoption) {
            case "":
            case "사용자":
                newAPI.put(
                    "/coworksys",
                    "/api/user/restore",
                    util.getDefaultHeader(),
                    {
                        "userIDList": IDlist
                    },
                    null,
                    null);
                break;
            case "장치 조직":
                newAPI.put(
                    "/coworksys",
                    "/api/deviceGroup/restore",
                    util.getDefaultHeader(),
                    {
                        "deviceGroupIDList": IDlist
                    },
                    null,
                    null);
                break;
            case "사용자 조직":
                newAPI.put(
                    "/coworksys",
                    "/api/userGroup/restore",
                    util.getDefaultHeader(),
                    {
                        "userGroupIDList": IDlist
                    },
                    null,
                    null);
                break;
            case "에이전트":
                newAPI.put(
                    "/coworksys",
                    "/api/agentGroup/restore",
                    util.getDefaultHeader(),
                    {
                        "agentGroupIDList": IDlist
                    },
                    null,
                    null);
                break;
            case "오토메이터":
                newAPI.put(
                    "/coworksys",
                    "/api/automator/restore",
                    util.getDefaultHeader(),
                    {
                        "automatorIDList": IDlist
                    },
                    null,
                    null);
                break;
        }
        APIManager.requestAPI(
            newAPI.get("apikey"),
            newAPI.get("apicommand"),
            newAPI.get("apiheader"),
            newAPI.get("apibody"),
            this.responseAPICallback,
            null);

    }
    remove() {
        var IDlist = [];
        var newAPI = util.newAPICommand();
        for (var i = 0; i < CommonData.bulkactionList.length; i++) {
            IDlist = IDlist.concat(CommonData.bulkactionList[i].id)
        }
        switch (CommonData.currentoption) {
            case "":
            case "사용자":
                newAPI.put(
                    "/coworksys",
                    "/api/user/delete",
                    util.getDefaultHeader(),
                    {
                        "userIDList": IDlist
                    },
                    null,
                    null);
                break;
            case "장치 조직":
                newAPI.put(
                    "/coworksys",
                    "/api/deviceGroup/delete",
                    util.getDefaultHeader(),
                    {
                        "deviceGroupIDList": IDlist
                    },
                    null,
                    null);
                break;
            case "사용자 조직":
                newAPI.put(
                    "/coworksys",
                    "/api/userGroup/delete",
                    util.getDefaultHeader(),
                    {
                        "userGroupIDList": IDlist
                    },
                    null,
                    null);
                break;
            case "에이전트":
                newAPI.put(
                    "/coworksys",
                    "/api/agentGroup/delete",
                    util.getDefaultHeader(),
                    {
                        "agentGroupIDList": IDlist
                    },
                    null,
                    null);
                break;
            case "오토메이터":
                newAPI.put(
                    "/coworksys",
                    "/api/automator/delete",
                    util.getDefaultHeader(),
                    {
                        "automatorIDList": IDlist
                    },
                    null,
                    null);
                break;
        }
        APIManager.requestAPI(
            newAPI.get("apikey"),
            newAPI.get("apicommand"),
            newAPI.get("apiheader"),
            newAPI.get("apibody"),
            this.responseAPICallback,
            null);
        this.close();
    }
    saveas() {
        this.props.parent.resultFromPopup(this.state.savename, this.state.SelectedGroup);
        this.closePopup();
    }
    changename(e) {
        this.setState({ savename: e.target.value });
    }
    category(e) {
        for (var i = 0; i < this.props.GroupList.length; i++) {
            if (this.props.GroupList[i].name == e.value) {
                this.setState({
                    SelectedGroup: this.props.GroupList[i].id,
                    SelectedGroupName: e.value,
                    osType: this.props.GroupList[i].osType
                });
                break;
            }
        }
    }
    closePopup() {
        this.setState({ isShow: false });
    }
    changeMessage(e) {
        this.setState({ message: e.target.value });
        console.log(this.state.message);
    }
    radioClick(e) {
        this.setState({ deleteOption: e.target.value });
    }
    responseAPICallback_done(response, key) {
        console.log("responseAPICallback_done", response, key);
        this.props.PopupManager.props.ContentsArea.refresh();
        this.props.PopupManager.props.ContentsArea.closeAllpopup();
        this.close();
    }
    responseAPICallback(response, key) {
        console.log("responseAPICallback", response, key);
        this.props.PopupManager.props.ContentsArea.refresh();
        this.close();
    }
    close() {
        this.setState({ isShow: false, message: "" });
        if (this.props.ContentsArea != null) {

            this.props.ContentsArea.refresh();
        }
    }
    show(visible, type) {
        this.setState({ isShow: visible, popuptype: type });
    }
    done() {
        console.log("Done", this.state.popuptype);
        let IDlist = [];
        switch (this.state.popuptype) {
            case "delete":
                for (var i = 0; i < CommonData.bulkactionList.length; i++) {
                    IDlist = IDlist.concat(CommonData.bulkactionList[i].id)
                }
                var newAPI = util.newAPICommand();
                newAPI.put(
                    "/coworksys",
                    "/api/user/delete",
                    util.getDefaultHeader(),
                    {
                        "userIDList": IDlist
                    },
                    null,
                    null);
                APIManager.requestAPI(
                    newAPI.get("apikey"),
                    newAPI.get("apicommand"),
                    newAPI.get("apiheader"),
                    newAPI.get("apibody"),
                    this.responseAPICallback_done,
                    newAPI.get("apilistkey"));
                break;
            case "delete_usergroup":
                for (var i = 0; i < CommonData.bulkactionList.length; i++) {
                    IDlist = IDlist.concat(CommonData.bulkactionList[i].id)
                }
                var newAPI = util.newAPICommand();
                newAPI.put(
                    "/coworksys",
                    "/api/userGroup/delete",
                    util.getDefaultHeader(),
                    {
                        "userGroupIDList": IDlist
                    },
                    null,
                    null);
                APIManager.requestAPI(
                    newAPI.get("apikey"),
                    newAPI.get("apicommand"),
                    newAPI.get("apiheader"),
                    newAPI.get("apibody"),
                    this.responseAPICallback_done,
                    newAPI.get("apilistkey"));
                break;
            case "delete_group":
                for (var i = 0; i < CommonData.bulkactionList.length; i++) {
                    IDlist = IDlist.concat(CommonData.bulkactionList[i].id)
                }
                var newAPI = util.newAPICommand();
                newAPI.put(
                    "/coworksys",
                    "/api/deviceGroup/delete",
                    util.getDefaultHeader(),
                    {
                        "deviceGroupIDList": IDlist
                    },
                    null,
                    null);
                APIManager.requestAPI(
                    newAPI.get("apikey"),
                    newAPI.get("apicommand"),
                    newAPI.get("apiheader"),
                    newAPI.get("apibody"),
                    this.responseAPICallback_done,
                    newAPI.get("apilistkey"));
                break;
            case "delete_agent":
                for (var i = 0; i < CommonData.bulkactionList.length; i++) {
                    IDlist = IDlist.concat(CommonData.bulkactionList[i].id)
                }
                var newAPI = util.newAPICommand();
                newAPI.put(
                    "/coworksys", "/api/agentGroup/delete", util.getDefaultHeader(),
                    {
                        "agentGroupIDList": IDlist,
                        "deleteDevice": this.state.deleteOption == "deletecompletly" ? true : false
                    },
                    null,
                    null);
                APIManager.requestAPI(
                    newAPI.get("apikey"),
                    newAPI.get("apicommand"),
                    newAPI.get("apiheader"),
                    newAPI.get("apibody"),
                    this.responseAPICallback_done,
                    newAPI.get("apilistkey"));
                break;
            case "delete_device":
                    console.log('a');
                for (var i = 0; i < CommonData.bulkactionList.length; i++) {
                    IDlist = IDlist.concat(CommonData.bulkactionList[i].id)
                }
                console.log(IDlist);
                var newAPI = util.newAPICommand();
                newAPI.put(
                    "/coworksys", "/api/device/delete", util.getDefaultHeader(),
                    {
                        "deviceIDList": IDlist 
                       // "removeFromAgent" : false
                        ///디바이스 삭제 옵션 적용해야함
                        //this.state.deleteOption
                        //deletefromlist,deletecompletly
                    },
                    null,
                    null);
                    console.log('bbb');
                /*
            APIManager.requestAPI(
                newAPI.get("apikey"),
                newAPI.get("apicommand"),
                newAPI.get("apiheader"),
                newAPI.get("apibody"),
                this.responseAPICallback_done,
                newAPI.get("apilistkey"));
                */
                break;
            case "sendmessage":
                for (var i = 0; i < CommonData.bulkactionList.length; i++) {
                    IDlist = IDlist.concat(CommonData.bulkactionList[i].id)
                }
                var newAPI = util.newAPICommand();
                newAPI.put(
                    "/coworksys", "/api/device/send/message", util.getDefaultHeader(),
                    {
                        "deviceIDList": IDlist,
                        "type": "Infomation",
                        "message": this.state.message
                    },
                    null,
                    null);
                APIManager.requestAPI(
                    newAPI.get("apikey"),
                    newAPI.get("apicommand"),
                    newAPI.get("apiheader"),
                    newAPI.get("apibody"),
                    this.responseAPICallback_done,
                    newAPI.get("apilistkey"));
                break;
            case "publish":
                for (var i = 0; i < CommonData.bulkactionList.length; i++) {
                    IDlist = IDlist.concat(CommonData.bulkactionList[i].id)
                }
                var newAPI = util.newAPICommand();
                newAPI.put(
                    "/coworksys", "/api/agentGroup/start", util.getDefaultHeader(),
                    {
                        "agentGroupIDList": IDlist
                    },
                    null,
                    null);
                APIManager.requestAPI(
                    newAPI.get("apikey"),
                    newAPI.get("apicommand"),
                    newAPI.get("apiheader"),
                    newAPI.get("apibody"),
                    this.responseAPICallback_done,
                    newAPI.get("apilistkey"));
                break;
            case "update":
                for (var i = 0; i < CommonData.bulkactionList.length; i++) {
                    IDlist = IDlist.concat(CommonData.bulkactionList[i].id)
                }
                var newAPI = util.newAPICommand();
                newAPI.put(
                    "/coworksys", "/api/agentGroup/start", util.getDefaultHeader(),
                    {
                        "agentGroupIDList": IDlist
                    },
                    null,
                    null);
                APIManager.requestAPI(
                    newAPI.get("apikey"),
                    newAPI.get("apicommand"),
                    newAPI.get("apiheader"),
                    newAPI.get("apibody"),
                    this.responseAPICallback_done,
                    newAPI.get("apilistkey"));
                break;
            case "activate":
                var active = false;
                for (var i = 0; i < CommonData.bulkactionList.length; i++) {
                    if (CommonData.bulkactionList[i].status == "eBlock") {
                        active = true;
                        break;
                    }
                }
                for (var i = 0; i < CommonData.bulkactionList.length; i++) {
                    IDlist = IDlist.concat(CommonData.bulkactionList[i].id)
                }

                for (var i = 0; i < IDlist.length; i++) {
                    var newAPI = util.newAPICommand();
                    newAPI.put(
                        "/coworksys", "/api/user/update/status", util.getDefaultHeader(),
                        {
                            "userID": IDlist[i],
                            "status": active ? "eActive" : "eBlock"
                        },
                        null,
                        null);
                    APIManager.requestAPI(
                        newAPI.get("apikey"),
                        newAPI.get("apicommand"),
                        newAPI.get("apiheader"),
                        newAPI.get("apibody"),
                        this.responseAPICallback_done,
                        newAPI.get("apilistkey"));
                }
                break;
            case "delete_automator":
                for (var i = 0; i < CommonData.bulkactionList.length; i++) {
                    IDlist = IDlist.concat(CommonData.bulkactionList[i].id)
                }
                var newAPI = util.newAPICommand();
                newAPI.put(
                    "/coworksys", "/api/automator/delete", util.getDefaultHeader(),
                    {
                        "automatorIDList": IDlist
                    },
                    null,
                    null);
                APIManager.requestAPI(
                    newAPI.get("apikey"),
                    newAPI.get("apicommand"),
                    newAPI.get("apiheader"),
                    newAPI.get("apibody"),
                    this.responseAPICallback_done,
                    newAPI.get("apilistkey"));
                break;
        }
        this.close();
    }
    render() {
        let html_deleteUser =
            <div className="div-modal-popup" style={{ display: this.state.isShow ? "flex" : "none" }}>
                <div className="div-modal-popup-small" >
                    <div className="div-popup-group-remove">
                        <div className="div-block-38">
                            <img src="../images/alarm.png" width={31} height={31} />
                            <div style={{ marginLeft: -1, marginTop: -3 }}>알림</div>
                        </div>
                        <div className="div-modal-radio-group-delete" style={{ marginBottom: 10 }}>
                            <div className="text-popup-disable">선택하신 {CommonData.bulkactionList.length} 명의 사용자를 삭제하시겠습니까?
                            <br />삭제된 사용자는 'Delete users' 에서 복원할 수 있습니다.</div>
                        </div>
                        <div className="div-block-39"><a href="#" onClick={this.close} className="button-grey-rounded w-button">취소</a>
                            <div className="div-transparent-spacer" style={{ width: 7 }} /><a href="#" onClick={this.done} className="button-red-rounded w-button">삭제</a></div>
                        <div className="div-modal-buttons" />
                    </div>
                </div>
            </div >

        let html_deleteDevice =
            <div className="div-modal-popup" style={{ display: this.state.isShow ? "flex" : "none" }}>
                <div className="div-modal-popup-small"
                    style={{
                        width: 308,
                        height: 162,
                        position: "absolute",
                        left: 898,
                        marginTop: 57
                    }}>
                    <div className="div-popup-group-remove">
                        <div className="div-block-38">
                            <img src="../images/alarm.png" width={31} height={31} />
                            <div style={{ marginLeft: -1, marginTop: -3 }}>알림</div>
                        </div>
                        <div className="div-modal-radio-group-delete">
                            <div className="w-form">
                                <form id="email-form-7" name="email-form-7" data-name="Email Form 7">
                                    <div className="w-radio"><input type="radio" style={{ marginLeft: 0 }} id="radio-3" name="radio" defaultChecked={true} value={"deletefromlist"} onClick={this.radioClick} defaultValue="Radio" data-name="Radio 3" className="w-radio-input" /><label htmlFor="radio-3" className="w-form-label">목록에서 장치만 삭제하기</label></div>
                                    <div className="w-radio"><input type="radio" style={{ marginLeft: 0 }} id="radio-4" name="radio" value={"deletecompletly"} onClick={this.radioClick} defaultValue="Radio" data-name="Radio 4" className="w-radio-input" /><label htmlFor="radio-4" className="w-form-label">목록에서 삭제후 에이전트 삭제하기</label></div>
                                </form>
                            </div>
                        </div>
                        <div className="div-block-39"><a href="#" onClick={this.close} className="button-grey-rounded w-button">취소</a>
                            <div className="div-transparent-spacer" style={{ width: 7 }} /><a href="#" onClick={this.done} className="button-red-rounded w-button">삭제</a></div>
                        <div className="div-modal-buttons" />
                    </div>
                </div>
            </div >

        let html_deleteGroup =
            <div className="div-modal-popup" style={{ display: this.state.isShow ? "flex" : "none" }}>
                <div className="div-modal-popup-small"
                    style={{
                        width: 308,
                        height: 162,
                        position: "absolute",
                        left: 898,
                        marginTop: 57
                    }}>
                    <div className="div-popup-group-remove">
                        <div className="div-block-38">
                            <img src="../images/alarm.png" width={31} height={31} />
                            <div style={{ marginLeft: -1, marginTop: -3 }}>알림</div>
                        </div>
                        <div className="div-modal-radio-group-delete" style={{ marginBottom: 13 }}>
                            <div className="text-popup-disable">선택하신 조직을 삭제하시겠습니까?
                            <br />삭제된 항목에서에서 복원할 수 있습니다.</div>
                        </div>
                        <div className="div-block-39"><a href="#" onClick={this.close} className="button-grey-rounded w-button">취소</a>
                            <div className="div-transparent-spacer" style={{ width: 7 }} /><a href="#" onClick={this.done} className="button-red-rounded w-button">삭제</a></div>
                        <div className="div-modal-buttons" />
                    </div>
                </div>
            </div >

        let html_sendmessage =
            <div className="div-modal-popup" style={{ display: this.state.isShow ? "flex" : "none" }}>
                <div className="div-popup-group"
                    style={{
                        width: 357,
                        height: 284,
                        position: "absolute",
                        left: 874,
                        marginTop: 57
                    }}>
                    <div className="div-popup-group-remove">
                        <div className="div-block-38" style={{ marginBottom: 12 }}>
                            <img src="../images/alarm.png" width={31} height={31} />
                            <div style={{ marginLeft: -1, marginTop: -3 }}>알림</div>
                        </div>
                        <div className="div-device-sendmessage">
                            <div className="w-form">
                                <form id="email-form-8" name="email-form-8" data-name="Email Form 8">
                                    <textarea
                                        id="field" name="field" onChange={this.changeMessage}
                                        data-name="Field" maxLength={5000} placeholder="보내실 메세지를 입력해주세요."
                                        className="textarea-sendtomessage w-input" defaultValue={""}
                                        style={{ maxHeight: 140, minHeight: 140, maxWidth: 300, minWidth: 300 }}
                                    /></form>
                                <div className="w-form-done" />
                                <div className="w-form-fail" />
                            </div>
                        </div>
                        <div className="text-popup-disable" style={{ paddingLeft: 26, marginTop: -2 }}>선택하신 {CommonData.bulkactionList.length}개의 장치에 메세지를 보내시겠습니까?</div>
                        <div className="div-block-39"><a href="#" onClick={this.close} className="button-grey-rounded w-button">취소</a>
                            <div className="div-transparent-spacer" style={{ width: 7 }} /><a href="#" style={{ height: 28, width: 48 }} onClick={this.done} className="button-circle-blue w-button" >전송</a></div>
                        <div className="div-modal-buttons" />
                    </div>
                </div>
            </div >

        let html_deleteItem =
            <div className="div-modal-popup" style={{ display: this.state.isShow ? "flex" : "none" }}>
                <div className="div-modal-popup-small" >
                    <div className="div-popup-group-remove">
                        <div className="div-block-38">
                            <img src="../images/alarm.png" width={31} height={31} />
                            <div style={{ marginLeft: -1, marginTop: -3 }}>알림</div>
                        </div>
                        <div className="div-modal-radio-group-delete" style={{ marginBottom: 20 }}>
                            <div className="text-popup-disable">선택하신 항목을 삭제하시겠습니까?
                            <br />삭제된 항목에서에서 복원할 수 있습니다.</div>
                        </div>
                        <div className="div-block-39"><a href="#" onClick={this.close} className="button-grey-rounded w-button">취소</a>
                            <div className="div-transparent-spacer" style={{ width: 7 }} /><a href="#" onClick={this.done} className="button-red-rounded w-button">삭제</a></div>
                        <div className="div-modal-buttons" />
                    </div>
                </div>
            </div >

        let html_removeItem =
            <div className="div-modal-popup" style={{ display: this.state.isShow ? "flex" : "none" }}>
                <div className="div-modal-popup-small" >
                    <div className="div-popup-group-remove">
                        <div className="div-block-38">
                            <img src="../images/alarm.png" width={31} height={31} />
                            <div style={{ marginLeft: -1, marginTop: -3 }}>알림</div>
                        </div>
                        <div className="div-modal-radio-group-delete" style={{ marginBottom: 30 }}>
                            <div className="text-popup-disable">선택하신 {CommonData.bulkactionList.length}개 항목을 완전히 삭제하시겠습니까?
                            <br />완전히 삭제된 항목은 다시 복원할 수 없습니다.</div>
                        </div>
                        <div className="div-block-39"><a href="#" onClick={this.close} className="button-grey-rounded w-button">취소</a>
                            <div className="div-transparent-spacer" style={{ width: 7 }} /><a href="#" onClick={this.remove} className="button-red-rounded w-button">삭제</a></div>
                        <div className="div-modal-buttons" />
                    </div>
                </div>
            </div >

        let html_restoreItem =
            <div className="div-modal-popup" style={{ display: this.state.isShow ? "flex" : "none" }}>
                <div className="div-modal-popup-small" >
                    <div className="div-popup-group-remove">
                        <div className="div-block-38">
                            <img src="../images/alarm.png" width={31} height={31} />
                            <div style={{ marginLeft: -1, marginTop: -3 }}>알림</div>
                        </div>
                        <div className="div-modal-radio-group-delete" style={{ marginBottom: 40 }}>
                            <div className="text-popup-disable">선택하신 {CommonData.bulkactionList.length}개 항목을 복원하시겠습니까?</div>
                        </div>
                        <div className="div-block-39"><a href="#" onClick={this.close} className="button-grey-rounded w-button">취소</a>
                            <div className="div-transparent-spacer" style={{ width: 7 }} /><a href="#" style={{ height: 30 }} onClick={this.restore} className="button-circle-blue w-button">복원</a></div>
                        <div className="div-modal-buttons" />
                    </div>
                </div>
            </div >

        var active = false;
        if (this.state.popuptype == "activate") {
            for (var i = 0; i < CommonData.bulkactionList.length; i++) {
                if (CommonData.bulkactionList[i].status == "eBlock") {
                    active = true;
                    break;
                }
            }
        }
        let html_active =
            <div className="div-modal-popup" style={{ display: this.state.isShow ? "flex" : "none" }}>
                <div className="div-modal-popup-small" style={{ width: 250 }}>
                    <div className="div-popup-group-remove">
                        <div className="div-block-38">
                            <img src="../images/alarm.png" width={31} height={31} />
                            <div style={{ marginLeft: -1, marginTop: -3 }}>알림</div>
                        </div>
                        <div className="div-modal-radio-group-delete" style={{ marginBottom: 20 }}>
                            <div className="text-popup-disable">선택하신 조직 {CommonData.bulkactionList.length}명의 사용자를
                                <br /> {active ? "활성화" : "비활성화"}하시겠습니까?</div>
                        </div>
                        <div className="div-block-39"><a href="#" onClick={this.close} className="button-grey-rounded w-button">취소</a>
                            <div className="div-transparent-spacer" style={{ width: 7 }} /><a href="#" style={{ height: 30, width: 60 }} onClick={this.done} className={active ? "button-circle-blue w-button" : "button-red-rounded w-button"}>{active ? "활성화" : "비활성화"}</a></div>
                        <div className="div-modal-buttons" />
                    </div>
                </div>
            </div >


        if (this.state.popuptype == "publish") {
            for (var i = 0; i < CommonData.bulkactionList.length; i++) {
                if (CommonData.bulkactionList[i].agentStatus == "eStopPublish") {
                    active = true;
                    break;
                }
            }
        }

        let html_publish =
            <div className="div-modal-popup" style={{ display: this.state.isShow ? "flex" : "none" }}>
                <div className="div-modal-popup-small" style={{ width: 250 }}>
                    <div className="div-popup-group-remove">
                        <div className="div-block-38">
                            <img src="../images/alarm.png" width={31} height={31} />
                            <div style={{ marginLeft: -1, marginTop: -3 }}>알림</div>
                        </div>
                        <div className="div-modal-radio-group-delete" style={{ marginBottom: 20 }}>
                            <div className="text-popup-disable">선택 된 에이전트 {CommonData.bulkactionList.length}개를
                                <br /> {active ? "배포상태" : "배포 중지"}로 변경하시겠습니까?</div>
                        </div>
                        <div className="div-block-39"><a href="#" onClick={this.close} className="button-grey-rounded w-button">취소</a>
                            <div className="div-transparent-spacer" style={{ width: 7 }} /><a href="#" style={{ height: 30 }} onClick={this.done} className={"button-red-rounded w-button"}>변경</a></div>
                        <div className="div-modal-buttons" />
                    </div>
                </div>
            </div >

        let html_deleteagent =
            <div className="div-modal-popup" style={{ display: this.state.isShow ? "flex" : "none" }}>
                <div className="div-modal-popup-small" >
                    <div className="div-popup-group-remove">
                        <div className="div-block-38">
                            <img src="../images/alarm.png" width={31} height={31} />
                            <div style={{ marginLeft: -1, marginTop: -3 }}>알림</div>
                        </div>
                        <div className="div-modal-radio-group-delete">
                            <div className="w-form" style={{ marginBottom: 5 }}>
                                <form id="email-form-7" name="email-form-7" data-name="Email Form 7">
                                    선택 된 에이전트 {CommonData.bulkactionList.length}개를 삭제하시겠습니까?
                                    <div className="w-radio"><input type="radio" style={{ marginLeft: 0 }} id="radio-3" name="radio" defaultChecked={true} value={"deletefromlist"} onClick={this.radioClick} defaultValue="Radio" data-name="Radio 3" className="w-radio-input" /><label htmlFor="radio-3" className="w-form-label">목록에서만 제거하기</label></div>
                                    <div className="w-radio"><input type="radio" style={{ marginLeft: 0 }} id="radio-4" name="radio" value={"deletecompletly"} onClick={this.radioClick} defaultValue="Radio" data-name="Radio 4" className="w-radio-input" /><label htmlFor="radio-4" className="w-form-label">장치에서 완전히 삭제하기</label></div>
                                </form>
                            </div>
                        </div>
                        <div className="div-block-39"><a href="#" onClick={this.close} className="button-grey-rounded w-button">취소</a>
                            <div className="div-transparent-spacer" style={{ width: 7 }} /><a href="#" onClick={this.done} className="button-red-rounded w-button">삭제</a></div>
                        <div className="div-modal-buttons" />
                    </div>
                </div>
            </div >

        let html_update =
            <div className="div-modal-popup" style={{ display: this.state.isShow ? "flex" : "none" }}>
                <div className="div-modal-popup-small" >
                    <div className="div-popup-group-remove">
                        <div className="div-block-38">
                            <img src="../images/alarm.png" width={31} height={31} />
                            <div style={{ marginLeft: -1, marginTop: -3 }}>알림</div>
                        </div>
                        <div className="div-modal-radio-group-delete" style={{ marginBottom: 20 }}>
                            <div className="text-popup-disable">선택된 에이전트 {CommonData.bulkactionList.length}개를
                                <br /> 00.00.00.00 버전으로 업데이트 하시겠습니까?</div>
                        </div>
                        <div className="div-block-39"><a href="#" onClick={this.close} className="button-grey-rounded w-button">취소</a>
                            <div className="div-transparent-spacer" style={{ width: 7 }} /><a href="#" style={{ height: 30 }} onClick={this.done} className="button-circle-blue w-button">실행</a></div>
                        <div className="div-modal-buttons" />
                    </div>
                </div>
            </div >

        let html_automator_exit =
            <div className="div-modal-popup" style={{ display: this.state.isShow ? "flex" : "none" }}>
                <div className="div-modal-popup-small" >
                    <div className="div-popup-group-remove">
                        <div className="div-block-38">
                            <img src="../images/alarm.png" width={31} height={31} />
                            <div style={{ marginLeft: -1, marginTop: -3 }}>알림</div>
                        </div>
                        <div className="div-modal-radio-group-delete" style={{ marginBottom: 30 }}>
                            <div className="text-popup-disable">오토메이터 만들기를 종료하시겠습니까?
                            <br />저장되지 않은 자료는 복구할 수 없습니다.</div>
                        </div>
                        <div className="div-block-39"><a href="#" onClick={this.closePopup} className="button-grey-rounded w-button">취소</a>
                            <div className="div-transparent-spacer" style={{ width: 7 }} /><a href="#" onClick={this.close} className="button-red-rounded w-button">삭제</a></div>
                        <div className="div-modal-buttons" />
                    </div>
                </div>
            </div >



        let html_automator_saveas =
            <div className="div-modal-popup" style={{ display: this.state.isShow ? "flex" : "none" }}>
                <div className="div-modal-popup-small" style={{ height: 285, marginLeft: 100, marginRight: 0 }}>
                    <div className="div-popup-group-remove">
                        <div className="div-block-38" style={{ paddingLeft: 125 }}>
                            <img src="../images/alarm.png" width={31} height={31} />
                            <div style={{ marginLeft: -1, marginTop: -3 }}>알림</div>
                        </div>
                        <div className="div-device-sendmessage">
                            <div className="w-form">
                                <form id="email-form-8" name="email-form-8" data-name="Email Form 8" className="form-5">
                                    <h4 style={{ paddingLeft: 70, letterSpacing: -2 }}>다른이름으로 저장하기</h4>
                                    <input type="text"
                                        value={this.state.savename}
                                        onChange={this.changename.bind(this)}
                                        style={{ borderColor: "white", borderBottomColor: "grey", width: 240, marginLeft: 30, marginBottom: 35 }}
                                        className="w-input" maxLength={256} name="name" data-name="name" placeholder="저장할 이름을 입력해 주세요." id="name" required />
                                    <div className="div-block-31">
                                        <h5 className="heading" style={{ margin: 0, marginLeft: 25, marginTop: -10, marginBottom: 15, marginRight: 0 }}>조직</h5>
                                        <div style={{ width: 150, height: 30, marginBottom: 25 }}>
                                            <Dropdown
                                                options={this.props.GroupInfo}
                                                value={this.state.SelectedGroupName}
                                                onChange={this.category}
                                                placeholder=" " />
                                        </div>
                                    </div>
                                </form>
                                <div className="w-form-done" />
                                <div className="w-form-fail" />
                            </div>
                        </div>
                        <div className="div-modal-automator-save-buttons"><a href="#" style={{ height: 30, width: 60 }} onClick={this.closePopup} className="button-circle-gray-nomargin w-button">취소</a>
                            <div className="div-transparent-spacer" style={{ width: 7 }} /><a href="#" style={{ height: 30, width: 60 }} onClick={this.saveas} className="button-circle-blue w-button">저장</a></div>

                    </div>
                </div>
            </div >


        switch (this.state.popuptype) {
            case "delete_device":
                return (html_deleteDevice);
            case "delete_group":
            case "delete_usergroup":
                return (html_deleteGroup);
            case "delete":
                return (html_deleteUser);
            case "sendmessage":
                return (html_sendmessage);
            case "delete_automator":
                return (html_deleteItem);
            case "remove":
                return (html_removeItem);
            case "restore":
                return (html_restoreItem);
            case "activate":
                return (html_active);
            case "publish":
                return (html_publish);
            case "delete_agent":
                return (html_deleteagent);
            case "update":
                return (html_update);
            case "automator_exit":
                return (html_automator_exit)
            case "automator_saveas":
                return (html_automator_saveas)
        }
        return (<div />);


    }
}
