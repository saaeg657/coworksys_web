import React from 'react';
import * as CommonData from '../../../../InformationData/CommonData.js';
import ModelManager from '../../../../Controller/ModelManager.js';
import APIManager from '../../../../Controller/APIManager.js';
import * as util from '../../../../Util/Util.js';
import AddToGroup2 from './AddToGroup2.js';
import AddToGroupItem from './AddToGroupItem.js';

/**
 * AddToGroup
 * 
 * props 목록
 * PopupManager
 * 
 */

export default class AddToGroup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isShow: false,
            tableContent: [],
            tables: [],
            tableinfo: [],
            popupaction: "",
            popuplisttype: "",
            refresh: false,
            checkall: false,
            permission_1: false,
            permission_2: false,
            permission_4: false,
            permission_8: false,
            permission_16: false,
            permission_32: false,
            permission_64: false,
            keyword: "",
            selectedItems: []
        }
        this.refresh = this.refresh.bind(this);
        this.close = this.close.bind(this);
        this.responseAPICallback = this.responseAPICallback.bind(this);
        this.responseAPICallback_done = this.responseAPICallback_done.bind(this);
        this.checkbox = this.checkbox.bind(this);
        this.done = this.done.bind(this);
        this.getMenu = this.getMenu.bind(this);
        this.checkallitem = this.checkallitem.bind(this);
        this.showAddtoGroup = this.showAddtoGroup.bind(this);
        this.removeUser = this.removeUser.bind(this);
        this.setPermision = this.setPermision.bind(this);
        this.showMessage = this.showMessage.bind(this);
        this.search = this.search.bind(this);
        this.changeKeyword = this.changeKeyword.bind(this);
    }
    changeKeyword(e) {
        this.setState({ keyword: e.target.value })
    }
    search(e) {
        if (e.keyCode == 13) {
            CommonData.clearData(CommonData.addItemList);
            if (this.state.popuplisttype == "device_group") {
                var api = ModelManager.GetAPICommand(this.state.popuplisttype);
                APIManager.requestAPI(
                    api.get("apikey"),
                    api.get("apicommand"),
                    api.get("apiheader"),
                    {
                        "startIndex": 0,
                        "count": 300,
                        "deviceGroupType": "eAll",
                        "alive": "eAlive",
                        "sort": "",
                        "search": this.state.keyword
                    },
                    this.responseAPICallback,
                    api.get("apilistkey"));
            }
            else if (this.state.popuplisttype == "device_device") {
                var api = ModelManager.GetAPICommand(this.state.popuplisttype);
                APIManager.requestAPI(
                    api.get("apikey"),
                    api.get("apicommand"),
                    api.get("apiheader"),
                    {
                        "startIndex": 0,
                        "count": 300,
                        "deviceGroupID": -1,
                        "deviceGroupType": "eAll",
                        "alive": "eAlive",
                        "sort": "",
                        "search": this.state.keyword
                    },
                    this.responseAPICallback,
                    api.get("apilistkey"));
            }
            else if (this.state.popuplisttype == "device_device") {
                var api = ModelManager.GetAPICommand(this.state.popuplisttype);
                APIManager.requestAPI(
                    api.get("apikey"),
                    api.get("apicommand"),
                    api.get("apiheader"),
                    {
                        "startIndex": 0,
                        "count": 300,
                        "deviceGroupID": -1,
                        "deviceGroupType": "eAll",
                        "alive": "eAlive",
                        "sort": "",
                        "search": this.state.keyword
                    },
                    this.responseAPICallback,
                    api.get("apilistkey"));
            }
            else if (this.state.popuplisttype == "getdevicefromgroup") {
                var api = ModelManager.GetAPICommand(this.state.popuplisttype);
                APIManager.requestAPI(
                    api.get("apikey"),
                    api.get("apicommand"),
                    api.get("apiheader"),
                    {
                        "startIndex": 0,
                        "count": 300,
                        "deviceGroupID": CommonData.selectedDevice != null ? CommonData.selectedDevice.id : -1,
                        "deviceGroupType": "eAll",
                        "alive": "eAlive",
                        "search": this.state.keyword
                    },
                    this.responseAPICallback,
                    api.get("apilistkey"));
            }
        }
    }

    showMessage(msg) {
        alert(msg);
    }
    componentWillMount() {
        this.permissionSet = new Set();
    }
    setPermision(e) {

        var result = false;
        if (this.permissionSet.has(e) == true) {
            this.permissionSet.delete(e);
            result = true;
        }
        else {
            this.permissionSet.add(e);
            result = false;
        }

        switch (e) {
            case 1:
                this.setState({ permission_1: result });
                break;
            case 2:
                this.setState({ permission_2: result });
                break;
            case 4:
                this.setState({ permission_4: result });
                break;
            case 8:
                this.setState({ permission_8: result });
                break;
            case 16:
                this.setState({ permission_16: result });
                break;
            case 32:
                this.setState({ permission_32: result });
                break;
            case 64:
                this.setState({ permission_64: result });
                break;
        }
        console.log("setpermission", e, result, this.permissionSet)
    }
    refresh() {
        this.show(true, this.state.popuplisttype, this.state.popupaction);
        this.setState({ refresh: !this.state.refresh, checkall: false })

    }
    showAddtoGroup() {
        // 기존 아이템 상세보기(content)
        // 1. 장치 : device_device ->
        // 2. 사용자 : setting_user
        var content = "";
        var info = "";
        if (this.state.popuplisttype == "getuserfromgroup") {
            content = "setting_user";
            info = "adduser_togroup";
        } else if (this.state.popuplisttype == "getdevicefromgroup") {
            content = "device_device";
            info = "adddevice_togroup";
        }
        console.log("showAddtoGroup", this.thirdPopup);
        //this.props.PopupManager.openThirdPopup(true, content, info);
        this.thirdPopup.show(true, content, info);
    }
    removeUser() {
        if (CommonData.selectedDevice == undefined || CommonData.selectedDevice == null ||
            CommonData.addItemList == undefined || CommonData.addItemList == null)
            return;
        var IDlist = [];
        for (var i = 0; i < CommonData.addItemList.length; i++)
            IDlist = IDlist.concat(CommonData.addItemList[i].id);
        var newAPI = util.newAPICommand();
        var msg = "";
        switch (this.state.popuplisttype) {
            case "getuserfromgroup":
                newAPI.put(
                    "/coworksys", "/api/user/delete/userGroup", util.getDefaultHeader(),
                    {
                        "userIDList": IDlist,
                        "groupID": CommonData.selectedDevice.id
                    },
                    null,
                    null);
                msg = "사용자가 조직에서 제거되었습니다.";
                break;
            case "getdevicefromgroup":
                newAPI.put(
                    "/coworksys", "/api/device/delete/deviceGroup", util.getDefaultHeader(),
                    {
                        "deviceIDList": IDlist,
                        "deviceGroupID": CommonData.selectedDevice.id
                    },
                    null,
                    null);
                msg = "장치가 조직에서 제거되었습니다.";
                break;
        }
        console.log("removeUser", newAPI.get("apibody"))
        APIManager.requestAPI(
            newAPI.get("apikey"),
            newAPI.get("apicommand"),
            newAPI.get("apiheader"),
            newAPI.get("apibody"),
            this.responseAPICallback_done,
            newAPI.get("apilistkey"));
        this.showMessage(msg);
    }
    checkallitem() {
        this.setState({ checkall: !this.state.checkall });
    }

    done() {
        if (this.state.popupaction == "adduser_togroup") {
            this.setState({ isShow: false });
            return;
        }
        if (this.state.popupaction == "adddevicegroup") {
            var IDS = [];
            for (var i = 0; i < CommonData.addItemList.length; i++)
                IDS = IDS.concat(CommonData.addItemList[i].id);
            this.props.parent.SetDefaultMember(IDS);
            this.setState({ isShow: false });
            return;
        }
        if (this.props.isBulkaction != undefined && this.props.isBulkaction == false &&
            this.state.popupaction != "autoinstall_automator" &&
            this.state.popupaction != "autoinstall_group") {
            //this.props.PopupManager.openThirdPopup(false, null, null);
            this.setState({ isShow: false });
            return;
        }
        let IDlist = [];
        let userIDlist = [];
        switch (this.state.popupaction) {
            case "addtogroup":
                for (var i = 0; i < CommonData.addItemList.length; i++)
                    IDlist = IDlist.concat(CommonData.addItemList[i].id);
                for (var i = 0; i < CommonData.bulkactionList.length; i++)
                    userIDlist = userIDlist.concat(CommonData.bulkactionList[i].id);

                for (var i = 0; i < IDlist.length; i++) {
                    var newAPI = util.newAPICommand();
                    newAPI.put(
                        "/coworksys", "/api/user/insert/userGroup", util.getDefaultHeader(),
                        {
                            "userIDList": userIDlist,
                            "groupID": IDlist[i]
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
                this.showMessage("사용자가 조직에 추가되었습니다.");
                break;
            case "adduser_togroup":
                for (var i = 0; i < CommonData.addItemList.length; i++)
                    IDlist = IDlist.concat(CommonData.addItemList[i].id);
                for (var i = 0; i < CommonData.bulkactionList.length; i++)
                    userIDlist = userIDlist.concat(CommonData.bulkactionList[i].id);

                for (var i = 0; i < userIDlist.length; i++) {
                    var newAPI = util.newAPICommand();
                    newAPI.put(
                        "/coworksys", "/api/user/insert/userGroup", util.getDefaultHeader(),
                        {
                            "userIDList": IDlist,
                            "groupID": userIDlist[i]
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
                this.showMessage("사용자가 조직에 추가되었습니다.");
                break;
            case "changepermission":
                var permissionCode = 0;
                for (const permission of this.permissionSet) {
                    permissionCode += parseInt(permission);
                }

                if (this.permissionSet.size == 7)
                    permissionCode = 0;
                if (this.permissionSet.size == 0)
                    permissionCode = 0;

                for (var i = 0; i < CommonData.bulkactionList.length; i++)
                    IDlist = IDlist.concat(CommonData.bulkactionList[i].id);

                for (var i = 0; i < IDlist.length; i++) {
                    var newAPI = util.newAPICommand();
                    newAPI.put(
                        "/coworksys", "/api/userGroup/update/permission", util.getDefaultHeader(),
                        {
                            "userGroupID": IDlist[i],
                            "permission": permissionCode
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
                this.showMessage("사용자 조직의 권한이 변경되었습니다.");
                break;
            case "addtogroup_device":
                for (var i = 0; i < CommonData.addItemList.length; i++)
                    IDlist = IDlist.concat(CommonData.addItemList[i].id);
                for (var i = 0; i < CommonData.bulkactionList.length; i++)
                    userIDlist = userIDlist.concat(CommonData.bulkactionList[i].id);

                for (var i = 0; i < IDlist.length; i++) {
                    var newAPI = util.newAPICommand();
                    newAPI.put(
                        "/coworksys", "/api/device/insert/deviceGroup", util.getDefaultHeader(),
                        {
                            "deviceIDList": userIDlist,
                            "deviceGroupID": IDlist[i]
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
                this.showMessage("장치가 조직에 추가되었습니다.");
                this.props.PopupManager.close();
                break;

            case "addtogroup_user":
                for (var i = 0; i < CommonData.addItemList.length; i++)
                    IDlist = IDlist.concat(CommonData.addItemList[i].id);

                for (var i = 0; i < CommonData.bulkactionList.length; i++)
                    userIDlist = userIDlist.concat(CommonData.bulkactionList[i].id);

                for (var i = 0; i < IDlist.length; i++) {
                    var newAPI = util.newAPICommand();
                    newAPI.put(
                        "/coworksys", "/api/user/insert/userGroup", util.getDefaultHeader(),
                        {
                            "groupID": IDlist[i],
                            "userIDList": userIDlist
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
                this.showMessage("사용자가 조직에 추가되었습니다.");
                break;
            case "autoinstall_automator":
                var value = "";
                CommonData.clearData(CommonData.newAgent_automator);
                CommonData.newAgent_automator = [];
                for (var i = 0; i < CommonData.addItemList.length; i++) {
                    CommonData.newAgent_automator = CommonData.setData(CommonData.newAgent_automator, CommonData.addItemList[i]);
                }
                CommonData.clearData(CommonData.addItemList);

                if (CommonData.newAgent_automator.length > 1) {
                    value = CommonData.newAgent_automator[0].name + " 외 " + (CommonData.newAgent_automator.length - 1).toString() + "개";
                }
                else if (CommonData.newAgent_automator.length == 1) {
                    value = CommonData.newAgent_automator[0].name;
                }
                this.props.parent.setAgentText("automator", value);
                this.setState({ isShow: false });
                return;
            case "autoinstall_automator":
                var value = "";
                CommonData.clearData(CommonData.newAgent_automator);
                CommonData.newAgent_automator = [];
                for (var i = 0; i < CommonData.addItemList.length; i++) {
                    CommonData.newAgent_automator = CommonData.setData(CommonData.newAgent_automator, CommonData.addItemList[i]);
                }
                CommonData.clearData(CommonData.addItemList);
                if (CommonData.newAgent_automator.length > 1) {
                    value = CommonData.newAgent_automator[0].name + " 외 " + (CommonData.newAgent_automator.length - 1).toString() + "개";
                }
                else if (CommonData.newAgent_automator.length == 1) {
                    value = CommonData.newAgent_automator[0].name;
                }
                this.props.parent.setAgentText("automator", value);
                this.setState({ isShow: false });
                return;
            case "autoinstall_group":

                var value = "";
                CommonData.clearData(CommonData.newAgent_group);
                CommonData.newAgent_group = [];
                for (var i = 0; i < CommonData.addItemList.length; i++) {
                    CommonData.newAgent_group = CommonData.setData(CommonData.newAgent_group, CommonData.addItemList[i]);
                }
                CommonData.clearData(CommonData.addItemList);
                if (CommonData.newAgent_group.length > 1) {
                    value = CommonData.newAgent_group[0].name + " 외 " + (CommonData.newAgent_group.length - 1).toString() + "개";
                }
                else if (CommonData.newAgent_group.length == 1) {
                    value = CommonData.newAgent_group[0].name;
                }
                this.props.parent.setAgentText("group", value);
                this.setState({ isShow: false });
                return;
            case "adddevicegroup":
                console.log(CommonData.addItemList)
                break;
            case "adddevice_togroup":
                for (var i = 0; i < CommonData.addItemList.length; i++)
                    IDlist = IDlist.concat(CommonData.addItemList[i].id);

                for (var i = 0; i < CommonData.bulkactionList.length; i++)
                    userIDlist = userIDlist.concat(CommonData.bulkactionList[i].id);

                for (var i = 0; i < userIDlist.length; i++) {
                    var newAPI = util.newAPICommand();
                    newAPI.put(
                        "/coworksys", "/api/device/insert/deviceGroup", util.getDefaultHeader(),
                        {
                            "deviceIDList": IDlist,
                            "deviceGroupID": userIDlist[i]
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
                    this.props.PopupManager.close();
                }
                this.showMessage("장치가 조직에 추가되었습니다.");
                break;
            case "addautomator_togroup":
                for (var i = 0; i < CommonData.addItemList.length; i++)
                    IDlist = IDlist.concat(CommonData.addItemList[i].id);

                for (var i = 0; i < CommonData.bulkactionList.length; i++)
                    userIDlist = userIDlist.concat(CommonData.bulkactionList[i].id);

                for (var i = 0; i < IDlist.length; i++) {
                    var newAPI = util.newAPICommand();
                    newAPI.put(
                        "/coworksys", "/api/automator/insert/toGroup", util.getDefaultHeader(),
                        {
                            "automatorIDList": userIDlist,
                            "automatorGroupID": IDlist[i]
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
                    this.props.PopupManager.close();
                }
                this.showMessage("오토메이터가 조직에 추가되었습니다.");
                this.props.PopupManager.closeSubpopup();
                break;
        }
        if (this.props.PopupManager != null)
            this.props.PopupManager.closeSubpopup();


    }
    responseAPICallback_done(response, key) {
        console.log("AddToGroup done", response, key);
        this.permissionSet.clear();
        if (this.props.PopupManager != null) {
            console.log(this.propsPopupManager.props.Body)
            this.props.PopupManager.props.Body.ContentsArea.refresh();
            this.props.PopupManager.props.Body.ContentsArea.closeAllpopup();
        }
        CommonData.clearData(CommonData.addItemList);
        CommonData.clearData(CommonData.bulkactionList);
        this.refresh();
    }
    responseAPICallback(response, key) {
        console.log("AddToGroup callback", response, key);
        this.setState({
            tableContent: response.data[key]
        });
    }

    show(visible, listType, contentInfo) {
        if (visible) {
            //임시로 추가되었던 아이템을 모두 클리어함
            CommonData.clearData(CommonData.addItemList);

            var api = ModelManager.GetAPICommand(listType);
            APIManager.requestAPI(
                api.get("apikey"),
                api.get("apicommand"),
                api.get("apiheader"),
                api.get("apibody"),
                this.responseAPICallback,
                api.get("apilistkey"));
            console.log("show", api.get("apibody"), listType)
            let objList = [];
            let tableItem = [];
            if (contentInfo != "changepermission") {
                tableItem = ModelManager.GetPopupContentInfo(contentInfo);
                for (var i = 0; i < tableItem.list.length; i++) {
                    switch (tableItem.list[i].tabletype) {
                        case "title":
                            let obj =
                                <div className="div-block-6"
                                    style={{ width: tableItem.list[i].tablewidth }}>
                                    {tableItem.list[i].tablelabel}
                                </div>
                            objList = objList.concat(obj);
                            break;
                    }
                }
            } else {
                let obj =
                    <div className="div-block-6"
                        style={{ width: 200 }}>권한</div>
                objList = objList.concat(obj);
            }

            this.setState({
                isShow: visible,
                tables: objList,
                tableinfo: tableItem,
                popupaction: contentInfo,
                popuplisttype: listType
            });
        } else {
            this.setState({
                isShow: visible,
                tableContent: [],
                tables: [],
                tableinfo: [],
                popupaction: "",
                popuplisttype: "",
                permission_1: false,
                permission_2: false,
                permission_4: false,
                permission_8: false,
                permission_16: false,
                permission_32: false,
                permission_64: false
            });
            this.permissionSet.clear();
        }

    }
    setPopupType(item) {
        this.setState({ item: item });
    }
    close() {
        this.props.PopupManager.close();
        ///this.props.PopupManager.thirdPopup.show(false, null, null);
        this.thirdPopup.show(false, null, null);
        this.setState({
            isShow: false,
            permission_1: false,
            permission_2: false,
            permission_4: false,
            permission_8: false,
            permission_16: false,
            permission_32: false,
            permission_64: false
        });
        this.permissionSet.clear();
    }
    checkbox(item) {
        if (CommonData.existItem(CommonData.addItemList, item)) {
            CommonData.addItemList = CommonData.removeData(CommonData.addItemList, item);
        } else {
            CommonData.addItemList = CommonData.appendData(CommonData.addItemList, item);
        }
        if (CommonData.existItem(this.state.selectedItems, item)) {
            this.setState({ selectedItems: CommonData.removeData(this.state.selectedItems, item) });
        } else {
            this.setState({ selectedItems: CommonData.appendData(this.state.selectedItems, item) });
        }
    }
    getMenu(permission, title) {
        var check = false;
        switch (permission) {
            case 1:
                check = this.state.permission_1;
                break;
            case 2:
                check = this.state.permission_2;
                break;
            case 4:
                check = this.state.permission_4;
                break;
            case 8:
                check = this.state.permission_8;
                break;
            case 16:
                check = this.state.permission_16;
                break;
            case 32:
                check = this.state.permission_32;
                break;
            case 64:
                check = this.state.permission_64;
                break;
        }
        var src = this.permissionSet.has(permission) ? '../images/chkbox2_on.png' : '../images/chkbox2_off.png'
        let html = <div className="div-group-addtomember-checkbox">
            <div className="div-table-checkbox">
                <div className="form-wrapper-6 w-form">
                    <form data-name="Email Form 2" id="email-form-2" name="email-form-2">
                        <div className="checkbox-field-2 w-checkbox">
                            <a onClick={this.setPermision.bind(null, permission)}>
                                <img src={src} />
                                <label className="field-label w-form-label" />
                            </a>

                        </div>
                    </form>
                    <div className="w-form-done" />
                    <div className="w-form-fail" />
                </div>
            </div>
            <div className="div-block-8">
                <div onClick={this.setPermision.bind(null, permission)} style={{ cursor: "pointer" }}>{title}</div>
            </div>
        </div>;
        return html;
    }
    render() {
        const mapToComponent = (data, check) => {
            return data.map((item, i) => {
                if (this.state.popupaction == "changepermission")
                    return null;
                return (<AddToGroupItem key={i} tableinfo={this.state.tableinfo} item={item} checkall={check} />);
            })
        };


        let title = "";
        let leftposition = 1197;
        let popupwidth = 375;
        switch (this.state.popupaction) {
            case "addautomator_togroup":
            case "addtogroup_device":
            case "addtogroup":
                popupwidth = 450;
                title = "조직에 추가하기";
                leftposition = 1197;
                break;
            case "adddevice_togroup":
            case "adduser_togroup":
                popupwidth = 450;
                title = "구성원 추가하기";
                leftposition = 1197;
                if (CommonData.selectedDevice != null) {
                    leftposition = 1085;
                    title = "구성원 보기";
                }
                if (!this.props.isBulkaction) {
                    leftposition = 1085;
                }
                break;
            case "adddevicegroup":
                title = "구성원 추가하기";
                leftposition = 1197;
                if (CommonData.selectedDevice != null || !this.props.isBulkaction) {
                    popupwidth = 450;
                    leftposition = 1085;
                    title = "구성원 보기";
                }
                break;
            case "changepermission":
                title = "권한 부여하기"
                break;
            case "autoinstall_automator":
                title = "설치후 자동실행할 오토메이터";
                popupwidth = 450;
                leftposition = 1085;
                break;
            case "autoinstall_group":
                title = "설치후 포함 될 장치 조직";
                popupwidth = 450;
                leftposition = 1085;
                break;
        }
        //if (this.props.isBulkaction != undefined && this.props.isBulkaction == false)
        //    leftposition = 950;

        let html_changepermission =
            <div className="popup-localuser-addtogroup" style={{
                display: this.state.isShow ? "flex" : "none", width: 450, height: 900, paddingLeft: 10, float: "right", marginRight: 20
            }}>
                <div className="div-popup-title" >
                    <div className="div-group-addtomember-title" style={{ paddingTop: 35, width: 400, display: "flex", justifyContent: "space-between" }}>
                        <div style={{ fontSize: 19, fontWeight: 700, marginTop: 3, letterSpacing: -2.5 }}>{title}</div>
                    </div>
                </div>
                <div className="div-group-addtomember-wrapper">
                    <div className="div-group-addtomember-type-title">
                        <div className="div-table-checkbox">
                            <div className="form-wrapper-6 w-form">
                                <form data-name="Email Form 2" id="email-form-2" name="email-form-2">
                                    <div className="checkbox-field-2 w-checkbox">

                                        <label className="field-label w-form-label" htmlFor="node-4" />
                                    </div>
                                </form>
                                <div className="w-form-done" />
                                <div className="w-form-fail" />
                            </div>
                        </div>
                        {this.state.tables}
                    </div>
                    <div className="div-line" style={{ width: 400, marginTop: 10, marginBottom: 10, marginLeft: 0 }} />
                    <div style={{ overflowX: "hidden", height: 600, width: 400, marginBottom: 20 }}>
                        {this.getMenu(1, "전원 관리자")}
                        {this.getMenu(2, "원격 화면 공유 관리자")}
                        {this.getMenu(4, "원격제어 관리자")}
                        {this.getMenu(8, "오토메이터")}
                        {this.getMenu(16, "고급 오토메이터")}
                        {this.getMenu(32, "자산 정보 관리자")}
                        {this.getMenu(64, "비밀번호 관리자")}
                    </div>
                    <div className="div-block-11">
                        <a className="button-circle-gray-nomargin w-button" style={{ backgroundColor: "#2d4fba", fontSize: 17 }} onClick={this.done} href="#">확인</a>
                    </div>
                </div>
            </div>


        let html =
            <div className="popup-localuser-addtogroup" style={{ width: popupwidth, display: this.state.isShow ? "block" : "none", height: 900, marginRight: 20, paddingLeft: 10, float: "right" }}>
                <div className="div-popup-title" >
                    <div className="div-group-addtomember-title" style={{ paddingTop: 35, width: 400, display: "flex", justifyContent: "space-between" }}>
                        <div style={{ fontSize: 19, fontWeight: 700, marginTop: 3, letterSpacing: -2.5 }}>{title}</div>
                        <form id="email-form" name="email-form" data-name="Email Form" className="form-search"
                            style={{ display: this.state.popupaction != "autoinstall_automator" && this.state.popupaction != "autoinstall_group" ? "block" : "none" }}>
                            <input type="text"
                                style={{ display: CommonData.CurrentMenu != "automator" ? "block" : "none", maxWidth: 200, height: 28, width: 182, marginRight: 30, borderBottomLeftRadius: 15, borderTopLeftRadius: 15 }}
                                onKeyDownCapture={this.search}
                                onChange={this.changeKeyword} id="name-5" name="name-5" data-name="Name 5" placeholder="검색" maxLength={256} className="form-search-input w-input" />
                            <input style={{ display: "none", maxWidth: 200, height: 28, width: 182, marginRight: 30, borderBottomLeftRadius: 15, borderTopLeftRadius: 15 }}
                                type="text" id="name-5" name="name-5" data-name="Name 5" placeholder="검색" maxLength={256}
                                className="form-search-input w-input" />
                        </form>
                    </div>

                </div>
                <div style={{ marginTop: 12, paddingLeft: 18, fontSize: "11pt", display: this.state.popupaction != "addtogroup" && CommonData.bulkactionList.length > 0 ? "block" : "none" }}>
                    {
                        (CommonData.bulkactionList.length > 0 ? CommonData.bulkactionList[0].name : "") +
                        (CommonData.bulkactionList.length > 1 ? " 외 " + (CommonData.bulkactionList.length - 1) + "개" : "")
                    }
                </div>
                <div className="div-group-addtomember-wrapper">
                    <div className="div-group-addtomember-type-title">
                        <div className="div-table-checkbox">
                            <div className="form-wrapper-6 w-form">
                                <form data-name="Email Form 2" id="email-form-2" name="email-form-2">
                                    <div className="checkbox-field-2 w-checkbox">
                                        <input style={{ display: "none" }} className="checkbox-item w-checkbox-input" id="node-3" type="checkbox" onClick={this.checkallitem.bind(this)} />
                                        <img src={this.state.checkall ? '../images/chkbox_title_on.png' : '../images/chkbox_title_off.png'} onClick={this.checkallitem.bind(this)} style={{ width: 14, height: 14, marginLeft: 6, marginRight: 10 }} width={14} height={14} />
                                        <label className="field-label w-form-label" htmlFor="node-4" />
                                    </div>
                                </form>
                                <div className="w-form-done" />
                                <div className="w-form-fail" />
                            </div>
                        </div>
                        {this.state.tables}
                    </div>
                    <div className="div-line" style={{ width: 400, marginTop: 10, marginBottom: 10, marginLeft: 0 }} />
                    <div style={{ overflowX: "hidden", height: 600, width: 400, marginBottom: 20 }}>
                        {mapToComponent(this.state.tableContent, this.state.checkall)}
                    </div>
                    <div style={{ display: CommonData.selectedDevice != null ? "block" : "none" }}>
                        <div className="div-line" style={{ width: 400, marginTop: 10, marginBottom: 10, marginLeft: 0 }} />
                        <div style={{ right: 30 }}>
                            <img src={'../images/plus.png'} onClick={this.showAddtoGroup} style={{ cursor: "pointer", width: 22, height: 22, marginRight: 5 }} />
                            <img src={'../images/minus.png'} onClick={this.removeUser} style={{ cursor: "pointer", width: 22, height: 22 }} />
                        </div>
                    </div>
                    <div className="div-block-11">
                        <a className="button-circle-gray-nomargin w-button" style={{ backgroundColor: "#2d4fba", fontSize: 17 }} onClick={this.done} href="#">확인</a>
                    </div>
                </div>
            </div>

        if (this.state.popupaction == "changepermission") {
            return (html_changepermission);
        } else {
            return (
                <div style={{ display: this.state.isShow ? "block" : "none" }}>
                    {html}
                    <AddToGroup2 ref={ref => this.thirdPopup = ref} isBulkaction={false} parent={this} />
                </div>
            );
        }

    }
}