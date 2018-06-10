import React from 'react';
import * as CommonData from '../../../InformationData/CommonData.js';
import App from '../../../App.js';

export default class MainMenu extends React.Component {
    constructor(props) {
        super(props);
        this.clickEvent = this.clickEvent.bind(this);
        this.hideMenu = this.hideMenu.bind(this);
    }

    clickEvent(menu, submenu) {
        if (submenu == "management")
            return;
            console.log(menu,submenu)
        this.props.ViewManager.MovePage(menu, submenu);
        CommonData.CurrentMenu = submenu;
        if (CommonData.bulkactionList.length > 0) {
            CommonData.clearData(CommonData.bulkactionList);
            CommonData.bulkactionList = [];
        }
        CommonData.selectedAutomator = null;
        CommonData.selectedDevice = null;
        if (this.props.Body != undefined)
            this.props.Body.CloseAllPopup();
    }

    hideMenu() {
        this.props.Body.hideMenu();
    }
    render() {
        const getMenu = (menu, submenu, title, img) => {
            return <div style={{ marginTop: 26, marginBottom: 16, height: menu == "deleted" ? 32 : 27, width: 184 }}>
                <div className="div-leftmenu-selected" style={{ paddingTop: 1 }}>
                    <div className="div-leftmenu-icon"><img src={"images/" + img + ".png"} />
                    </div>
                    <div >
                        <button className="button-basic" onClick={this.clickEvent.bind(null, menu, submenu)}>
                            <div className="text-leftmenu-selected" style={{ fontFamily: "NotosanscjkkrT", fontSize: 13, paddingLeft: 2, paddingTop: 1, color: "white", backgroundColor: "transparent", letterSpacing: -0.6 }}>{title}</div>
                        </button>
                    </div>
                </div>
            </div>
        };

        const getSubMenu = (menu, submenu, title) => {
            if (menu == this.props.currentmenu) {
                return <div style={{ fontFamily: "Notosanscjkkr", width: 184, height: 28.5, color: "white", marginBottom: 1, backgroundColor: submenu == this.props.submenu ? "#3857cf" : "transparent" }}>
                    <button className="button-basic" onClick={this.clickEvent.bind(null, menu, submenu)}>
                        <div style={{ fontFamily: "Notosanscjkkr", marginLeft: 72, fontSize: 13, color: "white", paddingTop: 2 }}>
                            <div style={{ letterSpacing: -1.0 }}>
                                <img src={'../images/white_dot.png'} style={{ marginTop: -3, marginRight: 8, marginLeft: 1, width: 5, height: 5 }} />{"   " + title}</div>
                        </div>
                    </button>
                </div>
            }
            else {
                return "";
            }
        };
        const getSpacer = (menu) => {
            if (menu == this.props.currentmenu) {
                return <div style={{ marginBottom: -17 }}>
                </div>
            }
            else {
                return "";
            }
        };

        let html = <div className="div-main-left">
            <a href="/">
                <div className="div-top-logo">
                    <img src="../images/logo.png" className="image-2" />
                </div>
            </a>
            <div className="div-leftmenu-wrapper" >
                {/*getMenu("homeNdashboard", "", "홈 / 대쉬보드", "menu_home")*/}
                {getMenu("device", "device_device", "홈 / 대쉬보드", "menu_device")}
                {getMenu("device", "device_device", "장치 관리", "menu_device")}
                {getSubMenu("device", "device_device", "장치")}
                {getSubMenu("device", "device_group", "조직")}
                {getSpacer("device")}

                {getMenu("automator", "automator", "오토메이터", "menu_automator")}
                {getMenu("management", "management", "사용 환경 관리", "menu_management")}
                <div style={{ marginTop: 30 }} />
                {getMenu("report", "report_software", "보고서", "menu_report")}
                {getSubMenu("report", "report_software", "소프트웨어")}
                {getSubMenu("report", "report_hardware", "하드웨어")}
                {getSpacer("report")}

                <div style={{ marginTop: 32 }} />
                {getMenu("deleted", "deleted", "삭제된 항목", "menu_deleted")}
                <div style={{ marginTop: 31 }} />
                {getMenu("setting", "setting_user", "설정", "menu_setting")}
                {/*getSubMenu("setting", "setting_general", "일반")*/}
                {getSubMenu("setting", "setting_user", "사용자")}
                {getSubMenu("setting", "setting_group", "조직")}
                {getSubMenu("setting", "setting_agent", "에이전트")}

                <div className="div-leftmenu-summary">
                    <img className="image-4" onClick={this.hideMenu} style={{ cursor: "pointer" }} src="images/요약버튼.png" />
                </div>

            </div>
        </div>

        return (html);

    }
}