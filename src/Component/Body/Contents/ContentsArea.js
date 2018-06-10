import React from 'react';
import CommandArea from './CommandArea.js'
import TableArea from './TableArea.js'
import PopupManager from './PopupManager.js'
import * as CommonData from '../../../InformationData/CommonData.js'
import * as util from '../../../Util/Util.js';
import NewAutomator from './Automator/NewAutomator.js';
import DeviceInfo from './Popup/DeviceInfo.js'
import ModelManager from '../../../Controller/ModelManager.js';

export default class ContentsArea extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            popupinfo: ModelManager.GetPopupInfo("bulkaction"),
            refresh: false,
            automator: false,
            commandAction: "",
            ColumnItems: null,
            TableInfo: ModelManager.GetTableInfo(CommonData.CurrentMenu)
        }

        this.tableEvent_bulkaction = this.tableEvent_bulkaction.bind(this);
        this.tableEvent_buttonEvent = this.tableEvent_buttonEvent.bind(this);
        this.refresh = this.refresh.bind(this);
        this.refresh_automator = this.refresh_automator.bind(this);
        this.CloseAllPopup = this.CloseAllPopup.bind(this);
        this.commandAtion = this.commandAction.bind(this);
        this.ColumnChange = this.ColumnChange.bind(this);
        this.KeywordSearch = this.KeywordSearch.bind(this);
    }

    componentDidMount() {
        var table = util.GetReportList();
        table.put("name", true);
        table.put("osType", false);
        table.put("ipAddress", true);
        table.put("currentUser", true);
        table.put("osVersion", true);
        table.put("deviceGroupName", true);
        table.put("agentStatus", true);
        table.put("agentVersion", true);
        table.put("serialNumber", false);
        table.put("macAddress", false);
        table.put("processor", false);
        table.put("memory", false);
        table.put("graphicsCard", false);
        table.put("networType", false);
        table.put("wiredNetworkAdapter", false);
        table.put("wiressNetworkAdapter", false);
        this.setState({ ColumnItems: table });
    }
    commandAction(value) {
        this.setState({ commandAction: value })
    }
    ColumnChange(newColumn) {
        console.log(newColumn, this.props.ContentsTable)

        for (var i = 0; i < newColumn.list.length; i++) {
            this.props.ContentsTable.setVisibility(newColumn.list[i].ColumnKey, newColumn.list[i].ColumnChecked)
        }
        this.setState({ ColumnItems: newColumn })
    }
    KeywordSearch(keyword) {
        if (this.TableArea != null)
            this.TableArea.Search(keyword);
    }
    CloseAllPopup() {
        if (this.PopupManager != null)
            this.PopupManager.close();
        if (this.TableArea != null)
            this.TableArea.CheckAllToFalse();
        if (this.CommandArea != null) {
            this.CommandArea.showdropdown(false);
            this.setState({ commandAction: "" })
            this.CommandArea.clearOption();
            this.CommandArea.showCollectionData(false);
        }
        CommonData.clearData(CommonData.bulkactionList);
        CommonData.selectedDevice = null;
    }
    refresh_automator() {
        this.refresh();
        setTimeout(this.props.Body.props.ViewManager.MovePage.bind(null,"automator", "automator"),100);
    }
    refresh() {
        this.setState({ refresh: this.state.refresh ? false : true, automator: false });
        if (this.props.Body.DeviceInfo != null)
            this.props.Body.DeviceInfo.close();
        if (this.TableArea != null)
            this.TableArea.CheckAllToFalse();
        //this.TableArea.show(true, null, null);
    }
    tableEvent_bulkaction() {
        this.props.Body.PopupManager.setPopup(
            ModelManager.GetPopupInfo("bulkaction", this.props.ViewManager.state.submenu),
            this.props.ViewManager.ClearCheckBox);
        this.props.Body.DeviceInfo.close();
        if (CommonData.bulkactionList.length == 0) {
            this.props.Body.PopupManager.close();
            this.props.Body.PopupManager.closeSubpopup();

        }
    }
    tableEvent_buttonEvent(action) {
        switch (action) {
            case "adddevicegroup":
                this.props.Body.PopupManager.setPopup(
                    ModelManager.GetPopupInfo("adddevicegroup", this.props.ViewManager.state.submenu),
                    this.props.ViewManager.ClearCheckBox);
                break;
            case "modifydevicegroup":
                this.props.Body.PopupManager.setPopup(
                    ModelManager.GetPopupInfo("modifydevicegroup", this.props.ViewManager.state.submenu),
                    this.props.ViewManager.ClearCheckBox);
                break;
            case "addautomator":
                //this.TableArea.newAutomator(true);
                this.setState({ automator: true });
                break;
            case "add_automator_group":
                this.props.Body.PopupManager.setPopup(
                    ModelManager.GetPopupInfo(action, this.props.ViewManager.state.submenu),
                    this.props.ViewManager.ClearCheckBox);
                break;
            case "user_detail":
            case "add_user":
                this.props.Body.PopupManager.setPopup(
                    ModelManager.GetPopupInfo(action, this.props.ViewManager.state.submenu),
                    this.props.ViewManager.ClearCheckBox);
                break;
            case "add_user_group":
                this.props.Body.PopupManager.setPopup(
                    ModelManager.GetPopupInfo(action, this.props.ViewManager.state.submenu),
                    this.props.ViewManager.ClearCheckBox);
                break;
            case "agent_sync":
                break;
            case "add_agent_group":
                this.props.Body.PopupManager.setPopup(
                    ModelManager.GetPopupInfo(action, this.props.ViewManager.state.submenu),
                    this.props.ViewManager.ClearCheckBox);
                break;
            case "restore":
            case "remove":
                this.props.Body.PopupManager.openSubPopup(null, action);
                break;
            case "automator":
                this.props.Body.PopupManager.openAutomator(CommonData.selectedAutomator)
                break;
            case "device_detail":
                //this.DeviceInfo.show(true);
                this.props.Body.OpenPopup("deviceinfo", true);
                break;
        }
        //CommonData.clearData(CommonData.bulkactionList);
        //this.refresh();
    }

    render() {
        if (this.state.automator) {
            return (
                <div style={{ display: "fixed", zIndex: 0 }}>
                    <NewAutomator ContentsArea={this} isNew={true} />
                </div>);
        } else {
            return (
                <div style={{ display: "fixed" }}>
                    <CommandArea
                        ref={ref => this.CommandArea = ref}
                        ViewManager={this.props.ViewManager}
                        ActionManager={this.props.ActionManager}
                        ContentsCommand={this.props.ContentsCommand}
                        ContentsArea={this}
                        ColumnItems={this.state.ColumnItems} />
                    <TableArea
                        ref={ref => this.TableArea = ref}
                        ActionManager={this.props.ActionManager}
                        //ContentsTable={CommonData.CurrentMenu == "report_hardware" ? "" : this.props.ContentsTable}
                        ContentsTable={this.props.ContentsTable}
                        APICommand={this.props.APICommand}
                        ViewManager={this.props.ViewManager}
                        ContentsArea={this}
                        CommandAction={this.state.commandAction} />
                </div>
            );
        }


    }
}