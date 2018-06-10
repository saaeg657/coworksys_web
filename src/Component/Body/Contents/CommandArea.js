import React from 'react';
import Dropdown from 'react-dropdown';
import * as util from '../../../Util/Util.js';
import * as CommonData from '../../../InformationData/CommonData.js';
import * as SessionUtil from '../../../Util/SessionUtil.js';
import APIManager from '../../../Controller/APIManager.js';
import update from 'react-addons-update';
import CollectionData from './CollectionData.js';
import { Chart } from 'react-google-charts';
import * as Properties from '../../../Properties.js';
export default class CommandArea extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            buttons: [],
            open: false,
            currentHover: -1,
            selectedoption: "",
            keyword: "",
            rows: [
                ['Task', 'Hours per Day'],
                ['Work', 11],
                ['Eat', 2],
                ['Commute', 2],
                ['Watch TV', 2],
                ['Sleep', 7]
            ]
        }
        this.dropdownClick = this.dropdownClick.bind(this);
        this.buttonAction = this.buttonAction.bind(this);
        this.refresh = this.refresh.bind(this);
        this.showCollectionData = this.showCollectionData.bind(this);
        this.SetCommandArea = this.SetCommandArea.bind(this);
        this.showdropdown = this.showdropdown.bind(this);
        this.showcurrentHover = this.showcurrentHover.bind(this);
        this.search = this.search.bind(this);
        this.changeKeyword = this.changeKeyword.bind(this);
        this.clearOption = this.clearOption.bind(this);
        this.responseAPICallback = this.responseAPICallback.bind(this);
        this.pdf = this.pdf.bind(this);

    }
    pdf() {
        if (CommonData.CurrentMenu == "report_software") {
            var userID = SessionUtil.getCookie("userID")
            if (userID == undefined)
                return;
            var url = Properties.ServerURL +
                "/coworksys/report/swSummary?userID=" + userID;
            window.open(url, "_blank");
        }
        else {
            var userID = SessionUtil.getCookie("userID")
            if (userID == undefined || this.CollectionData == undefined)
                return;

            var keys = "";

            for (var i = 0; i < this.props.ColumnItems.list.length; i++) {
                if (this.props.ColumnItems.list[i].ColumnChecked) {
                    keys += this.props.ColumnItems.list[i].ColumnKey + "-";
                }
            }
            if (keys.lastIndexOf("-") == keys.length - 1)
                keys = keys.substring(0, keys.lastIndexOf("-"));
            var currentoption = "";
            switch (this.state.selectedoption) {
                case "":
                    currentoption = "eAll";
                    break;
                case "관리 장비":
                    currentoption = "eManagedGroup";
                    break;
                case "비관리 장비":
                    currentoption = "eUnmanagedGroup";
                    break;
                case "자산 장비":
                    currentoption = "eAssetGroup";
                    break;
            }
            var url = Properties.ServerURL +
                "/coworksys/report/deviceListSummary?userID=" + userID +
                "&deviceGroupType=" + currentoption + "&column=" + keys;
            window.open(url, "_blank");
        }
    }
    responseAPICallback(response, key) {
        this.refresh();
    }

    clearOption() {
        this.setState({ keyword: "", selectedoption: "" });

    }
    changeKeyword(e) {
        this.setState({ keyword: e.target.value })
    }
    search(e) {
        if (e.keyCode == 13) {
            this.props.ContentsArea.KeywordSearch(this.state.keyword);
            console.log("CommandArea search", this.state.keyword);
        }
    }
    showcurrentHover(currentItem) {
        this.setState({ currentHover: currentItem })
    }
    showdropdown(visible) {
        this.setState({ open: visible == null ? !this.state.open : visible });
    }
    componentDidMount() {
        this.SetCommandArea(this.props);

    }
    componentWillReceiveProps(nextProps) {
        if (this.props.ContentsCommand != nextProps.ContentsCommand) {
            this.SetCommandArea(nextProps);
        }
    }
    SetCommandArea(props) {
        this.setState({
            buttons: props.ContentsCommand.list
        });
        for (var i = 0; i < props.ContentsCommand.list.length; i++) {
            if (props.ContentsCommand.list[i].btntype == "catogory") {
                CommonData.currentoption = props.ContentsCommand.list[i].labelList[0];
                break;
            }
        }
    }
    showCollectionData(visible) {
        if (this.CollectionData != undefined || this.CollectionData != null)
            this.CollectionData.show(visible);
    }
    refresh() {
        this.props.ContentsArea.refresh();
    }
    buttonAction(action) {
        if (action == "")
            return;
        switch (action) {
            case "device_sync":
                var IDlist = [];
                for (var i = 0; i < CommonData.bulkactionList.length; i++)
                    IDlist = IDlist.concat(CommonData.bulkactionList[i].id);
                var newAPI = util.newAPICommand();
                newAPI.put(
                    "/coworksys", "/api/device/sync", util.getDefaultHeader(),
                    {
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
                alert("장치가 동기화되었습니다.");
                return;
        }

        this.props.ContentsArea.tableEvent_buttonEvent(action);

    }
    dropdownClick(e) {
        this.setState({ selectedoption: e });
        this.showdropdown(false);
        this.props.ContentsArea.commandAction(e);
        CommonData.currentoption = e;
    }

    render() {
        const mapToComponent_button = (data) => {
            return data.map((item, i) => {
                let objList = [];
                if (item.btntype == "button") {
                    if (CommonData.CurrentMenu == "report_software" || CommonData.CurrentMenu == "report_hardware") {
                        let obj = <div className="div-localuser-button" style={{ marginRight: "10px" }} key={i}>
                            <a onClick={this.pdf}><img style={{ width: 30, height: 30, cursor: "pointer" }} src={'../images/pdf_icon.png'} /></a>
                        </div>
                        objList = objList.concat(obj)
                    }
                    else {
                        let obj = <div className="div-localuser-button" style={{ marginRight: "10px" }} key={i}>
                            <div className="button-height-30 w-button"
                                onClick={this.buttonAction.bind(null, item.btncallback)}
                                href="#" style={{ fontFamily: "NotosanscjkkrB", justifyContent: "center", paddingLeft: "0px", width: item.btnwidth }}>{item.btnlabel}</div>
                        </div>
                        objList = objList.concat(obj)
                    }


                }
                return objList;
            })
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
                        <div className="div-category" key={i}>
                            <div onClick={this.showdropdown.bind(null, null)} className="dropdown w-dropdown">
                                <div className="dropdown-toggle-group">
                                    <div style={{ width: 80, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{this.state.selectedoption != "" ? this.state.selectedoption : item.labelList[0]}</div>
                                    <div className="icon-3 w-icon-dropdown-toggle" />
                                </div>
                                <div className="category-dropdown-list" style={{ display: this.state.open ? "flex" : "none", float: "right", marginTop: 15 }}>
                                    <div >
                                        {obj_dropdown}
                                    </div>
                                </div>
                            </div>
                            <div className="form-wrapper w-form">
                                <form id="email-form" name="email-form" data-name="Email Form" className="form-search">
                                    <input type="text" onKeyDownCapture={this.search} onChange={this.changeKeyword} id="name-5" name="name-5" data-name="Name 5" placeholder="검색" maxLength={256} className="form-search-input w-input" />
                                    <input type="text" style={{ visibility: "hidden" }} />
                                </form>
                            </div>
                            {
                                CommonData.CurrentMenu == "report_hardware" ?
                                    <img onClick={this.showCollectionData.bind(this, true)} src={'../images/list_icon.png'} style={{ marginRight: 30, cursor: "pointer" }} />
                                    : ""
                            }


                        </div>
                    objList = objList.concat(obj_category);
                }
                return objList;
            })
        };

        var currentPosition = <div className="div-currentposition" style={{ marginBottom: "0px" }}>
            <div className="text-position" onClick={this.refresh} style={{ cursor: "pointer", textDecoration: "none" }}><img src={'../images/blue_dot.png'} style={{ width: 5, height: 5 }} />{"  " + this.props.ContentsCommand.list[0].btntitle}</div>
        </div>
        var buttonBase = <div className="div-localuser-column" style={{ height: "30px" }}>
            <div className="row-2 w-row">
                <div className="column" style={{ float: "left" }}>
                    <div className="div-localuser-buttongroup">
                        {mapToComponent_button(this.state.buttons)}
                    </div>
                </div>
                <div className="column" style={{ float: "right", marginRight: this.props.ContentsArea.props.Body.state.isShowMenu ? 250 : 70 }}>
                    <div className="div-localuser-buttongroup">
                        {mapToComponent_category(this.state.buttons)}
                    </div>
                </div>
            </div>
        </div>
        var html_report =
            <div>
                <div style={{ width: 1657, height: 30, marginTop: 25 }}>
                    <a href="#"><img style={{ width: 30, height: 30 }} src={'../images/pdf_icon.png'} /></a>

                </div>
                <div style={{ textAlign: "center", fontSize: 18, fontFamily: "NotosanscjkkrB", backgroundColor: "#f6f6f8", width: 1657, height: 30 }}>
                    Computers by os
                </div>
                <div style={{ textAlign: "center", fontSize: 18, fontFamily: "NotosanscjkkrB", backgroundColor: "white", width: 1657, height: 250, marginBottom: 30 }}>

                    <Chart
                        chartType="ScatterChart"
                        data={[['Age', 'Weight'], [8, 12], [4, 5.5]]}
                        options={{}}
                        graph_id="ScatterChart"
                        width="100%"
                        height="100%"
                    />

                </div>

            </div>

        return (
            <div className="div-localuser">
                {currentPosition}
                {/*CommonData.CurrentMenu == "report_software" ? html_report : ""*/}
                {buttonBase}
                {CommonData.CurrentMenu == "report_hardware" ?
                        <CollectionData ref={ref => this.CollectionData = ref} parent={this} CheckItem={this.props.ColumnItems} />
                    : ""}

            </div>

        );
    }
}