import React from 'react';
import * as CommonData from '../../../../InformationData/CommonData.js';
import ModelManager from '../../../../Controller/ModelManager.js';
import APIManager from '../../../../Controller/APIManager.js';
import * as util from '../../../../Util/Util.js';
import AdvancedRun from './AdvancedRun.js';
import Automating from './Automating.js';
import AutomatorItem from './AutomatorItem.js';
/**
 * Automator
 * 
 * props 목록
 * PopupManager
 * 
 */

export default class Automator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isShow: false,
            tableContent: [],
            currentHover: -1,
            advancedView: false,
            type: "eAll",
            buttons: [],
            selectedoption: "",
            open: false

        }
        this.showAutomator = this.showAutomator.bind(this);
        this.close = this.close.bind(this);
        this.responseAPICallback = this.responseAPICallback.bind(this);
        this.toggleView = this.toggleView.bind(this);
        this.advancedRun = this.advancedRun.bind(this);
        this.dropdownClick = this.dropdownClick.bind(this);
        this.showAutomating = this.showAutomating.bind(this);
        this.execute = this.execute.bind(this);
        this.showdropdown = this.showdropdown.bind(this);
        this.showcurrentHover = this.showcurrentHover.bind(this);
    }
    showcurrentHover(currentItem) {
        this.setState({ currentHover: currentItem })
    }
    showdropdown(visible) {
        this.setState({ open: visible == null ? !this.state.open : visible });
    }
    execute() {
        if (CommonData.addItemList.length == 0)
            return;

        var IDlist = [];
        for (var i = 0; i < CommonData.addItemList.length; i++) {
            IDlist = IDlist.concat(CommonData.addItemList[i].id)
        }
        var today = new Date();
        var newAPI = util.newAPICommand();
        newAPI.put(
            "/coworksys", "/api/automatorschedule/insert", util.getDefaultHeader(),
            {
                "scheduleType": "eImmediatly",
                "automatorID": CommonData.selectedAutomator.id,
                "startTime": today.getTime(),
                "endTime": today.getTime(),
                "month": 1,
                "week": 1,
                "day": 1,
                "time": util.toDateStringHHmmss(today.getTime()),
                "deviceIDList": IDlist
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
        alert("오토메이터가 스케줄에 추가되었습니다.");

    }
    showAutomating() {
        console.log("showAutomating", this.props.automator.popupautomator)
        this.Automating.show(this.props.automator.popupautomator);
    }
    dropdownClick(e) {
        this.setState({ selectedoption: e });
        this.showdropdown(false);
        //CommonData.currentoption = e;
        this.setState({ type: util.enumDeviceTypeToEng(e) });
        this.showAutomator();
    }
    toggleView() {
        this.setState({ advancedView: this.state.advancedView ? false : true });
    }
    advancedRun(visible) {
        this.AdvancedRunPopup.show(visible);
    }
    showAutomator() {
        var newAPI = util.newAPICommand();
        newAPI.put(
            "/coworksys", "/api/device/get/list", util.getDefaultHeader(),
            {
                "startIndex": 0,
                "count": 300,
                "deviceGroupID": -1,
                "deviceGroupType": this.state.type,
                "alive": "eAlive"
            },
            null,
            "deviceList");
        APIManager.requestAPI(
            newAPI.get("apikey"),
            newAPI.get("apicommand"),
            newAPI.get("apiheader"),
            newAPI.get("apibody"),
            this.responseAPICallback,
            newAPI.get("apilistkey"));

        var buttonInfo = ModelManager.GetCommandInfo("device_group");
        this.setState({
            isShow: true,
            buttons: buttonInfo.list
        })
    }
    close() {
        this.Automating.close();
        this.setState({ isShow: false, open: false })
        CommonData.clearData(CommonData.addItemList);
        //this.props.PopupManager.close();
    }
    responseAPICallback(response, key) {
        console.log("responseAPICallback-automator", response, key)
        switch (key) {
            case "deviceList":
                this.setState({
                    tableContent: response.data[key]
                });
                break;
        }

    }

    render() {
        const mapToComponent = (data) => {
            return data.map((device, i) => {
                return (
                    <AutomatorItem automator={device} key={i} />
                )
            });
        };
        const mapToComponent_category = (data) => {

            return data.map((item, i) => {
                let objList = [];
                if (item.btntype == "category") {
                    let obj_dropdown = [];

                    for (var i = 0; i < item.labelList.length; i++) {
                        obj_dropdown = obj_dropdown.concat(
                            <a key={i} href="#"
                                onMouseOut={this.showcurrentHover.bind(null, -1)}
                                onMouseEnter={this.showcurrentHover.bind(null, i)}
                                style={{
                                    backgroundColor: this.state.currentHover == i ? "#324fb5" : "white",
                                    color: this.state.currentHover == i ? "white" : "#333"
                                }}
                                onClick={this.dropdownClick.bind(this, item.labelList[i])} className="dropdown-link w-dropdown-link">{item.labelList[i]}</a>)
                    }

                    let obj_category =
                        <div className="div-category" key={i} style={{ paddingLeft: 138 }}>
                            <div onClick={this.showdropdown.bind(null, null)} className="dropdown w-dropdown">
                                <div className="dropdown-toggle-group w-dropdown-toggle" style={{ width: 130 }}>
                                    <div>{item.labelList[0]}</div>
                                    <div className="icon-3 w-icon-dropdown-toggle" style={{ paddingLeft: 10 }} />
                                </div>
                                <div className="category-dropdown-list" style={{ display: this.state.open ? "flex" : "none", float: "right", marginTop: 15 }}>
                                    <div >
                                        {obj_dropdown}
                                    </div>
                                </div>
                            </div>
                            <div className="form-wrapper w-form" style={{ width: 100 }}>
                                <form id="email-form" name="email-form" data-name="Email Form" className="form-search">
                                    <input type="text" id="name-5" name="name-5" data-name="Name 5"
                                        placeholder="검색" maxLength={256} className="form-search-input w-input"
                                        style={{ width: 180 }} /></form>
                                <div className="w-form-done" />
                                <div className="w-form-fail" />
                            </div>
                        </div>
                    objList = objList.concat(obj_category);
                }
                return objList;
            })
        };
        
        return (
            <div className="div-automator-sidepage" style={{ height: "100%", right: 0, width: 938, display: this.state.isShow ? "block" : "none" }}>
                <div style={{ marginTop: 16, marginLeft: 5 }}>
                    <div className="div-bulk-device-title" style={{ marginBottom: 20, width: 920 }}>
                        <div className="text-block-11" >{CommonData.selectedAutomator != undefined ? CommonData.selectedAutomator.name : "Automating"}</div>
                        <a className="button-close" style={{ width: 20, height: 20 }} href="#" onClick={this.close} ><img src={'./images/close_black.png'} /></a></div>
                    <div className="div-automator-sidepage-buttons">
                        <a className="button-height-30-center w-button" style={{ marginRight: 10, width: 55 }} onClick={this.execute} href="#">실행</a>
                        <a className="button-height-30-width-130 w-button" style={{ marginRight: 10, width: 80 }} onClick={this.advancedRun.bind(null, true)} href="#">고급 실행</a>
                        <a className="button-height-30-width-130 w-button" style={{ marginRight: 10, width: 80 }} onClick={this.toggleView} href="#">내용 보기</a>
                        <a className="button-height-30-width-130 w-button" style={{ marginRight: 10, width: 80 }} onClick={this.showAutomating} href="#">실행이력</a>
                        <a className="button-height-30-center w-button" href="#" onClick={this.close} style={{ marginRight: 56, width: 55 }}>취소</a>
                        {mapToComponent_category(this.state.buttons)}
                    </div>
                </div>
                <div className="div-automator-contents">
                    <div className="div-automator-bg" style={{ paddingTop: 10 }}>
                        <div className="div-automator-sidepage-table-title" style={{ width: 938, marginTop: 17 }}>
                            <div className="div-table-checkbox">
                                <div className="form-wrapper-6 w-form">
                                    <form data-name="Email Form 2" id="email-form-2" name="email-form-2">
                                        <div className="checkbox-field-2 w-checkbox"></div>
                                    </form>
                                    <div className="w-form-done" />
                                    <div className="w-form-fail" />
                                </div>
                            </div>
                            <div className="div-table-fullname" style={{ width: 200 }}>
                                <div className="text-bold">장치 이름</div>
                                <a className="button-table-title w-button" style={{ color: "#3857cf" }} href="#"><img src={'../images/btn_align_up.png'} width={9} height={9} /></a>
                            </div>
                            <div className="div-table-fullname" style={{ width: 200 }}>
                                <div className="text-bold">IP Address</div>
                                <a className="button-table-title w-button" style={{ color: "#3857cf" }} href="#"><img src={'../images/btn_align_up.png'} width={9} height={9} /></a>
                            </div>
                            <div className="div-table-fullname" style={{ width: 200 }}>
                                <div className="text-bold">조직</div>
                                <a className="button-table-title w-button" style={{ color: "#3857cf" }} href="#"><img src={'../images/btn_align_up.png'} width={9} height={9} /></a>
                            </div>
                            <div className="div-table-fullname" style={{ width: 200 }}>
                                <div className="text-bold">Current User</div>
                                <a className="button-table-title w-button" style={{ color: "#3857cf" }} href="#"><img src={'../images/btn_align_up.png'} width={9} height={9} /></a>
                            </div>
                            <div className="div-table-fullname" style={{ width: 200 }}>
                                <div className="text-bold">Last Run</div>
                                <a className="button-table-title w-button" style={{ color: "#3857cf" }} href="#"><img src={'../images/btn_align_up.png'} width={9} height={9} /></a>
                            </div>
                            <div className="div-table-fullname" style={{ width: 200, marginRight: 10 }}>
                                <div className="text-bold">마지막 실행 결과</div>
                                <a className="button-table-title w-button" style={{ color: "#3857cf" }} href="#"><img src={'../images/btn_align_up.png'} width={9} height={9} /></a>
                            </div>
                        </div>
                        <div className="div-line" style={{ marginLeft: 24, width: 891 }} />
                        <div className="div-automator-table-scroll" style={{ height: (this.state.advancedView ? "60%" : "106%"), overflowX: "hidden" }}>
                            {mapToComponent(this.state.tableContent)}
                        </div>
                    </div>
                    <div className="div-automator-advanced-view">
                        <div style={{ display:this.props.automator.popupautomator!=undefined?"block":"none",width: 938 }}>
                            생성일 : {this.props.automator.popupautomator!=undefined?util.toDateStringYMDHHmmss_Kor(this.props.automator.popupautomator.aliveModifiedTime):""}, 생성자 : {this.props.automator.popupautomator!=null?this.props.automator.popupautomator.userID:""},  생성시 계정 수정일 : {this.props.automator.popupautomator!=null?util.toDateStringYMDHHmmss_Kor(this.props.automator.popupautomator.aliveModifiedTime):""}, 수정자 : {this.props.automator.popupautomator!=null?this.props.automator.popupautomator.userID:""}
                            <a href="#" style={{ marginLeft: 10 }} onClick={this.toggleView}><img height="15" src={this.state.advancedView == true ? "../images/white_down.png" : "../images/white_up.png"} width="15" /></a>
                        </div>
                        <div className="div-automating_bottom" style={{ overflow: "auto", height: this.state.advancedView ? "400px" : "0px" ,backgroundColor:"black"}} />
                    </div>
                    <div style={{ paddingLeft: 15,overflow: "auto", height: this.state.advancedView ? "400px" : "0px" ,paddingTop:40}}>
                        { this.props.automator.popupautomator != null && this.state.advancedView ? this.props.automator.popupautomator.script : ""}
                    </div>
                </div>
                <AdvancedRun ref={ref => this.AdvancedRunPopup = ref} />
                <Automating ref={ref => this.Automating = ref} />
            </div>
        );
    }
}