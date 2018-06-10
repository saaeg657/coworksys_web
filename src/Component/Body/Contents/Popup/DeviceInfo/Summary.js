import React from 'react';
import { Chart } from 'react-google-charts';
import * as properties from '../../../../../Properties.js';
import * as CommonData from '../../../../../InformationData/CommonData.js';
import * as util from '../../../../../Util/Util.js';
import * as App from '../../../../../App.js';
import * as Properties from '../../../../../Properties.js';
import * as SessionUtil from '../../../../../Util/SessionUtil.js';
export default class Summary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isShow: true,
            tab: 0,
            options: {
                hAxis: { title: 'Time', minValue: 0, maxValue: 10 },
                vAxis: { title: '%', minValue: 0, maxValue: 100 },
                legend: { textStyle: { fontSize: 9 } },
                chartArea: {
                    left: 50,
                    top: 20,
                }
            },
            rows: [
                [0, 0, 0, 0],
                [1, 0, 0, 0],
                [2, 0, 0, 0],
                [3, 0, 0, 0],
                [4, 0, 0, 0],
                [5, 0, 0, 0],
                [6, 0, 0, 0],
                [7, 0, 0, 0],
                [8, 0, 0, 0],
                [9, 0, 0, 0],
                [10, 0, 0, 0],
            ],
            rows_cpu: [
                [0, 0],
                [1, 0],
                [2, 0],
                [3, 0],
                [4, 0],
                [5, 0],
                [6, 0],
                [7, 0],
                [8, 0],
                [9, 0],
                [10, 0],
            ],
            rows_memory: [
                [0, 0],
                [1, 0],
                [2, 0],
                [3, 0],
                [4, 0],
                [5, 0],
                [6, 0],
                [7, 0],
                [8, 0],
                [9, 0],
                [10, 0],
            ],
            rows_network: [
                [0, 0, 0, 0],
                [1, 0, 0, 0],
                [2, 0, 0, 0],
                [3, 0, 0, 0],
                [4, 0, 0, 0],
                [5, 0, 0, 0],
                [6, 0, 0, 0],
                [7, 0, 0, 0],
                [8, 0, 0, 0],
                [9, 0, 0, 0],
                [10, 0, 0, 0],
            ],
            columns: [
                {
                    type: 'number',
                    label: 'Time',
                },
                {
                    type: 'number',
                    label: 'CPU',
                },
                {
                    type: 'number',
                    label: 'Network',
                },
                {
                    type: 'number',
                    label: 'Memory',
                },
            ],
            columns_CPU: [
                {
                    type: 'number',
                    label: 'Time',
                },
                {
                    type: 'number',
                    label: 'CPU',
                }
            ],
            columns_Memory: [
                {
                    type: 'number',
                    label: 'Time',
                },
                {
                    type: 'number',
                    label: 'Memory',
                }
            ],
            columns_Network: [
                {
                    type: 'number',
                    label: 'Time',
                },
                {
                    type: 'number',
                    label: 'Usage',
                },
                {
                    type: 'number',
                    label: 'Receive',
                },
                {
                    type: 'number',
                    label: 'Send',
                }
            ],
            UsageList_CPU: [],
            UsageList_Memory: [],
            UsageList_Network: [],
            UsageList_NetworkRecv: [],
            UsageList_NetworkSend: [],
            CPUUsageList: [],
            idlePercent: 100,
            CPUPercent: 0,
            NetworkPercent: 0,
            MemoryPercent: 0,
            NetworkReceive: 0,
            NetworkSend: 0
        };
        this.show = this.show.bind(this);
        this.close = this.close.bind(this);
        this.switchTab = this.switchTab.bind(this);
        this.onMessage = this.onMessage.bind(this);
        this.pdf = this.pdf.bind(this);
    }

    componentDidMount() {
        console.log("start-", CommonData.selectedDevice.deviceUUID);
        App.communicator.subscriberManager.put("Summary", this);
        App.communicator.SystemMonitoring(CommonData.selectedDevice.deviceUUID, true);
    }

    componentWillUnmount() {
        if (CommonData.selectedDevice == null) {
            this.setState({ isShow: false });
            return;
        }
        console.log("end-", CommonData.selectedDevice.id);
        App.communicator.subscriberManager.remove("Summary");
        App.communicator.SystemMonitoring(CommonData.selectedDevice.deviceUUID, false);
    }
    pdf() {
        var deviceID = CommonData.selectedDevice.id;
        var userID = SessionUtil.getCookie("userID")
        if (deviceID == undefined || userID == undefined)
            return;
        var url = Properties.ServerURL + "/coworksys/report/deviceHwSummary?deviceID=" + deviceID + "&userID=" + userID;
        console.log("pdf", url);
        window.open(url, "_blank");
    }
    onMessage(message) {
        console.log("onMessage !! ", message);
        let _rows = [];
        let _rows_cpu = [];
        let _rows_memory = [];
        let _rows_network = [];
        for (let i = 0; i < 11; i++) {
            if (message.Msg.Body.cpu[i].value == -1) break;
            let row = [i, message.Msg.Body.cpu[i].value,
                message.Msg.Body.network[i].value,
                message.Msg.Body.memory[i].value];
            _rows.push(row);
            let row_c = [i, message.Msg.Body.cpu[i].value];
            _rows_cpu.push(row_c);

            let row_m = [i, message.Msg.Body.memory[i].value];
            _rows_memory.push(row_m);

            let row_n = [i, message.Msg.Body.network[i].value,
                message.Msg.Body.networkRecv[i].value,
                message.Msg.Body.networkSend[i].value
            ];
            _rows_network.push(row_n);
        }
        var result = 0;
        for (var i = 0; i < message.Msg.Body.processUsageList.length; i++) {
            result += message.Msg.Body.processUsageList[i].cpuUsage;
        }
        this.setState({
            rows: _rows,
            rows_cpu: _rows_cpu,
            rows_memory: _rows_memory,
            rows_network: _rows_network,
            CPUUsageList: message.Msg.Body.processUsageList,
            UsageList_CPU: message.Msg.Body.cpu,
            UsageList_Memory: message.Msg.Body.memory,
            UsageList_Network: message.Msg.Body.network,
            UsageList_NetworkRecv: message.Msg.Body.networkRecv,
            UsageList_NetworkSend: message.Msg.Body.networkSend,
            idlePercent: 100 - result,
            CPUPercent: message.Msg.Body.cpu[0].value,
            NetworkPercent: message.Msg.Body.network[0].value,
            MemoryPercent: message.Msg.Body.memory[0].value
        });
    }

    switchTab(number) {
        console.log(number);
        this.setState({ tab: number });
    }
    show(visibility) {
        this.setState({ isShow: visibility });
    }

    close() {
        this.setState({ isShow: false });
    }

    render() {
        const mapToComponent = (data) => {
            if (data.length == 0)
                return;
            return data.map((item, i) => {
                return (
                    <div className="div-block-55" key={i}>
                        <div style={{ width: 200 }}>{item.Category}</div>
                        <div style={{ width: 200 }}>{item.Count}</div>
                        <div style={{ width: 300, overflow: "hidden", textOverflow: "ellipsis" }}>{item["File Types"]}</div>
                        <div style={{ width: 200 }}>{item.Size + " MB"}</div>
                    </div>
                );
            });
        };
        const mapToComponent_process = (data) => {
            if (data.length == 0)
                return;
            return data.map((item, i) => {
                return (
                    <div key={i} className="div-block-55" style={{ backgroundColor: i % 2 == 0 ? "#f7f7f7" : "white" }}>
                        <div className="div-summary-item" style={{ width: 200 }}>{item.name}</div>
                        <div className="div-summary-item" style={{ width: 200 }}>{parseFloat(item.cpuUsage).toFixed(3) + " %"}</div>
                        <div className="div-summary-item" style={{ width: 150 }}>{item.pid}</div>
                        <div className="div-summary-item" style={{ width: 150 }}>{item.userName}</div>
                    </div>
                );
            });
        };
        const mapToComponent_process_c = (data) => {
            if (data.length == 0)
                return;
            return data.map((item, i) => {
                return (
                    <div key={i} className="div-block-55" style={{ backgroundColor: i % 2 == 0 ? "#f7f7f7" : "white" }}>
                        <div className="div-summary-item" style={{ width: 200 }}>{item.name}</div>
                        <div className="div-summary-item" style={{ width: 200 }}>{parseFloat(item.cpuUsage).toFixed(3) + " %"}</div>
                        <div className="div-summary-item" style={{ width: 150 }}>{item.pid}</div>
                        <div className="div-summary-item" style={{ width: 150 }}>{item.userName}</div>
                    </div>
                );
            });
        };
        const mapToComponent_process_m = (data) => {
            if (data.length == 0)
                return;
            return data.map((item, i) => {
                return (
                    <div key={i} className="div-block-55" style={{ backgroundColor: i % 2 == 0 ? "#f7f7f7" : "white" }}>
                        <div className="div-summary-item" style={{ width: 200 }}>{item.name}</div>
                        <div className="div-summary-item" style={{ width: 200 }}>{parseFloat(item.memoryUsage).toFixed(3) + " %"}</div>
                       <div className="div-summary-item" style={{ width: 150 }}>{item.pid}</div>
                        <div className="div-summary-item" style={{ width: 150 }}>{item.userName}</div>
                    </div>
                );
            });
        };
        const mapToComponent_process_n = (data) => {
            if (data.length == 0)
                return;
            return data.map((item, i) => {
                return (
                    <div key={i} className="div-block-55" style={{ backgroundColor: i % 2 == 0 ? "#f7f7f7" : "white" }}>
                        <div className="div-summary-item" style={{ width: 200 }}>{item.name}</div>
                        <div className="div-summary-item" style={{ width: 200 }}>{item.networkReceive}</div>
                        <div className="div-summary-item" style={{ width: 200 }}>{item.networkSend}</div>
                        <div className="div-summary-item" style={{ width: 150 }}>{item.pid}</div>
                        <div className="div-summary-item" style={{ width: 150 }}>{item.userName}</div>
                    </div>
                );
            });
        };

        var FileDetails = [
            ['Element', 'Size', { role: 'style' }]
        ]
        var items = [];
        var colors = ['#b87333', 'silver', 'gold', '#e5e4e2', 'green'];
        for (var i = 0; i < this.props.fileInfo.length; i++) {
            var obj = [[this.props.fileInfo[i].Category, this.props.fileInfo[i].Size, colors[i % colors.length]]];
            items = items.concat(obj);
        }
        FileDetails = FileDetails.concat(items);

        var select = "tab-link-5 w--current w-inline-block w-tab-link";
        var unselect = "tab-link-5 w-inline-block w-tab-link";
        return (
            <div className="div-deviceinfo-popup" style={{overflow:"hidden"}}>
                <div data-duration-in={300} data-duration-out={100} className="tab-pane-2 w-hidden-medium w-tabs">
                    <div className="w-tab-menu" style={{ marginLeft: -285 }}>
                        <a data-w-tab="Tab 1" onClick={this.switchTab.bind(null, 0)} className={this.state.tab == 0 ? select : unselect} style={{ height: 33 }}>
                            <div className="text-block-22">요약</div>
                        </a>
                        <a data-w-tab="Tab 2" onClick={this.switchTab.bind(null, 1)} className={this.state.tab == 1 ? select : unselect} style={{ height: 33 }}>
                            <div className="text-block-22">CPU</div>
                        </a>
                        <a data-w-tab="Tab 3" onClick={this.switchTab.bind(null, 2)} className={this.state.tab == 2 ? select : unselect} style={{ height: 33 }}>
                            <div className="text-block-23">메모리</div>
                        </a>
                        <a data-w-tab="Tab 4" onClick={this.switchTab.bind(null, 3)} className={this.state.tab == 3 ? select : unselect} style={{ height: 33 }}>
                            <div className="text-block-23">네트워크</div>
                        </a>
                    </div>

                    <div className="w-tab-content">
                        <div data-w-tab="Tab 1" className="tab-pane-2 w-tab-pane">
                            <div className="div-block-47" style={{ display: this.state.tab == 0 ? "block" : "none", height: 450, paddingTop: 20 }}>
                                <div style={{ flexAlign: "stretch", flexDirection: "column" }}>
                                    <img src='../images/pdf_icon.png' onClick={this.pdf} style={{ width: 30, height: 30, cursor: "pointer" , marginTop : "10px" }} />
                                    <div className="text-block-20"><font color="#46ACff">Last Scan Time</font> {util.toDateStringYMDHHmmss_Kor(this.props.syncTime)}</div>
                                </div>
                                <div className="div-block-48" />
                                <div className="div-block-49" style={{width : "70%" , float : 'left'}} >
                                    {this.state.tab == 0 ? <Chart
                                        chartType="LineChart"
                                        rows={this.state.rows}
                                        columns={this.state.columns}
                                        options={this.state.options}
                                        graph_id="LineChart"
                                        width="100%"
                                        height="100%"
                                    />
                                        : ""
                                    }
                                </div>
                                <div className="div-flex-center" style={{width : '235px' , float : 'left' , height : '135px'}} >
                                    <div className="div-grey-border" style={{ paddingLeft: 20, paddingTop: 10, fontFamily: "NotosanscjkkrB" }}>
                                        <div style={{ display: "flex", height: 30 }}>
                                            <div style={{ width: 120 }} >CPU</div>
                                            <div style={{ width: 80, textAlign: "right", color: "red" }}>{this.state.CPUPercent.toFixed(2) + " %"}</div>
                                        </div>
                                        <div style={{ display: "flex", height: 30 }}>
                                            <div style={{ width: 120 }} >Network</div>
                                            <div style={{ width: 80, textAlign: "right", color: "green" }}>{this.state.NetworkPercent.toFixed(2) + " %"}</div>
                                        </div>
                                        <div style={{ display: "flex", height: 30 }}>
                                            <div style={{ width: 120 }} >Memory</div>
                                            <div style={{ width: 80, textAlign: "right", color: "green" }}>{this.state.MemoryPercent.toFixed(2) + " %"}</div>
                                        </div>
                                    </div>
                                    
                                </div>
                                <div className="div-block-54" />
                                <div className="div-block-48">
                                    <div className="device-detail-title" style={{ width: 200 }}>Process Name</div>
                                    <div className="device-detail-title" style={{ width: 200 }}>CPU(%)</div>
                                    <div className="device-detail-title" style={{ width: 150 }}>CPU Time</div>
                                    <div className="device-detail-title" style={{ width: 150 }}>PID</div>
                                    <div className="device-detail-title" style={{ width: 150 }}>User</div>
                                </div>
                                <div className="div-block-fileinfo">
                                    {mapToComponent_process(this.state.CPUUsageList)}
                                </div>
                            </div>
                            <div className="div-block-47" style={{ display: this.state.tab == 0 ? "block" : "none", height: 360, paddingTop: 20 }}>
                                <div className="div-block-57" />
                                <div className="div-block-48">
                                    <div className="device-detail-title">File details</div>
                                </div>
                                <div className="div-block-49" >
                                    <Chart
                                        chartType="ColumnChart"
                                        data={FileDetails}
                                        options={{ legend: { position: 'none' } }}
                                        graph_id="ColumnChart"
                                        width="100%"
                                        height="100%"
                                    />
                                </div>
                                <div>{"total : " + (this.props.fileInfo.length != undefined ? this.props.fileInfo.length : "0")}</div>
                                <div className="div-block-54" />
                                <div className="div-block-48">
                                    <div className="device-detail-title" style={{ width: 200 }}>Category</div>
                                    <div className="device-detail-title" style={{ width: 200 }}>Count</div>
                                    <div className="device-detail-title" style={{ width: 300 }}>File Types</div>
                                    <div className="device-detail-title" style={{ width: 200 }}>Size</div>
                                </div>
                                <div className="div-block-fileinfo">
                                    {this.props.fileInfo.length != undefined ? mapToComponent(this.props.fileInfo) : ""}
                                </div>
                            </div>

                            <div className="div-block-47" style={{ display: this.state.tab == 1 ? "block" : "none", height: 915, paddingTop: 20 }}>
                                <div style={{ display: "flex", flexAlign: "stretch", flexDirection: "column" }}>
                                    <div className="text-block-20"><font color="#46ACff">Last Scan Time</font> {util.toDateStringYMDHHmmss_Kor(this.props.syncTime)}</div>
                                </div>
                                <div className="div-block-48" />
                                <div className="div-block-49"  style={{width : "70%" , float : 'left'}} >
                                    {this.state.tab == 1 ? <Chart
                                        chartType="LineChart"
                                        rows={this.state.rows_cpu}
                                        columns={this.state.columns_CPU}
                                        options={this.state.options}
                                        graph_id="LineChart"
                                        width="100%"
                                        height="100%"
                                    />
                                        : ""
                                    }
                                </div>
                                <div className="div-flex-center"  style={{width : '235px' , float : 'left' , height : '135px'}} >
                                    <div className="div-grey-border" style={{ width: 830, height: 137, paddingLeft: 20, paddingTop: 10, fontFamily: "NotosanscjkkrB" }}>
                                        <div style={{ display: "flex", height: 30 }}>
                                            <div style={{ width: 120 }} >CPU</div>
                                            <div style={{ width: 80, textAlign: "right", color: "red" }}>{this.state.CPUPercent.toFixed(2) + " %"}</div>
                                        </div>

                                    </div>
                                </div>
                                <div className="div-block-54" />
                                <div className="div-block-48">
                                    <div className="device-detail-title" style={{ width: 200 }}>Process Name</div>
                                    <div className="device-detail-title" style={{ width: 200 }}>CPU(%)</div>
                                    <div className="device-detail-title" style={{ width: 150 }}>PID</div>
                                    <div className="device-detail-title" style={{ width: 150 }}>User</div>
                                </div>
                                <div className="div-block-fileinfo">
                                    {mapToComponent_process_c(this.state.CPUUsageList)}
                                </div>
                            </div>
                            <div className="div-block-47" style={{ display: this.state.tab == 2 ? "block" : "none", height: 915, paddingTop: 20 }}>
                                <div style={{ display: "flex", flexAlign: "stretch", flexDirection: "column" }}>

                                    <div className="text-block-20"><font color="#46ACff">Last Scan Time</font> {util.toDateStringYMDHHmmss_Kor(this.props.syncTime)}</div>
                                </div>
                                <div className="div-block-48" />
                                <div className="div-block-49" style={{width : "70%" , float : 'left'}}>
                                    {this.state.tab == 2 ? <Chart
                                        chartType="LineChart"
                                        rows={this.state.rows_memory}
                                        columns={this.state.columns_Memory}
                                        options={this.state.options}
                                        graph_id="LineChart"
                                        width="100%"
                                        height="100%"
                                    />
                                        : ""
                                    }
                                </div>
                                <div className="div-flex-center" style={{width : '235px' , float : 'left' , height : '135px'}} >
                                    <div className="div-grey-border" style={{ width: 830, height: 137, paddingLeft: 20, paddingTop: 10, fontFamily: "NotosanscjkkrB" }}>
                                        <div style={{ display: "flex", height: 30 }}>
                                            <div style={{ width: 120 }} >Memory</div>
                                            <div style={{ width: 80, textAlign: "right", color: "green" }}>{this.state.MemoryPercent.toFixed(2) + " %"}</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="div-block-54" />
                                <div className="div-block-48">
                                    <div className="device-detail-title" style={{ width: 200 }}>Process Name</div>
                                    <div className="device-detail-title" style={{ width: 200 }}>Usage(%)</div>
                                    <div className="device-detail-title" style={{ width: 150 }}>PID</div>
                                    <div className="device-detail-title" style={{ width: 150 }}>User</div>
                                </div>
                                <div className="div-block-fileinfo">
                                    {mapToComponent_process_m(this.state.CPUUsageList)}
                                </div>
                            </div>

                            <div className="div-block-47" style={{ display: this.state.tab == 3 ? "block" : "none", height: 915, paddingTop: 20 }}>
                                <div style={{ display: "flex", flexAlign: "stretch", flexDirection: "column" }}>

                                    <div className="text-block-20"><font color="#46ACff">Last Scan Time</font> {util.toDateStringYMDHHmmss_Kor(this.props.syncTime)}</div>
                                </div>
                                <div className="div-block-48" />
                                <div className="div-block-49"  style={{width : "70%" , float : 'left'}}>
                                    {this.state.tab == 3 ? <Chart
                                        chartType="LineChart"
                                        rows={this.state.rows_network}
                                        columns={this.state.columns_Network}
                                        options={this.state.options}
                                        graph_id="LineChart"
                                        width="100%"
                                        height="100%"
                                    />
                                        : ""
                                    }
                                </div>
                                <div className="div-flex-center"  style={{width : '235px' , float : 'left' , height : '135px'}}>
                                    <div className="div-grey-border" style={{ width: 830, height: 137, paddingLeft: 20, paddingTop: 10, fontFamily: "NotosanscjkkrB" }}>
                                        <div style={{ display: "flex", height: 30 }}>
                                            <div style={{ width: 120 }} >Network</div>
                                            <div style={{ width: 80, textAlign: "right", color: "green" }}>{this.state.NetworkPercent.toFixed(2) + " %"}</div>
                                        </div>
                                        <div style={{ display: "flex", height: 30 }}>
                                            <div style={{ width: 120 }} >Network Receive</div>
                                            <div style={{ width: 80, textAlign: "right", color: "green" }}>{this.state.NetworkReceive.toFixed(2) + " %"}</div>
                                        </div>
                                        <div style={{ display: "flex", height: 30 }}>
                                            <div style={{ width: 120 }} >Network Send</div>
                                            <div style={{ width: 80, textAlign: "right", color: "green" }}>{this.state.NetworkSend.toFixed(2) + " %"}</div>
                                        </div>
                                    </div>

                                </div>
                                <div className="div-block-54" />
                                <div className="div-block-48">
                                    <div className="device-detail-title" style={{ width: 200 }}>Process Name</div>
                                    <div className="device-detail-title" style={{ width: 200 }}>Receive(%)</div>
                                    <div className="device-detail-title" style={{ width: 200 }}>Send(%)</div>
                                    <div className="device-detail-title" style={{ width: 150 }}>PID</div>
                                    <div className="device-detail-title" style={{ width: 150 }}>User</div>
                                </div>
                                <div className="div-block-fileinfo">
                                    {mapToComponent_process_n(this.state.CPUUsageList)}
                                </div>
                            </div>
                        </div>


                    </div>
                </div>
            </div>
        );
    }
}

