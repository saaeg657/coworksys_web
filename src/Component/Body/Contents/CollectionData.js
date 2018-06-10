import React from 'react';
import * as CommonData from '../../../InformationData/CommonData.js';

export default class CollectionData extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isShow: false,
            ColumnItems: this.props.CheckItem
        };
        this.show = this.show.bind(this);
        this.close = this.close.bind(this);
        this.getCollectionMenu = this.getCollectionMenu.bind(this);
        this.ColumnCheck = this.ColumnCheck.bind(this);
        this.save = this.save.bind(this);
    }
    save() {
        console.log(this.props.parent);
        this.props.parent.props.ContentsArea.ColumnChange(this.state.ColumnItems);
        this.close();
    }
    ColumnCheck(e) {
        this.state.ColumnItems.setCheck(e.target.value, e.target.checked);
        /*
        //체크상태로 변경할때
        if (e.target.checked && !this.state.CheckItems.contains(e.target.value)) {
            this.setState({ CheckItems: this.state.CheckItems.remove(e.target.value)});
        }
        //체크해제할때
        else if (!e.target.checked && this.state.CheckItems.contains(e.target.value)) {
            this.setState({ CheckItems: this.state.CheckItems.put(e.target.value) });
        }
        */
    }
    show(visible) {
        this.setState({ isShow: visible });
    }

    close() {
        this.setState({ isShow: false });
    }
    getCollectionMenu(title, id) {
        return (
            <div className="form-radio-text w-radio" style={{ marginLeft: 35, marginBottom: 4 }}>
                <input type="checkbox" id={id} name="GroupType"
                    onClick={this.ColumnCheck} defaultValue={id} data-name="GroupType" className="w-radio-input"
                    defaultChecked={this.props.CheckItem.getCheck(id)} />
                <label htmlFor={id} className="w-form-label">{title}</label>
            </div>
        );
    }
    render() {
        const mapToComponent = (data) => {
            return data.map((log, i) => {
                return (
                    <div key={i} >

                    </div>
                )
            });
        };

        return (
            <div style={{display:this.state.isShow ? "flex":"none",position:"fixed"}}>
                
                <div className="category-dropdown-list"
                    style={{
                        float:"right",
                        width: 206,
                        height: 510,
                        top:100,
                        right:30
                        //top: CommonData.CurrentMenu == "report_software" || CommonData.CurrentMenu == "report_hardware" ? 500 : 130,
                    }}>
                    <div className="div-popup-title2" style={{ marginTop: 0, paddingLeft: 15, fontSize: "12pt", width: 185, fontWeight: 700, display: "flex" }}>
                        <div>수집 자료</div>
                        <div onClick={this.close} style={{ color: "black", cursor: "pointer" }}>X</div>
                    </div>
                    <div className="div-line" style={{ width: 180 }} />
                    <div style={{ width: 180, paddingTop: 10 }}>
                        {this.getCollectionMenu("장치이름", "name")}
                        {this.getCollectionMenu("운영체제", "osType")}
                        {this.getCollectionMenu("IP Adress", "ipAddress")}
                        {this.getCollectionMenu("ID", "currentUser")}
                        {this.getCollectionMenu("OS Version", "osVersion")}
                        {this.getCollectionMenu("조직", "deviceGroupName")}
                        {this.getCollectionMenu("Agent 상태", "agentStatus")}
                        {this.getCollectionMenu("Agent Version", "agentVersion")}
                        {this.getCollectionMenu("시리얼 번호", "serialNumber")}
                        {this.getCollectionMenu("MAC Address", "macAddress")}
                        {this.getCollectionMenu("프로세서", "processor")}
                        {this.getCollectionMenu("메모리", "memory")}
                        {this.getCollectionMenu("그래픽카드", "graphicsCard")}
                        {this.getCollectionMenu("네트워크 형식", "networType")}
                        {this.getCollectionMenu("유선 네트워크 어댑터", "wiredNetworkAdapter")}
                        {this.getCollectionMenu("무선 네트어크 어댑터", "wiressNetworkAdapter")}
                    </div >
                    <div className="div-line" style={{ width: 180, marginTop: 16 }} />
                    <div className="div-block-39" style={{ marginLeft: 20, marginTop: 16 }}>
                        <a href="#" onClick={this.save} style={{ backgroundColor: "#2e4ead", marginRight: 10 }} className="button-grey-rounded w-button">저장</a>
                        <a href="#" onClick={this.close} className="button-grey-rounded w-button">취소</a>
                    </div>
                </div >
            </div>
        );



    }
}

