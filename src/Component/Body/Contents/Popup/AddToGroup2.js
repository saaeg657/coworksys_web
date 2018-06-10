import React from 'react';
import * as CommonData from '../../../../InformationData/CommonData.js';
import ModelManager from '../../../../Controller/ModelManager.js';
import APIManager from '../../../../Controller/APIManager.js';
import * as util from '../../../../Util/Util.js';
import AddToGroup2Item from './AddToGroup2Item.js';
/**
 * AddToGroup
 * 
 * props 목록
 * PopupManager
 * 
 */

export default class AddToGroup2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isShow: false,
            tableContent: [],
            tables: [],
            tableinfo: [],
            popupaction: "",
            checkall: false
        }
        this.close = this.close.bind(this);
        this.responseAPICallback = this.responseAPICallback.bind(this);
        this.responseAPICallback_done = this.responseAPICallback_done.bind(this);
        this.checkbox = this.checkbox.bind(this);
        this.done = this.done.bind(this);
        this.getMenu = this.getMenu.bind(this);
        this.checkallitem = this.checkallitem.bind(this);
        this.showAddtoGroup = this.showAddtoGroup.bind(this);
        this.removeUser = this.removeUser.bind(this);
        this.showMessage = this.showMessage.bind(this);
    }
    showMessage(msg) {
        alert(msg);
    }
    showAddtoGroup() {

    }
    removeUser() {

    }
    checkallitem(e) {
        this.setState({ checkall: e.target.checked });
    }

    done() {
        if (CommonData.selectedDevice == null) {
            this.close();
            return;
        }

        let IDlist = [];
        let userIDlist = [];

        switch (this.state.popupaction) {
            case "adddevice_togroup":
                for (var i = 0; i < CommonData.thirdPopupList.length; i++)
                    IDlist = IDlist.concat(CommonData.thirdPopupList[i].id);
                var newAPI = util.newAPICommand();
                newAPI.put(
                    "/coworksys", "/api/device/insert/deviceGroup", util.getDefaultHeader(),
                    {
                        "deviceIDList": IDlist,
                        "deviceGroupID": CommonData.selectedDevice.id
                    },
                    null,
                    null);
                var body = {
                    "deviceIDList": IDlist,
                    "deviceGroupID": CommonData.selectedDevice.id
                };
                console.log("adddevice_togroup", body)
                APIManager.requestAPI(
                    newAPI.get("apikey"),
                    newAPI.get("apicommand"),
                    newAPI.get("apiheader"),
                    newAPI.get("apibody"),
                    this.responseAPICallback_done,
                    newAPI.get("apilistkey"));
                this.showMessage("장치가 조직에 추가되었습니다.");
                break;
            case "adduser_togroup":
                for (var i = 0; i < CommonData.thirdPopupList.length; i++)
                    IDlist = IDlist.concat(CommonData.thirdPopupList[i].id);
                var body = {
                    "groupID": CommonData.selectedDevice.id,
                    "userIDList": IDlist
                };
                console.log("addusertogroup", body)
                var newAPI = util.newAPICommand();
                newAPI.put(
                    "/coworksys", "/api/user/insert/userGroup", util.getDefaultHeader(),
                    {
                        "groupID": CommonData.selectedDevice.id,
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
                this.showMessage("사용자가 조직에 추가되었습니다.");
                break;
        }
    }
    responseAPICallback_done(response, key) {
        console.log("AddToGroup2 done", response, key);
        this.close();
    }
    responseAPICallback(response, key) {
        this.setState({
            tableContent: response.data[key]
        });
    }

    show(visible, listType, contentInfo) {
        console.log("third,show", visible)
        if (visible) {
            //임시로 추가되었던 아이템을 모두 클리어함
            var api = ModelManager.GetAPICommand(listType);
            APIManager.requestAPI(
                api.get("apikey"),
                api.get("apicommand"),
                api.get("apiheader"),
                api.get("apibody"),
                this.responseAPICallback,
                api.get("apilistkey"));
            CommonData.clearData(CommonData.addItemList);
            var api = ModelManager.GetAPICommand(listType);
            APIManager.requestAPI(
                api.get("apikey"),
                api.get("apicommand"),
                api.get("apiheader"),
                api.get("apibody"),
                this.responseAPICallback,
                api.get("apilistkey"));

            let objList = [];
            let tableItem = [];
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


            this.setState({
                isShow: visible,
                tables: objList,
                tableinfo: tableItem,
                popupaction: contentInfo
            });
        } else {
            this.setState({
                isShow: visible,
                tableContent: [],
                tables: [],
                tableinfo: [],
                popupaction: ""
            });
        }

    }
    setPopupType(item) {
        this.setState({ item: item });
    }
    close() {
        this.setState({
            isShow: false,
            tableContent: [],
            tables: [],
            tableinfo: [],
            popupaction: "",
            checkall: false
        });
        this.props.parent.refresh();
        CommonData.clearData(CommonData.thirdPopupList);
        CommonData.thirdPopupList = [];


    }
    checkbox(item) {
        if (CommonData.existItem(CommonData.thirdPopupList, item)) {
            CommonData.thirdPopupList = CommonData.removeData(CommonData.thirdPopupList, item);
        } else {
            CommonData.thirdPopupList = CommonData.appendData(CommonData.thirdPopupList, item);
        }
    }
    getMenu(permission, title) {
        let html = <div className="div-group-addtomember-checkbox">
            <div className="div-table-checkbox">
                <div className="form-wrapper-6 w-form">
                    <form data-name="Email Form 2" id="email-form-2" name="email-form-2">
                        <div className="checkbox-field-2 w-checkbox">
                            <input className="checkbox-item w-checkbox-input" value={permission} onChange={this.setPermision} id="node-3" type="checkbox" />
                            <label className="field-label w-form-label" htmlFor="node-4" />
                        </div>
                    </form>
                    <div className="w-form-done" />
                    <div className="w-form-fail" />
                </div>
            </div>
            <div className="div-block-8">
                <div>{title}</div>
            </div>
        </div>;
        return html;
    }
    render() {
        const mapToComponent = (data, check) => {
            return data.map((item, i) => {
                let result = [];

                return (<AddToGroup2Item key={i} tableinfo={this.state.tableinfo} item={item} checkall={check} />);
            })
        };

        let title = "조직에 추가하기";
        let leftposition = 625;
        let popupwidth = 450;

        if (CommonData.CurrentMenu == "device_group") {
title = "구성원 추가";
        }

        return (
            <div className="popup-localuser-addtogroup" style={{ width: popupwidth, display: this.state.isShow ? "block" : "none", height: 900, float: "right", paddingLeft: 10, marginRight: 20 }}>
                <div className="div-popup-title" >
                    <div className="div-group-addtomember-title" style={{ paddingTop: 35, width: 400, display: "flex", justifyContent: "space-between" }}>
                        <div style={{ fontSize: 19, fontWeight: 700, marginTop: 3, letterSpacing: -2.5 }}>{title}</div>
                        <form id="email-form" name="email-form" data-name="Email Form" className="form-search">
                            <input style={{ maxWidth: 200, height: 28, width: 182, marginRight: 30, borderBottomLeftRadius: 15, borderTopLeftRadius: 15 }}
                                onClick={this.checkallitem.bind(this)} type="text" id="name-5" name="name-5" data-name="Name 5" placeholder="검색" maxLength={256}
                                className="form-search-input w-input" />
                        </form>
                    </div>

                </div>
                <div className="div-group-addtomember-wrapper">
                    <div className="div-group-addtomember-type-title">
                        <div className="div-table-checkbox">
                            <div className="form-wrapper-6 w-form">
                                <form data-name="Email Form 2" id="email-form-2" name="email-form-2">
                                    <div className="checkbox-field-2 w-checkbox">
                                        <input style={{ display: "none" }} className="checkbox-item w-checkbox-input" id="node-3" type="checkbox" checked={this.state.checkall} onClick={this.checkallitem.bind(this)} />
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
                    <div style={{ overflowX: "hidden", height: 620, width: 400, marginBottom: 20 }}>
                        {mapToComponent(this.state.tableContent, this.state.checkall)}
                    </div>
                    <div className="div-block-11">
                        <a className="button-circle-gray-nomargin w-button" style={{ backgroundColor: "#2d4fba", fontSize: 17 }} onClick={this.done} href="#">확인</a>
                    </div>
                </div>
            </div>);


    }
}