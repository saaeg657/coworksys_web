import React from 'react';
import * as util from '../../../../Util/Util.js';
import * as CommonData from '../../../../InformationData/CommonData.js';
import APIManager from '../../../../Controller/APIManager.js';
export default class Automating extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isShow: false,
            automator: null,
            list: []
        };
        this.show = this.show.bind(this);
        this.close = this.close.bind(this);
        this.responseAPICallback = this.responseAPICallback.bind(this);
    }
    responseAPICallback(response, key) {
        this.setState({ list: response.data[key] })
    }
    show(automator) {
        this.setState({ isShow: this.state.isShow ? false : true, automator: automator });
        var newAPI = util.newAPICommand();
        newAPI.put(
            "/coworksys", "/api/automator/get/logList", util.getDefaultHeader(),
            {
                "automatorID": automator.id,
            },
            null,
            "automatorLogList");
        APIManager.requestAPI(
            newAPI.get("apikey"),
            newAPI.get("apicommand"),
            newAPI.get("apiheader"),
            newAPI.get("apibody"),
            this.responseAPICallback,
            newAPI.get("apilistkey"));
    }

    close() {
        this.setState({ isShow: false });
    }

    render() {
        const mapToComponent = (data) => {
            return data.map((log, i) => {
                return (
                    <div key={i} >
                        <div className="div-table-item-group" style={{ paddingLeft: 15, width: 650 }} >
                            <div style={{ width: 190, float: "left", cursor: "pointer", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{util.toDateStringYMDHHmmss_Kor(log.runningTime)}</div>
                            <div style={{ width: 90 }}>{log.automatorTargetID}</div>
                            <div style={{ width: 80, float: "left", cursor: "pointer", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{util.enumAutomatorExcuteStatus(log.status)}</div>
                            <div style={{ width: 270, float: "left", cursor: "pointer", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{log.description != null ? log.description : "-"}</div>
                        </div>
                    </div>
                )
            });
        };
        return (
            <div className="popup-advancedrun" style={{ display: this.state.isShow ? "block" : "none", width: 680, right: 950, height:1000 }}>
                <div className="div-popup-title2" style={{ marginTop: 14, paddingLeft: 15, fontSize: "17pt", fontWeight: 700 }}>
                    <div>오토메이팅</div>
                </div>
                <div className="div-automator-sidepage-table-title" style={{ width: 938, marginTop: 24, paddingLeft: 15 }}>
                    <div className="div-table-fullname" style={{ width: 190 }}>
                        <div className="text-bold">일시</div>
                    </div>
                    <div className="div-table-fullname" style={{ width: 90 }}>
                        <div className="text-bold">실행자</div>
                    </div>
                    <div className="div-table-fullname" style={{ width: 80 }}>
                        <div className="text-bold">결과</div>
                    </div>
                    <div className="div-table-fullname" style={{ width: 270 }}>
                        <div className="text-bold">기록</div>
                    </div>
                </div>
                <div className="div-line" style={{ marginLeft: 15, marginTop: 6, marginBottom: 7, width: 650 }} />
                <div style={{ height: 500 }}>
                    {mapToComponent(this.state.list)}
                </div>
                <div
                    style={{
                        position: "fixed",
                        bottom: 30,
                        display: "flex",
                        paddingLeft: 20,
                    }}>
                    <a className="button-height-30-center w-button" style={{ marginRight: 10, width: 74 }} onClick={this.close} href="#">내보내기</a>
                    <a className="button-height-30-width-130 w-button" style={{ marginRight: 10, width: 154 }} onClick={this.close} href="#">YY/MM/DD-YY/MM/DD</a>
                    <a className="button-height-30-width-130 w-button" style={{ marginRight: 10, width: 30 }} onClick={this.close} href="#">{" "}</a>
                </div>
            </div >
        );



    }
}
