import React from 'react';
import Body from '../Component/Body/Body.js'

import * as CommonData from '../InformationData/CommonData.js';
import ModelManager from '../Controller/ModelManager.js';
import Login from '../Component/Login/Login.js';
import * as SessionUtil from '../Util/SessionUtil.js';
import * as util from '../Util/Util.js';
import APIManager from '../Controller/APIManager.js';

/**
 * View Manager
 * 
 * props 목록
 * ActionManager
 * APIManager
 * 
 * state 목록
 * menu : 현재 메뉴 (대분류)
 * submenu : 현재 메뉴 (소분류)
 */
export default class ViewManager extends React.Component {
    constructor(props) {
        super(props);
        this.state =
            {
                isLogin: false,
                loginUser: "",
                menu: "device",
                submenu: "device_device",
                contentsCommand: ModelManager.GetCommandInfo("device_device"),
                contentsTable: ModelManager.GetTableInfo("device_device"),
                apiCommand: ModelManager.GetAPICommand("device_device"),
                refresh: false,
                categoryItems: []
            }

        this.OpenAddUser = this.OpenAddUser.bind(this);
        this.MovePage = this.MovePage.bind(this);
        this.ClearCheckBox = this.ClearCheckBox.bind(this);
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
        this.responseAPICallback = this.responseAPICallback.bind(this);
        this.GetIDfromkey = this.GetIDfromkey.bind(this);
    }
    GetIDfromkey(key) {
        if (this.state.categoryItems.length > 0) {
            for (var i = 0; i < this.state.categoryItems.length; i++) {
                if (this.state.categoryItems[i].name == key)
                    return this.state.categoryItems[i].id;
            }
        }
        return -1;
    }
    responseAPICallback(response, key) {
        let obj = ModelManager.GetCommandInfo("device_device");
        let deviceList = ['장치조직'];
        let _list = response.data[key];
        for (var i = 0; i < _list.length; i++) {
            deviceList = deviceList.concat(_list[i].name);
        }

        obj.put("device_device", "로컬 유저", "category", "장치 조직", deviceList, null, null);
        this.setState({
            menu: "device",
            submenu: "device_device",
            contentsTable: ModelManager.GetTableInfo("device_device"),
            contentsCommand: obj,
            apiCommand: ModelManager.GetAPICommand("device_device"),
            categoryItems: response.data[key]
        });
        if (this.Body != undefined && this.Body.ResetSearchKeyword != undefined)
            this.Body.ResetSearchKeyword();
    }
    login(email, userID, rememberAcount) {
        this.setState({ isLogin: true, loginUser: email });
        if (rememberAcount) {
            SessionUtil.setCookie("email", email);
            SessionUtil.setCookie("userID", userID);
        }
    }
    logout() {
        this.setState({ isLogin: false, loginUser: "" });
        SessionUtil.setCookie("email", "");
        SessionUtil.setCookie("userID", "");
    }
    ChangeColumn() {
        CommonData.report_hardwareList.find("name");
    }
    componentDidMount() {
        if (this.state.submenu == "device_device") {
            this.MovePage("device", "device_device");
        }
        else {
            this.setState({
                contentsTable: ModelManager.GetTableInfo(this.state.submenu),
                contentsCommand: ModelManager.GetCommandInfo(this.state.submenu),
                apiCommand: ModelManager.GetAPICommand(this.state.submenu)
            })
        }
    }

    MovePage(newMenu, newSubmenu) {
        
        if (newSubmenu == "device_device") {
            console.log("MovePage_device", newMenu, newSubmenu)
            var api = ModelManager.GetAPICommand("device_group");
            APIManager.requestAPI(
                api.get("apikey"),
                api.get("apicommand"),
                api.get("apiheader"),
                api.get("apibody"),
                this.responseAPICallback,
                api.get("apilistkey"));
        } else {
            console.log("MovePage", newMenu, newSubmenu)
            this.setState({
                menu: newMenu,
                submenu: newSubmenu,
                contentsTable: ModelManager.GetTableInfo(newSubmenu),
                contentsCommand: ModelManager.GetCommandInfo(newSubmenu),
                apiCommand: ModelManager.GetAPICommand(newSubmenu),
                categoryItems: []
            });
        }
        if (this.Body != undefined && this.Body.ResetSearchKeyword != undefined)
            this.Body.ResetSearchKeyword();
    }

    OpenAddUser() {
        console.log("ViewManager", "OpenAddUser");
    }
    ClearCheckBox() {
        this.setState({ refresh: !this.state.refresh })
        CommonData.clearData(CommonData.bulkactionList);
    }
    render() {
        /*
        <div style={{float:"left", width:"10%",height:"100%", backgroundColor:"yellow"}}/>
        
                    <Body
                    ref={ref => this.Body = ref}
                        menu={this.state.menu}
                        submenu={this.state.submenu}
                        ViewManager={this}
                        ActionManager={this.props.ActionManager}
                        APICommand={this.state.apiCommand}
                        ContentsCommand={this.state.contentsCommand}
                        ContentsTable={this.state.contentsTable} />
                         */
        if (!this.state.isLogin) {
            return (<Login ViewManager={this} />);

        }
        else {
            return (
                <div style={{ width: "100%", height: "100%", backgroundColor: "grey" }}>
                    <Body
                        ref={ref => this.Body = ref}
                        username={this.state.loginUser}
                        menu={this.state.menu}
                        submenu={this.state.submenu}
                        ViewManager={this}
                        ActionManager={this.props.ActionManager}
                        APICommand={this.state.apiCommand}
                        ContentsCommand={this.state.contentsCommand}
                        ContentsTable={this.state.contentsTable} />
                </div>

            );
        }
    }
}


