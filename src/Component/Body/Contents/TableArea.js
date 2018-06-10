import React from 'react';
import * as util from '../../../Util/Util.js';
import TableItem from './TableItem.js';
import AutomatorGroup from './Automator/AutomatorGroup.js';
import APIManager from '../../../Controller/APIManager.js';
import NewAutomator from './Automator/NewAutomator.js';
import * as CommonData from '../../../InformationData/CommonData.js';

export default class TableArea extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tables: [],
            tableContent: [],
            submenu: "device_device",
            automator: false,
            checkall: false,
            keyword: ""
        }
        this.responseAPICallback = this.responseAPICallback.bind(this);
        this.newAutomator = this.newAutomator.bind(this);
        this.checkall = this.checkall.bind(this);
        this.SetTableArea = this.SetTableArea.bind(this);
        this.Search = this.Search.bind(this);
        this.key = "";
        this.align = "";
        this.AlignTable = this.AlignTable.bind(this);
    }
    /*
    componentDidMount() {
        this.SetTableArea(this.props,"componentDidMount");
    }
*/
    componentWillReceiveProps(nextProps) {
        if (this.props != nextProps) {
            if (nextProps.ContentsArea.props.ContentsCommand.list != undefined
                || nextProps.ContentsArea.props.ContentsCommand.list.length > 0) {
                this.setState({ submenu: nextProps.ContentsArea.props.ContentsCommand.list[0].btnsubmenu });
            }
            this.SetTableArea(nextProps, "componentWillReceiveProps");
        }
    }
    Search(key) {
        if (this.state.keyword != key) {
            this.setState({ keyword: key });
            this.key = key;
            this.SetTableArea(this.props, "search");
        }
    }
    AlignTable(key) {
        console.log(key,this.align)
        if (this.align != key) {
            //this.setState({ alignKey: key });
            this.align = key;
            this.SetTableArea(this.props, "search");
        }else{
        //this.setState({ alignKey: "" });
            this.align = "";
            this.SetTableArea(this.props, "");
        }
    }
    checkall() {
        if (this.state.submenu == "automator") {
            if (this.state.checkall) {
                CommonData.clearData(CommonData.bulkactionList);
            }
            else {
                for (var index_group = 1; index_group < this.state.tableContent.length; index_group++) {
                    for (var index_automator = 0; index_automator < this.state.tableContent[index_group].automatorList.length; index_automator++) {

                        CommonData.bulkactionList = CommonData.bulkactionList.concat(this.state.tableContent[index_group].automatorList[index_automator]);
                    }
                }
            }
            this.props.ContentsArea.tableEvent_bulkaction();
        }
        this.setState({ checkall: this.state.checkall ? false : true })
    }
    CheckAllToFalse() {
        this.setState({ checkall: false })
        if (CommonData.bulkactionList.length > 0) {
            CommonData.clearData(CommonData.bulkactionList);
            CommonData.bulkactionList = [];
        }
    }
    newAutomator(visible) {
        this.setState({ automator: visible });
    }
    responseAPICallback(response, key) {
        if (CommonData.CurrentMenu == "deleted" && key == "automatorGroupList") {
            var list = [];
            var newlist = response.data[key];
            for (var i = 0; i < newlist.length; i++) {
                for (var j = 0; j < newlist[i].automatorList.length; j++) {
                    console.log(newlist[i].automatorList[j])
                    list = list.concat(newlist[i].automatorList[j])
                }
            }
            console.log("automatorGroupList", newlist, list)
            this.setState({
                tableContent: list
            });
        }
        else {
            this.setState({
                tableContent: response.data[key]
            });
        }
    }
    SetTableArea(props, sender) {
        let objList = [];
        if (props.ContentsTable == null)
            return;

        for (var i = 0; i < props.ContentsTable.list.length; i++) {
            let vWidth = util.pxtopercent(props.ContentsTable.list[i].tablewidth);
            switch (props.ContentsTable.list[i].tabletype) {
                case "title":
                    if (props.ContentsTable.list[i].visibility) {
                        let obj =
                            <div key={i} className="div-table-fullname"
                                style={{ maxWidth:vWidth,width: vWidth,
                                paddingLeft: i == 0 && CommonData.CurrentMenu == "device_device" ? 15 : 0 }}>
                                {props.ContentsTable.list[i].tablelabel}
                                <a className="button-table-title"
                                    style={{
                                        display: CommonData.CurrentMenu != "automator" ? "block" : "none", color: "#3857cf",
                                        marginRight:10                                    
                                    }} href="#"
                                    onClick={this.AlignTable.bind(null, props.ContentsTable.list[i].tablekey[0])}>
                                    <img src={this.align == props.ContentsTable.list[i].tablekey[0] ? '../images/btn_align_down.png' : '../images/btn_align_up.png'} width={9} height={9} /></a>
                            </div>
                        objList = objList.concat(obj);
                        break;
                    }
            }
        }

        var body = props.APICommand.get("apibody");
        var command = props.APICommand.get("apicommand");
        var listkey = props.APICommand.get("apilistkey");
        var sort = this.align;
        console.log("align",sort,CommonData.CurrentMenu)
        switch (CommonData.CurrentMenu) {
            case "device_device":
                var type = "eAll";
                var id = -1;
                id = this.props.ContentsArea.props.Body.props.ViewManager.GetIDfromkey(props.CommandAction)
                body = {
                    "startIndex": 0,
                    "count": 300,
                    "deviceGroupID": id,
                    "deviceGroupType": "eAll",
                    "alive": "eAlive",
                    "sort": sort,
                    "search": this.key
                }
                break;
            case "device_group":
                var type = "eAll";
                switch (props.CommandAction) {
                    case "모든 장비":
                        type = "eAll";
                        break;
                    case "관리 장비":
                        type = "eManagedGroup";
                        break;
                    case "비관리 장비":
                        type = "eUnmanagedGroup";
                        break;
                    case "자산 장비":
                        type = "eAssetGroup";
                        break;
                }
                body = {
                    "startIndex": 0,
                    "count": 300,
                    "deviceGroupType": type,
                    "alive": "eAlive",
                    "sort": sort,
                    "search": this.key
                }
                break;
            case "automator":
                var type = "eAll";
                switch (props.CommandAction) {
                    case "모든 OS":
                        type = "eAll";
                        break;
                    case "미분류":
                        type = "eNoMatter";
                        break;
                    case "Windows 전용":
                        type = "eWindows";
                        break;
                    case "MAC 전용":
                        type = "eOSX";
                        break;
                }
                body = {
                    "osType": type,
                    "isGroup": true,
                    "alive": "eAlive",
                    "search": this.key
                }
                break;
            case "deleted":
                switch (props.CommandAction) {
                    case "":
                    case "사용자":
                        command = "/api/user/get/list";
                        body = {
                            "startIndex": 0,
                            "count": 300,
                            "status": "eActive",
                            "permission": -1,
                            "alive": "eRemove",
                            "sort": sort,
                            "search": this.key
                        }
                        listkey = "userList";
                        break;
                    case "사용자 조직":
                        command = "/api/userGroup/get/list";
                        body = {
                            "startIndex": 0,
                            "count": 300,
                            "permission": -1,
                            "alive": "eRemove",
                            "sort": sort,
                            "search": this.key
                        }
                        listkey = "userGroupList";
                        break;
                    case "장치 조직":
                        command = "/api/deviceGroup/get/list";
                        body = {
                            "startIndex": 0,
                            "count": 300,
                            "deviceGroupType": "eAll",
                            "alive": "eRemove",
                            "sort": sort,
                            "search": this.key
                        }
                        listkey = "deviceGroupList";
                        break;
                    case "에이전트":
                        command = "/api/agentGroup/get/list";
                        body = {
                            "status": "eAllAgent",
                            "alive": "eRemove"
                        }
                        listkey = "agentGroupList";
                        break;
                    case "오토메이터":
                        command = "/api/automator/get/list";
                        body = {
                            "osType": "eAll",
                            "isGroup": true,
                            "alive": "eRemove",
                        }
                        listkey = "automatorGroupList";
                        break;
                }
                break;
            case "setting_group":
            case "setting_user":
                var category = -1;
                switch (props.CommandAction) {
                    case '모든 사용자':
                        category = -1;
                        break;
                    case '전원 관리자':
                        category = 1;
                        break;
                    case '원격 화면 공유 관리자':
                        category = 2;
                        break;
                    case '원격제어 관리자':
                        category = 4;
                        break;
                    case '오토메이터':
                        category = 8;
                        break;
                    case '고급 오토메이터':
                        category = 16;
                        break;
                    case '자산 정보 관리자':
                        category = 32;
                        break;
                    case '비밀번호 관리자':
                        category = 64;
                        break;
                }
                if (props.CommandAction == "setting_user") {
                    body = {
                        "startIndex": 0,
                        "count": 300,
                        "status": "eActive",
                        "permission": category,
                        "alive": "eAlive",
                        "sort": sort,
                        "search": this.key
                    }
                }
                else {
                    body = {
                        "startIndex": 0,
                        "count": 300,
                        "permission": category,
                        "alive": "eAlive",
                        "sort": sort,
                        "search": this.key
                    }
                }
                break;
            case "setting_agent":
                let type = "eAllAgent";
                switch (props.CommandAction) {
                    case '모든 에이전트':
                        type = "eAllAgent";
                        break;
                    case '배포 가능':
                        type = "eReadyToPublish";
                        break;
                    case '배포 중지':
                        type = "eStopPublish";
                        break;
                    case '배포 중':
                        type = "ePublishing";
                        break;
                }
                body = {
                    "status": type,
                    "alive": "eAlive"
                }
                break;

        }
        APIManager.requestAPI(
            props.APICommand.get("apikey"),
            command,
            props.APICommand.get("apiheader"),
            body,
            this.responseAPICallback,
            listkey);

        this.setState({ tables: objList })
    }

    render() {
        const mapToComponent = (data, check) => {
            return data.map((item, i) => {
                if (CommonData.CurrentMenu == "automator") {
                    return (
                        <AutomatorGroup key={i} index={i} tableinfo={this.props.ContentsTable} item={item} group={data} ContentsArea={this.props.ContentsArea} SubMenu={CommonData.CurrentMenu} checkall={check} />
                    );
                }
                else {
                    return (
                        <TableItem key={i} index={i} tableinfo={this.props.ContentsTable} item={item} ContentsArea={this.props.ContentsArea} SubMenu={CommonData.CurrentMenu} checkall={check} CommandAction={this.props.CommandAction} />
                    );
                }
            })
        };
        return (
            <div className="div-contents-table" style={{ marginTop: "20px", fontSize: "11pt", paddingRight: this.props.ContentsArea.props.Body.state.isShowMenu ? 250 : 70 }} >
                <div className="div-table-title" style={{ backgroundColor: "#ffffff", paddingRight:20 }}>
                    {
                        CommonData.CurrentMenu != "report_hardware" && CommonData.CurrentMenu != "report_software" ?
                            <img src={this.state.checkall ? '../images/chkbox_title_on.png' : '../images/chkbox_title_off.png'} onClick={this.checkall} style={{ width: 14, height: 14, marginLeft: 6, marginRight: 10 }} width={14} height={14} />
                            : <div style={{ width: 30 }} />
                    }
                    {this.state.tables}
                </div>
                <div className="div-table-scroll" style={{ overflowX: "hidden", fontSize: "9pt" }}>
                    {mapToComponent(this.state.tableContent, this.state.checkall)}
                </div>
            </div>
        );
    }
}