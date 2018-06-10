import React from 'react';
import * as util from '../../../Util/Util.js';
import * as ModelManager from '../../../Controller/ModelManager.js';
import * as APIManager from '../../../Controller/APIManager.js';
import * as CommonData from '../../../InformationData/CommonData.js';
import * as properties from '../../../Properties.js';


export default class TableItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ischecked: false
        }
        this.checkBoxCheckEvent = this.checkBoxCheckEvent.bind(this);
        this.buttonActionEvent = this.buttonActionEvent.bind(this);

        this.callVNC = this.callVNC.bind(this);
        this.startVNC = this.startVNC.bind(this);
        this.vncUrl = '';
        this.responseAPICallback = this.responseAPICallback.bind(this);
        util.pxtopercent = util.pxtopercent.bind(this);
    }
    responseAPICallback(response, key) {
        if (key == "vncstart") {
            this.vncUrl = properties.ServerURL + "/coworksys" + response.data.vncUrl;
            setTimeout(this.startVNC, 1000 * 3);
        }
    }
    callVNC() {
        if (this.props.item.agentStatus != "eConnected") {
            alert("이 장치는 연결되지 않았습니다.");
            return;
        }

        var api = ModelManager.default.GetAPICommand("vnc");
        APIManager.default.requestAPI(
            api.get("apikey"),
            api.get("apicommand"),
            api.get("apiheader"),
            {
                "deviceIDList": [this.props.item.id],
                "status": "start"
            },
            this.responseAPICallback,
            "vncstart");
        /*
        if (this.props.device.agentStatus != "eConnected") {
            this.showError("이 디바이스는 연결되지 않았습니다.");
            return;
        }

        var header = {
            headers: {
                'Content-Type': "application/json; charset=utf-8",
            }
        };

        Axios.post(properties.ServerURL + '/coworksys/api/vnc/control',
            {
                "deviceIDList": [this.props.device.id],
                "status": "start"
            }, header)
            .then(
            Response => {
                console.log(TAG, Response);
                this.vncUrl = properties.ServerURL + "/coworksys" + Response.data.vncUrl;

                this.showMSG(Response, "원격제어 연결");

                setTimeout(this.startVNC, 1000 * 3);
            }
            );
            */
    }
    startVNC() {
        console.log("mmmmm", this.vncUrl);
        alert('vnc 창을 띄웁니다.');
        window.open(this.vncUrl, "_blank", true);

    }
    componentWillReceiveProps(nextProps) {
        if (this.props != nextProps) {
            if (nextProps.checkall != null && this.props.checkall != nextProps.checkall) {
                this.checkBoxCheckEvent(nextProps.checkall);
            }
        }
        //메뉴이동시 체크박스 모두 OFF 로 변경
        if (CommonData.bulkactionList.length == 0) {
            this.setState({ ischecked: false });
            CommonData.removeData(CommonData.bulkactionList, this.props.item);
            return;
        }
    }
    checkBoxCheckEvent(checkall) {
        if (checkall != null) {
            //이미 선택된 체크박스 예외처리
            if (checkall == true && this.state.ischecked == true) {
                return;
            }
            else if (checkall == true && this.state.ischecked == false) {
                this.setState({ ischecked: true });
                CommonData.bulkactionList = CommonData.bulkactionList.concat(this.props.item);
            }
            else if (checkall == false && this.state.ischecked == true) {
                this.setState({ ischecked: false });
                CommonData.removeData(CommonData.bulkactionList, this.props.item);
            }
            else {
                return;
            }
        } else {
            if (this.state.ischecked == true) {
                this.setState({ ischecked: false });
                CommonData.removeData(CommonData.bulkactionList, this.props.item);
            }
            else {
                this.setState({ ischecked: true });
                CommonData.bulkactionList = CommonData.bulkactionList.concat(this.props.item);
            }
        }

        this.props.ContentsArea.tableEvent_bulkaction();
        CommonData.selectedDevice = null;
    }
    buttonActionEvent(action) {
        this.props.ContentsArea.refresh();
        CommonData.selectedDevice = this.props.item;
        this.props.ContentsArea.tableEvent_buttonEvent(action);
    }

    render() {
        let result = [];
        if (CommonData.CurrentMenu != "deleted" || this.props.CommandAction == "") {
            for (var tableIndex = 0; tableIndex < this.props.tableinfo.list.length; tableIndex++) {
                if (!this.props.tableinfo.list[tableIndex].visibility)
                    continue;

                ///1. 여러개의 키를 조합하는 경우
                var value = "";
                for (var i = 0; i < this.props.tableinfo.list[tableIndex].tablekey.length; i++) {
                    value += this.props.item[this.props.tableinfo.list[tableIndex].tablekey[i]] + " ";
                }
                ///2. 여백 제거
                value = value.trim();

                ///3. 파서가 존재하는경우
                if (this.props.tableinfo.list[tableIndex].valueparser != null) {

                    var afterparse = this.props.tableinfo.list[tableIndex].valueparser(value);
                    value = afterparse;

                }

                ///4. 정보가 없는경우
                if (value == "null")
                    value = "정보없음";

                ///5. 버튼 액션이 있는경우
                var obj = {};
                var tablewidth = this.props.tableinfo.list[tableIndex].tablewidth;

                if (this.props.tableinfo.list[tableIndex].btncallback != null) {
                    obj = <div
                        key={tableIndex}
                        className="div-table-username"
                        style={{ display:"flex",
                        maxWidth:util.pxtopercent(tablewidth),
                        width: util.pxtopercent(tablewidth), cursor: "pointer"}}>
                        <a className="btn_blue_circle2 w-button"
                            style={{
                                display: this.props.SubMenu == "device_device" ? "block" : "none",
                                marginRight: 5,
                                backgroundColor: this.props.item.agentStatus == "eConnected" ? "#12ae1c" : "grey",
                                minWidth: 14, minHeight: 14,maxWidth: 14, maxHeight: 14
                            }}
                            onClick={this.callVNC}></a>
                        <div onClick={this.buttonActionEvent.bind(null, this.props.tableinfo.list[tableIndex].btncallback)}>
                            {value}
                            <div />
                        </div>
                    </div>

                    /**
                     if (props.ContentsTable.list[i].visibility) {
                        let obj =
                            <div key={i} className="div-table-fullname"
                                style={{ maxWidth:vWidth,width: vWidth }}>
                                {props.ContentsTable.list[i].tablelabel}
                                <a className="button-table-title"
                                    style={{
                                        display: CommonData.CurrentMenu != "automator" ? "block" : "none", color: "#3857cf",
                                        paddingLeft: i == 0 && CommonData.CurrentMenu == "device_device" ? 14 : 0,
                                        marginRight:10
                                    }} href="#"
                                    onClick={this.AlignTable.bind(null, props.ContentsTable.list[i].tablekey)}>
                                    <img src={this.align == props.ContentsTable.list[i].tablekey ? '../images/btn_align_down.png' : '../images/btn_align_up.png'} width={9} height={9} /></a>
                            </div>
                        objList = objList.concat(obj);
                        break;
                     */
                }
                else {
                    obj = <div key={tableIndex} className="div-table-username" style={{ width: util.pxtopercent(tablewidth) }}>
                        {value}
                    </div>
                }
                result = result.concat(obj);
            }
        } else {
            switch (this.props.CommandAction) {
                case "사용자":
                    for (var tableIndex = 0; tableIndex < this.props.tableinfo.list.length; tableIndex++) {
                        ///1. 여러개의 키를 조합하는 경우
                        var value = "";
                        for (var i = 0; i < this.props.tableinfo.list[tableIndex].tablekey.length; i++) {
                            value += this.props.item[this.props.tableinfo.list[tableIndex].tablekey[i]] + " ";
                        }
                        ///2. 여백 제거
                        value = value.trim();

                        ///3. 파서가 존재하는경우
                        if (this.props.tableinfo.list[tableIndex].valueparser != null) {
                            var afterparse = this.props.tableinfo.list[tableIndex].valueparser(value);
                            value = afterparse;
                        }

                        ///4. 정보가 없는경우
                        if (value == "null")
                            value = "정보없음";

                        ///5. 버튼 액션이 있는경우
                        var obj = {};
                        var tablewidth = this.props.tableinfo.list[tableIndex].tablewidth;

                        //if (tableIndex == 0 && this.props.SubMenu == "device_device")
                        //tablewidth -= 20;
                        if (this.props.tableinfo.list[tableIndex].btncallback != null) {
                            obj = <div
                                key={tableIndex}
                                className="div-table-username"
                                onClick={this.buttonActionEvent.bind(null, this.props.tableinfo.list[tableIndex].btncallback)}
                                style={{ width: util.pxtopercent(tablewidth), cursor: "pointer" }}>
                                {value}
                            </div>
                        }
                        else {
                            obj = <div key={tableIndex} className="div-table-username" style={{ width: util.pxtopercent(tablewidth) }}>
                                {value}
                            </div>
                        }
                        result = result.concat(obj);
                    }
                    break;
                case "장치 조직":
                    var tablewidth = this.props.tableinfo.list[0].tablewidth;
                    var obj = <div key={tableIndex} className="div-table-username" style={{ width: util.pxtopercent(this.props.tableinfo.list[0].tablewidth) }}>
                        {this.props.item.name}
                    </div>
                    result = result.concat(obj);

                    obj = <div key={tableIndex} className="div-table-username" style={{ width: util.pxtopercent(this.props.tableinfo.list[1].tablewidth) }}>
                        {util.toDateStringYMD_Kor(this.props.item.aliveModfiedTime)}
                    </div>
                    result = result.concat(obj);
                    obj = <div key={tableIndex} className="div-table-username" style={{ width: util.pxtopercent(this.props.tableinfo.list[2].tablewidth) }}>
                        {util.enumDeviceType(this.props.item.deviceGroupType)}
                    </div>
                    result = result.concat(obj);
                    break;
                case "사용자 조직":
                    var tablewidth = this.props.tableinfo.list[0].tablewidth;
                    var obj = <div key={tableIndex} className="div-table-username" style={{ width: util.pxtopercent(this.props.tableinfo.list[0].tablewidth) }}>
                        {this.props.item.name}
                    </div>
                    result = result.concat(obj);

                    obj = <div key={tableIndex} className="div-table-username" style={{ width: util.pxtopercent(this.props.tableinfo.list[1].tablewidth) }}>
                        {util.toDateStringYMD_Kor(this.props.item.aliveModifiedTime)}
                    </div>
                    result = result.concat(obj);
                    obj = <div key={tableIndex} className="div-table-username" style={{ width: util.pxtopercent(this.props.tableinfo.list[2].tablewidth) }}>
                        {util.enumNetworkType(this.props.item.networkType)}
                    </div>
                    result = result.concat(obj);
                    break;
                case "에이전트":
                    console.log("DDDDD", this.props.item);
                    var tablewidth = this.props.tableinfo.list[0].tablewidth;
                    var obj = <div key={tableIndex} className="div-table-username" style={{ width: util.pxtopercent(this.props.tableinfo.list[0].tablewidth) }}>
                        {this.props.item.name}
                    </div>
                    result = result.concat(obj);

                    obj = <div key={tableIndex} className="div-table-username" style={{ width: util.pxtopercent(this.props.tableinfo.list[1].tablewidth) }}>
                        {util.toDateStringYMD_Kor(this.props.item.modifiedTime)}
                    </div>
                    result = result.concat(obj);
                    obj = <div key={tableIndex} className="div-table-username" style={{ width: util.pxtopercent(this.props.tableinfo.list[2].tablewidth) }}>
                        {util.enumDeviceType(this.props.item.deviceGroupType)}
                    </div>
                    result = result.concat(obj);
                    break;
                case "오토메이터":
                    var tablewidth = this.props.tableinfo.list[0].tablewidth;
                    var obj = <div key={tableIndex} className="div-table-username" style={{ width: util.pxtopercent(this.props.tableinfo.list[0].tablewidth) }}>
                        {this.props.item.name}
                    </div>
                    result = result.concat(obj);

                    obj = <div key={tableIndex} className="div-table-username" style={{ width: util.pxtopercent(this.props.tableinfo.list[1].tablewidth) }}>
                        {util.toDateStringYMD_Kor(this.props.item.modifiedTime)}
                    </div>
                    result = result.concat(obj);
                    obj = <div key={tableIndex} className="div-table-username" style={{ width: util.pxtopercent(this.props.tableinfo.list[2].tablewidth) }}>
                        {util.enumOSType(this.props.item.osType)}
                    </div>
                    result = result.concat(obj);
                    break;
            }


        }
        return (
            <div className="div-table-item-group" style={{ backgroundColor: this.props.index % 2 == 1 ? "#ffffff" : "#f6f6f8" }}>
                <div className="div-table-checkbox">
                    <div className="form-wrapper-6 w-form">
                        {
                            CommonData.CurrentMenu != "report_hardware" && CommonData.CurrentMenu != "report_software" ?
                                <form data-name="Email Form 2" id="email-form-2" name="email-form-2">

                                    <div className="checkbox-field-2 w-checkbox">
                                        <input type="checkbox" id="node-3"
                                            style={{ display: "none" }}
                                            className="checkbox-item w-checkbox-input"
                                            checked={this.state.ischecked} onChange={this.checkBoxCheckEvent.bind(null, null)} />
                                        <img src={this.state.ischecked ? '../images/chkbox2_on.png' : '../images/chkbox2_off.png'} onClick={this.checkBoxCheckEvent.bind(null, null)} />
                                        <label className="field-label w-form-label" htmlFor="node-3" />
                                    </div>
                                </form>
                                : ""
                        }
                        <div className="w-form-done" />
                        <div className="w-form-fail" />
                    </div>
                </div>

                {result}
            </div>);

    }
}