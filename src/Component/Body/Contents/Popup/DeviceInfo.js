import React from 'react';
import * as util from '../../../../Util/Util.js';
import * as CommonData from '../../../../InformationData/CommonData.js';
import Summary from './DeviceInfo/Summary.js';
import Hardware from './DeviceInfo/Hardware.js';
import Software from './DeviceInfo/Software.js';
import External from './DeviceInfo/External.js';
import Automator from './DeviceInfo/Automator.js';
import Log from './DeviceInfo/Log.js';
import APIManager from '../../../../Controller/APIManager.js';

export default class DeviceInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isShow: false,
            expand: false,
            selectedMenu: "summary",
            syncTime: 0,
            System: null,
            HardDisk: [],
            Monitor: [],
            NetworkAdapters: [],
            PhysicalMemory: [],
            Processors: [],
            VideoController: [],
            ExternalDevice: "",
            SystemHistory: [],
            SWInfo: {},
            fileInfo: {},
            automatorHistory: []
        }
        this.show = this.show.bind(this);
        this.expand = this.expand.bind(this);
        this.close = this.close.bind(this);
        this.selectMenu = this.selectMenu.bind(this);
        this.responseAPICallback = this.responseAPICallback.bind(this);
    }
    responseAPICallback(response, key) {
        switch (key) {
            case "automatorLogList":
                this.setState({ automatorHistory: response.data[key] })
                return;
        }
        console.log("Device info", response)
        var jsonData = response.data[key];
        for (var i in jsonData) {
            var key = i;
            var val = jsonData[i];

            switch (i) {
                case "syncTime":
                    this.setState({ syncTime: val })
                    break;
                case "System":
                    this.setState({ System: val })
                    break;
                case "HardDisk":
                    this.setState({ HardDisk: JSON.parse(val) })
                    break;
                case "Monitor":
                    if (val.length == 0)
                        break;
                    this.setState({ Monitor: JSON.parse(val) })
                    break;
                case "NetworkAdapters":
                    this.setState({ NetworkAdapters: JSON.parse(val) })
                    break;
                case "PhysicalMemory":
                    this.setState({ PhysicalMemory: JSON.parse(val) })
                    break;
                case "Processors":
                    this.setState({ Processors: JSON.parse(val) })
                    break;
                case "VideoController":
                    this.setState({ VideoController: JSON.parse(val) })
                    break;
                case "ExternalDevice":
                    this.setState({ ExternalDevice: JSON.parse(val) })
                    break;
                case "SystemHistory":
                    this.setState({ SystemHistory: JSON.parse(val) })
                    break;
                case "swInfo":
                    this.setState({ SWInfo: JSON.parse(val) })
                    break;
                case "fileInfo":
                    this.setState({ fileInfo: JSON.parse(val) })
                    break;


            }
            /*
            for (var j in val) {
                var sub_key = j;
                var sub_val = val[j];
                console.log("subkey", sub_key);
            }*/
        }
        console.log("Device Info", this.state);
    }
    selectMenu(menu) {
        this.setState({ selectedMenu: menu });
    }
    close() {
        this.setState({
            isShow: false,
            expand: false
        })
    }
    show(visible) {
        this.setState({ isShow: visible })
        if (visible) {
            var HWInfo = util.newAPICommand();
            HWInfo.put(
                "/coworksys", "/api/device/get/hwInfo", util.getDefaultHeader(),
                {
                    "deviceID": CommonData.selectedDevice.id
                },
                null,
                "hwInfo");
            //console.log("device ID", CommonData.selectedDevice.id, CommonData.selectedDevice)
            APIManager.requestAPI(
                HWInfo.get("apikey"),
                HWInfo.get("apicommand"),
                HWInfo.get("apiheader"),
                HWInfo.get("apibody"),
                this.responseAPICallback,
                HWInfo.get("apilistkey"));

            var SWInfo = util.newAPICommand();
            SWInfo.put(
                "/coworksys", "/api/device/get/swInfo", util.getDefaultHeader(),
                {
                    "deviceID": CommonData.selectedDevice.id
                },
                null,
                "swInfo");
            //console.log("device ID", CommonData.selectedDevice.id, CommonData.selectedDevice)
            APIManager.requestAPI(
                SWInfo.get("apikey"),
                SWInfo.get("apicommand"),
                SWInfo.get("apiheader"),
                SWInfo.get("apibody"),
                this.responseAPICallback,
                SWInfo.get("apilistkey"));

            var AutomatorInfo = util.newAPICommand();
            AutomatorInfo.put(
                "/coworksys", "/api/device/get/automatorHistory", util.getDefaultHeader(),
                {
                    "deviceID": CommonData.selectedDevice.id
                },
                null,
                "automatorLogList");
            //console.log("device ID", CommonData.selectedDevice.id, CommonData.selectedDevice)
            APIManager.requestAPI(
                AutomatorInfo.get("apikey"),
                AutomatorInfo.get("apicommand"),
                AutomatorInfo.get("apiheader"),
                AutomatorInfo.get("apibody"),
                this.responseAPICallback,
                AutomatorInfo.get("apilistkey"));
        }
    }

    expand(e) {
        this.setState({ expand: e });

    }
    render() {
        var html_expand =
            <div className="bulkaction-device-detail" style={{ left: 612, height: 900, backgroundColor: "#f9f9f9" }}>
                {this.state.selectedMenu == "summary" ? <Summary fileInfo={this.state.fileInfo} syncTime={this.state.syncTime} /> : ""}
                {this.state.selectedMenu == "hardware" ?
                    <Hardware
                        HardDisk={this.state.HardDisk}
                        Monitor={this.state.Monitor}
                        NetworkAdapters={this.state.NetworkAdapters}
                        PhysicalMemory={this.state.PhysicalMemory}
                        Processors={this.state.Processors}
                        VideoController={this.state.VideoController} /> : ""}
                {this.state.selectedMenu == "software" ? <Software SWInfo={this.state.SWInfo} /> : ""}
                {this.state.selectedMenu == "external" ? <External /> : ""}
                {this.state.selectedMenu == "automator" ? <Automator automatorHistory={this.state.automatorHistory} /> : ""}
                {this.state.selectedMenu == "log" ? <Log history={this.state.SystemHistory} /> : ""}

                <div className="div-block-43-copy" style={{ paddingTop: 15, width: 148 }}>
                    <div className="div-block-44" onClick={this.selectMenu.bind(null, "summary")}
                        style={{ paddingLeft: 10, height: 45, marginTop: 3, marginBottom: 3, cursor: "pointer", color: this.state.selectedMenu == "summary" ? "white" : "black", backgroundColor: this.state.selectedMenu == "summary" ? "#5f9bda" : "transparent" }} ><img src="../images/log.png" style={{ width: 40, height: 40 }} />
                        <div className="text-block-17" >요약정보</div>
                    </div>
                    <div className="div-block-44" onClick={this.selectMenu.bind(null, "hardware")}
                        style={{ paddingLeft: 10, height: 45, marginTop: 3, marginBottom: 3, cursor: "pointer", color: this.state.selectedMenu == "hardware" ? "white" : "black", backgroundColor: this.state.selectedMenu == "hardware" ? "#5f9bda" : "transparent" }}><img src="../images/hardware.png" style={{ width: 40, height: 40 }} />
                        <div className="text-block-17" >하드웨어</div>
                    </div>
                    <div className="div-block-44" onClick={this.selectMenu.bind(null, "software")}
                        style={{ paddingLeft: 10, height: 45, marginTop: 3, marginBottom: 3, cursor: "pointer", color: this.state.selectedMenu == "software" ? "white" : "black", backgroundColor: this.state.selectedMenu == "software" ? "#5f9bda" : "transparent" }}><img src="../images/software.png" style={{ width: 40, height: 40 }} />
                        <div className="text-block-17" >소프트웨어</div>
                    </div>
                    <div className="div-block-44" onClick={this.selectMenu.bind(null, "external")}
                        style={{ paddingLeft: 10, height: 45, marginTop: 3, marginBottom: 3, cursor: "pointer", color: this.state.selectedMenu == "external" ? "white" : "black", backgroundColor: this.state.selectedMenu == "external" ? "#5f9bda" : "transparent" }}><img src="../images/external.png" style={{ width: 40, height: 40 }} />
                        <div className="text-block-17" >외부장치</div>
                    </div>
                    <div className="div-block-44" onClick={this.selectMenu.bind(null, "automator")}
                        style={{ paddingLeft: 10, height: 45, marginTop: 3, marginBottom: 3, cursor: "pointer", color: this.state.selectedMenu == "automator" ? "white" : "black", backgroundColor: this.state.selectedMenu == "automator" ? "#5f9bda" : "transparent" }}><img src="../images/automator.png" style={{ width: 40, height: 40 }} />
                        <div className="text-block-17" >오토메이터</div>
                    </div>
                    <div className="div-block-44" onClick={this.selectMenu.bind(null, "log")}
                        style={{ paddingLeft: 10, height: 45, marginTop: 3, marginBottom: 3, cursor: "pointer", color: this.state.selectedMenu == "log" ? "white" : "black", backgroundColor: this.state.selectedMenu == "log" ? "#5f9bda" : "transparent" }}><img src="../images/log.png" style={{ width: 40, height: 40 }} />
                        <div className="text-block-17" >사용이력</div>
                    </div>
                </div>
            </div>

        if (CommonData.selectedDevice != null) {
            return (
                <div style={{ display: this.state.isShow ? "flex" : "none", paddingTop: 40, width: 360, height: "100%", float: "right" }}>
                    <div className="bulkaction-device-detail" style={{ display: this.state.expand ? "block" : "none", height: "92%", right: 370 }}>
                        {this.state.selectedMenu == "summary" ? <Summary fileInfo={this.state.fileInfo} syncTime={this.state.syncTime} /> : ""}
                        {this.state.selectedMenu == "hardware" ?
                            <Hardware
                                HardDisk={this.state.HardDisk}
                                Monitor={this.state.Monitor}
                                NetworkAdapters={this.state.NetworkAdapters}
                                PhysicalMemory={this.state.PhysicalMemory}
                                Processors={this.state.Processors}
                                VideoController={this.state.VideoController} /> : ""}
                        {this.state.selectedMenu == "software" ? <Software SWInfo={this.state.SWInfo} /> : ""}
                        {this.state.selectedMenu == "external" ? <External device={this.state.ExternalDevice} /> : ""}
                        {this.state.selectedMenu == "automator" ? <Automator automatorHistory={this.state.automatorHistory} /> : ""}
                        {this.state.selectedMenu == "log" ? <Log history={this.state.SystemHistory} /> : ""}

                        <div className="div-block-43-copy" style={{ paddingTop: 15, width: 148 }}>
                            <div className="div-block-44" onClick={this.selectMenu.bind(null, "summary")}
                                style={{ paddingLeft: 10, height: 45, marginTop: 3, marginBottom: 3, cursor: "pointer", color: this.state.selectedMenu == "summary" ? "white" : "black", backgroundColor: this.state.selectedMenu == "summary" ? "#5f9bda" : "transparent" }} ><img src="../images/log.png" style={{ width: 40, height: 40 }} />
                                <div className="text-block-17" >요약정보</div>
                            </div>
                            <div className="div-block-44" onClick={this.selectMenu.bind(null, "hardware")}
                                style={{ paddingLeft: 10, height: 45, marginTop: 3, marginBottom: 3, cursor: "pointer", color: this.state.selectedMenu == "hardware" ? "white" : "black", backgroundColor: this.state.selectedMenu == "hardware" ? "#5f9bda" : "transparent" }}><img src="../images/hardware.png" style={{ width: 40, height: 40 }} />
                                <div className="text-block-17" >하드웨어</div>
                            </div>
                            <div className="div-block-44" onClick={this.selectMenu.bind(null, "software")}
                                style={{ paddingLeft: 10, height: 45, marginTop: 3, marginBottom: 3, cursor: "pointer", color: this.state.selectedMenu == "software" ? "white" : "black", backgroundColor: this.state.selectedMenu == "software" ? "#5f9bda" : "transparent" }}><img src="../images/software.png" style={{ width: 40, height: 40 }} />
                                <div className="text-block-17" >소프트웨어</div>
                            </div>
                            <div className="div-block-44" onClick={this.selectMenu.bind(null, "external")}
                                style={{ paddingLeft: 10, height: 45, marginTop: 3, marginBottom: 3, cursor: "pointer", color: this.state.selectedMenu == "external" ? "white" : "black", backgroundColor: this.state.selectedMenu == "external" ? "#5f9bda" : "transparent" }}><img src="../images/external.png" style={{ width: 40, height: 40 }} />
                                <div className="text-block-17" >외부장치</div>
                            </div>
                            <div className="div-block-44" onClick={this.selectMenu.bind(null, "automator")}
                                style={{ paddingLeft: 10, height: 45, marginTop: 3, marginBottom: 3, cursor: "pointer", color: this.state.selectedMenu == "automator" ? "white" : "black", backgroundColor: this.state.selectedMenu == "automator" ? "#5f9bda" : "transparent" }}><img src="../images/automator.png" style={{ width: 40, height: 40 }} />
                                <div className="text-block-17" >오토메이터</div>
                            </div>
                            <div className="div-block-44" onClick={this.selectMenu.bind(null, "log")}
                                style={{ paddingLeft: 10, height: 45, marginTop: 3, marginBottom: 3, cursor: "pointer", color: this.state.selectedMenu == "log" ? "white" : "black", backgroundColor: this.state.selectedMenu == "log" ? "#5f9bda" : "transparent" }}><img src="../images/log.png" style={{ width: 40, height: 40 }} />
                                <div className="text-block-17" >사용이력</div>
                            </div>
                        </div>
                    </div>
                    <div className="bulkaction-device-wrapper" style={{ height: "99%", marginTop: 10 }}>
                        <div className="div-bulk-top-wrapper" style={{ marginBottom: 4, width: 300 }}>
                            <div className="div-bulk-device-title" style={{ width: 300, paddingLeft: 26, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                                <div className="text-block-10" >{CommonData.selectedDevice.name}</div>
                            </div>
                            <div className="bulk-device-devicetype" style={{ paddingLeft: 26 }}>
                                <div>{util.enumOSType(CommonData.selectedDevice.osType)}</div>
                            </div>
                        </div>
                        <div className="div-line" style={{ width: 310, marginTop: 11, marginBottom: 32 }} />
                        <div className="div-bulk-device-row-wrapper">
                            <div className="row-3 w-row">
                                <div className="w-col w-col-9">
                                    <div className="div-bulk-device-system">
                                        <div className="form-div-bulk-device-system w-form" style={{ height: 700 }}>
                                            <form className="form-4" data-name="Email Form 6" id="email-form-6" name="email-form-6">
                                                <div className="div-bulk-device-info">
                                                    <div className="text-label">Operation System</div>
                                                </div>
                                                <div className="div-block-12">{util.enumOSType(CommonData.selectedDevice.osType)}</div>
                                                <div className="div-bulk-device-info">
                                                    <div className="text-label">OS 버전</div>
                                                </div>
                                                <div className="div-block-12">{CommonData.selectedDevice.osVersion}</div>

                                                <div className="div-bulk-device-info">
                                                    <div className="text-label">제조사</div>
                                                </div>
                                                <div className="div-block-12">{util.enumManufact(CommonData.selectedDevice.osType)}</div>

                                                <div className="div-bulk-device-info">
                                                    <div className="text-label">모델명</div>
                                                </div>
                                                <div className="div-block-12">{" "}</div>
                                                <div className="div-bulk-device-info">
                                                    <div className="text-label">프로세서(N)</div>
                                                </div>
                                                <div className="div-block-12">{CommonData.selectedDevice.processor}</div>

                                                <div className="div-bulk-device-info">
                                                    <div className="text-label">메모리</div>
                                                </div>
                                                <div className="div-block-12">{CommonData.selectedDevice.memory}</div>

                                                <div className="div-bulk-device-info">
                                                    <div className="text-label">그래픽</div>
                                                </div>
                                                <div className="div-block-12">{CommonData.selectedDevice.graphicsCard}</div>

                                                <div className="div-bulk-device-info">
                                                    <div className="text-label">사용 시작일</div>
                                                </div>
                                                <div className="div-block-12">{util.toDateStringYMDHHmmss_Short(CommonData.selectedDevice.createdTime)}</div>
                                                <div className="div-bulk-device-info">
                                                    <div className="text-label">무상보증 종료일</div>
                                                </div>
                                                <div className="div-bulk-device-info">
                                                    <div className="text-label">장치 이름</div>
                                                </div>
                                                <div className="div-block-12">{CommonData.selectedDevice.name}</div>
                                                <div className="div-bulk-device-info">
                                                    <div className="text-label">MAC Address</div>
                                                </div>
                                                <div className="div-block-12">{CommonData.selectedDevice.macAddress}</div>
                                                <div className="div-bulk-device-info">
                                                    <div className="text-label">IPv4 주소</div>
                                                </div>
                                                <div className="div-block-12">{CommonData.selectedDevice.ipAddress}</div>
                                                <div className="div-bulk-device-info">
                                                    <div className="text-label">IPv6 주소</div>
                                                </div>
                                                <div className="div-bulk-device-info">
                                                    <div className="text-label">게이트웨이</div>
                                                </div>
                                                <div className="div-block-12">{" "}</div>
                                                <div className="div-bulk-device-info">
                                                    <div className="text-label">DHCP 상태</div>
                                                </div>
                                                <div className="div-block-12">{" "}</div>

                                                <div className="div-bulk-device-info">
                                                    <div className="text-label">DHCP 서버</div>
                                                </div>
                                                <div className="div-block-12">{" "}</div>
                                                <div className="div-bulk-device-info">
                                                    <div className="text-label">DNS 서버</div>
                                                </div>
                                                <div className="div-block-12">{CommonData.selectedDevice.dnsServer}</div>

                                            </form>
                                            <div className="w-form-done" />
                                            <div className="w-form-fail" />
                                        </div>
                                    </div>

                                    <div className="div-adduser-input" style={{ display: "flex", width: 350, justifyContent: "center" }}>
                                        <a className="button-circle-gray-nomargin w-button" onClick={this.close} href="#">확인</a>
                                    </div>
                                    <div className="div-block-43" onClick={this.expand.bind(null, true)} style={{ paddingTop: 15 }}>
                                        <div className="div-block-44" style={{ width: 40, height: 40 }}><img src="../images/log.png" /></div>
                                        <div className="div-block-44" style={{ width: 40, height: 40 }}><img src="../images/hardware.png" /></div>
                                        <div className="div-block-44" style={{ width: 40, height: 40 }}><img src="../images/software.png" /></div>
                                        <div className="div-block-44" style={{ width: 40, height: 40 }}><img src="../images/external.png" /></div>
                                        <div className="div-block-44" style={{ width: 40, height: 40 }}><img src="../images/automator.png" /></div>
                                        <div className="div-block-44" style={{ width: 40, height: 40 }}><img src="../images/log.png" /></div>

                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            );
        } else {
            return (<div />);
        }

    }
}

