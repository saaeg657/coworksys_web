import React from 'react';
import * as CommonData from '../../../InformationData/CommonData.js';
import BulkAction from './Popup/BulkAction.js'
import AddToGroup from './Popup/AddToGroup.js'
import AddToGroup2 from './Popup/AddToGroup2.js';
import ChangeEditable from './Popup/ChangeEditable.js'
import PopupModal from './Popup/PopupModal.js'
import AddNewItem from './Popup/AddNewItem.js'
import Automator from './Automator/Automator.js'

export default class PopupManager extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isShow: false,
            popup: null,
            popupautomator: null,
            popup3: [],
            item: null
        }
        this.setPopup = this.setPopup.bind(this);
        this.close = this.close.bind(this);
        this.evCancel = undefined;
        this.openSubPopup = this.openSubPopup.bind(this);
        this.closeSubpopup = this.closeSubpopup.bind(this);
        this.openAutomator = this.openAutomator.bind(this);
        this.openThirdPopup = this.openThirdPopup.bind(this);
    }
    openAutomator(popupItem) {
        this.setState({ isShow: true, popupautomator: popupItem });
        this.automatorPopup.showAutomator();

    }
    openThirdPopup(visible, content, info) {
        //this.thirdPopup.show(visible, content, info);
    }
    setPopup(popupItem, _evCancel) {
        console.log("setpopup", popupItem, _evCancel)
        this.setState({ isShow: true, popup: popupItem });
        this.evCancel = _evCancel;
    }

    openSubPopup(content, popup) {
        switch (popup) {
            case "adddevice_togroup":
            case "adddevicegroup":
            case "addtogroup_device":
            case "addtogroup":
            case "automator":
            case "addautomator_togroup":
            case "adduser_togroup":
            case "changepermission":
            case "add_user_group":
            case "add_agent_group":
                this.ChangeEdit.show(false, null);
                this.PopupModal.show(false, null);
                this.secondPopup.show(true, content, popup);
                break;
            case "changenote":
            case "changepassword":
            case "changesecurity":
                this.secondPopup.show(false, null, null);
                this.PopupModal.show(false, null);
                this.ChangeEdit.show(true, popup);
                break;

            case "delete_device":
            case "sendmessage":
            case "activate":
            case "delete_group":
            case "delete":
            case "delete_automator":
            case "restore":
            case "remove":
            case "delete_usergroup":
            case "delete_agent":
            case "update":
            case "setting":
            case "publish":
                if (this.ChangeEdit != undefined)
                    this.ChangeEdit.show(false, null);
                if (this.secondPopup != undefined)
                    this.secondPopup.show(false, null, null);
                if (this.PopupModal != undefined)
                    this.PopupModal.show(true, popup);
                break;
        }

    }
    closeSubpopup() {
        this.secondPopup.show(false, null, null);
    }

    close() {
        this.setState({ isShow: false, popup: null });
        this.props.Body.ContentsArea.refresh();
        if (this.automatorPopup != null) {
            this.automatorPopup.close();
        }
        if (this.PopupModal != null) {
            this.PopupModal.show(false, "");
        }
    }

    render() {
        return (
            <div>

                <PopupModal ref={ref => this.PopupModal = ref} PopupManager={this} />

                <div style={{ display: this.state.isShow && CommonData.CurrentMenu != "deleted" ? "block" : "none", position: "fixed", width: "100%", height: "92%", marginLeft: 200, paddingRight: 200, bottom: 0 }}>
                    <BulkAction ref={ref => this.BulkAction = ref} PopupManager={this} popup={this.state.popup} />
                    <AddNewItem ref={ref => this.AddNewItem = ref} PopupManager={this} popup={this.state.popup} />
                    <AddToGroup ref={ref => this.secondPopup = ref} popup={null} PopupManager={this} isBulkaction={true} />
                    <ChangeEditable ref={ref => this.ChangeEdit = ref} PopupManager={this} />

                    <Automator ref={ref => this.automatorPopup = ref} PopupManager={this} automator={this.state} />
                </div>
            </div>
        );
    }
}
