import React from 'react';
import MainMenu from './Menu/MainMenu.js'
import ContentsArea from './Contents/ContentsArea.js'
import TopArea from '../../Component/Top/TopArea.js'

import DeviceInfo from './Contents/Popup/DeviceInfo.js';
import PopupManager from './Contents/PopupManager.js';
/**
 * Body
 * 메뉴 + 컨텐츠를 표시
 * 
 * props 목록
 * ViewManager
 * menu
 * submenu
 * ActionManager
 * ContentsCommand
 * ContentsTable
 */

export default class Body extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowMenu: true
        }
        this.hideMenu = this.hideMenu.bind(this);
        this.CloseAllPopup = this.CloseAllPopup.bind(this);
        this.ResetSearchKeyword = this.ResetSearchKeyword.bind(this);
        this.OpenPopup = this.OpenPopup.bind(this);
    }

    ResetSearchKeyword() {
        this.ContentsArea.KeywordSearch("");
    }
    CloseAllPopup() {
        this.ContentsArea.CloseAllPopup();
        this.PopupManager.close();
    }
    hideMenu() {
        this.setState({ isShowMenu: this.state.isShowMenu ? false : true });
    }
    OpenPopup(popup, visible) {
        switch (popup) {
            case "deviceinfo":
                this.DeviceInfo.show(visible);
                break;
        }

    }
    render() {
        if (this.props.ContentsCommand == null || this.props.ContentsTable == null)
            return (
                <div className="div-main">
                    <div className="div-main-left">
                        <MainMenu ViewManager={this.props.ViewManager} currentmenu={this.props.menu} submenu={this.props.submenu} />
                    </div>
                </div>
            );
        else
            return (
                <div className="div-main">
                    <div className="div-main-left" style={{ display: this.state.isShowMenu ? "block" : "none" }}>
                        <MainMenu ref={ref => this.MainMenu = ref} ViewManager={this.props.ViewManager} currentmenu={this.props.menu} submenu={this.props.submenu} Body={this} />
                    </div>
                    <div className="div-leftmenu-summary" style={{ left: 0, zIndex: 9999, display: this.state.isShowMenu ? "none" : "block" }} >
                        <img className="image-4" onClick={this.hideMenu} style={{ cursor: "pointer", height: 60, width: 29 }} src="images/요약버튼_invert.png" />
                    </div>
                    <div className="div-main-right" >
                        <div style={{ position: "fixed", width: "100%", height: "100%" }}>
                            <TopArea Body={this} username={this.props.username } Body={this}/>

                            <ContentsArea ref={ref => this.ContentsArea = ref}
                                Body={this}
                                ViewManager={this.props.ViewManager}
                                PopupInfo={this.props.ViewManager.state.popupInfo}
                                ActionManager={this.props.ActionManager}
                                APICommand={this.props.APICommand}
                                ContentsCommand={this.props.ContentsCommand}
                                ContentsTable={this.props.ContentsTable} />
                        </div>
                        <PopupManager
                            ref={ref => this.PopupManager = ref}
                            Body={this} />
                        <DeviceInfo
                            ref={ref => this.DeviceInfo = ref} />

                    </div>
                </div>
            );
    }
}