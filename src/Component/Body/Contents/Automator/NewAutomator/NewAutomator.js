import React from 'react';
import * as properties from '../../../../../Properties.js';
import Axios from 'axios';
import Dropdown from 'react-dropdown';
import PopupModal from '../../Popup/PopupModal.js';
import Editor from './Editor.js';
import componentSchema from '../../../../../InformationData/ComponentSchema.js';
var TAG = "NewAutomator";
export default class NewAutomator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            GroupList: [],
            Groupinfo: [],
            AutomatorName: "",
            osType: "",
            Commands: [],
            SelectedGroup: -1,
            SelectedGroupName: "",
            hover: "",
            popup: false
        }
        this.movePage = this.movePage.bind(this);
        this.saveAutomator = this.saveAutomator.bind(this);
        this.saveAs = this.saveAs.bind(this);
        this.getGroup = this.getGroup.bind(this);
        this.getGroup();
        this.changeName = this.changeName.bind(this);
        this.changeCommand = this.changeCommand.bind(this);
        this.category = this.category.bind(this);
        this.mouseOver = this.mouseOver.bind(this);
        this.showPopup = this.showPopup.bind(this);
        this.resultFromPopup = this.resultFromPopup.bind(this);
        this.onChangeCommands = this.onChangeCommands.bind(this);
    }
    resultFromPopup(name, groupID) {
        var ostype = "";
        for (var i = 0; i < this.state.Groupinfo.length; i++) {
            if (this.state.Groupinfo[i].id == groupID) {
                ostype = this.state.Groupinfo[i].osType;
                break;
            }
        }

        let body = {
            "name": name,
            "userID": 1,
            "automatorGroupID": groupID,
            "osType": ostype,
            "script": this.state.Command
        };
        var header = {
            headers: {
                'Content-Type': "application/json; charset=utf-8",
            }
        };
        Axios.post(properties.ServerURL + '/coworksys/api/automator/insert',
            body, header)
            .then(
                Response => {
                    console.log(TAG, Response, body);
                }
            );
    }
    showPopup(visible) {
        this.setState({ popup: visible });
    }
    mouseOver(item) {
        this.setState({ hover: item });
    }

    category(e) {
        for (var i = 0; i < this.state.GroupList.length; i++) {
            if (this.state.GroupList[i] == e.value) {
                this.setState({
                    SelectedGroup: this.state.Groupinfo[i].id,
                    SelectedGroupName: e.value,
                    osType: this.state.Groupinfo[i].osType
                });
                break;
            }
        }
    }
    movePage() {

        if (this.state.Command.length > 0) {
            this.PopupModal.show(true, "automator_exit");
        }
        else {
            this.props.ContentsArea.refresh_automator();
        }
    }

    saveAs() {
        this.PopupModal.show(true, "automator_saveas");
    }
    saveAutomator() {
        let body = {
            "name": this.state.AutomatorName,
            "userID": 1,
            "automatorGroupID": this.state.SelectedGroup,
            "osType": this.state.osType,
            "script": this.state.Command
        };

        var header = {
            headers: {
                'Content-Type': "application/json; charset=utf-8",
            }
        };
        Axios.post(properties.ServerURL + '/coworksys/api/automator/insert',
            body, header)
            .then(
                Response => {
                    console.log(TAG, Response, body);
                    this.props.ContentsArea.refresh();
                }
            );
    }
    changeName(e) {
        this.setState({ AutomatorName: e.target.value });
    }
    changeCommand(e) {
        this.setState({ Command: e.target.value });
    }
    getGroup() {
        var header = {
            headers: {
                'Content-Type': "application/json; charset=utf-8",
            }
        };

        Axios.post(properties.ServerURL + '/coworksys/api/automatorgroup/get/list',
            {
                "osType": "eAll"
            }, header)
            .then(
                Response => {
                    let newList = Response.data.automatorGroupList;
                    let namelist = [];
                    for (var i = 0; i < newList.length; i++) {
                        namelist = namelist.concat(newList[i].name);
                    }
                    this.setState({
                        GroupList: namelist,
                        Groupinfo: newList
                    });
                    console.log(TAG, Response);
                }
            );

    }

    onChangeCommands(Commands) {
        this.setState({
            Commands: this.parseCommandsToString(Commands)
        });
    }

    // parseCommands(Commands) {
    //     if (!Commands || Commands.length === 0) return;
    //     var parsedCommands = [];
    //     let columnArray = [0];
    //     let depth = 1;
    //     var currentCommand = {};
    //     Commands.map((command, i) => {
    //         if (depth === command.column) {
    //             depth = command.column;
    //             columnArray[depth - 1] += 1;
    //         } else if (depth < command.column) {
    //             depth = command.column;
    //             columnArray.push(1);
    //         } else {
    //             depth = command.column;
    //             columnArray[depth - 1] += 1;
    //         }

    //         currentCommand = parsedCommands;
    //         for (let j = 0; j < depth; ++j) {
    //             if (j > 0) {
    //                 if (!currentCommand.commands[columnArray[j] - 1]) currentCommand.commands.push({});
    //                 currentCommand = currentCommand.commands[columnArray[j] - 1];
    //             }
    //             else {
    //                 if (!currentCommand[columnArray[j] - 1]) currentCommand.push({});
    //                 currentCommand = currentCommand[columnArray[j] - 1];
    //             }
    //         }
    //         currentCommand.type = command.type;
    //         currentCommand.name = command.name;
    //         currentCommand.parameters = {};
    //         Object.keys(command.parameters).map((param) => {
    //             currentCommand.parameters[param] = '';
    //             currentCommand.parameters[param] = command.parameters[param].value;
    //             return null;
    //         });
    //         if (currentCommand.type === 'condition') {
    //             currentCommand.commands = [];
    //         }
    //         return null
    //     });
    //     console.log(parsedCommands);
    //     return parsedCommands;
    // }

    parseCommandsToString(Commands) {
        var parsedCommands = '';
        let columnStack = 0;
        Commands.map((command, i) => {
            if (command.column <= columnStack) {
                let prevColumnStack = columnStack;
                let stackDiff = 0;
                if (command.name === 'else') stackDiff = prevColumnStack - command.column;
                else stackDiff = prevColumnStack - (command.column - 1);
                for (let j = 1; j <= stackDiff; ++j) {
                    for (let k = 0; k < prevColumnStack - j; ++k) {
                        parsedCommands += '\t';
                    }
                    parsedCommands += '#END#\n';
                }
            }
            for (let j = 0; j < command.column - 1; ++j) {
                parsedCommands += `\t`;
            }
            if (command.type === 'condition') {
                parsedCommands += `#${command.loop ? `LOOP ${command.name}` : (command.name === 'else' ? 'ELSE' : `IF ${command.name}`)}`;
                Object.keys(command.parameters).map((param, j) => {
                    if (command.parameters[param].type !== 'Null' && command.parameters[param].type !== 'Fixed') {
                        if (command.parameters[param].name === '연산자') {
                            parsedCommands += ` ${command.parameters[param].value}`;
                        } else {
                            parsedCommands += ` "${command.parameters[param].value}"`;
                        }
                    }
                });
                parsedCommands += '#\n';
                columnStack = command.column;
            } else {
                parsedCommands += `##${command.name}(`;
                let index = 0;
                Object.keys(command.parameters).map((param) => {
                    if (command.parameters[param].type !== 'Null' && command.parameters[param].type !== 'Fixed') {
                        parsedCommands += `${index < 1 ? '' : ', '}"${command.parameters[param].value}"`;
                        index += 1;
                    }
                });
                parsedCommands += `)##\n`;
                columnStack = command.column - 1;
            }
        });
        if (columnStack === 0) parsedCommands += '#END#\n';
        for (let j = 1; j <= columnStack; ++j) {
            for (let k = 0; k < columnStack - j; ++k) {
                parsedCommands += '\t';
            }
            parsedCommands += '#END#\n';
        }
        console.log('Commands created by editor\n', Commands);
        console.log(parsedCommands);
        console.log('Restored commands from string\n', this.parseCommandsToArray(parsedCommands));
        return parsedCommands;
    }

    parseCommandsToArray(Commands) {
        var parsedCommands = [];
        let row = 0;
        Commands.split('\n').map((statement) => {
            let parsedStatement = {};
            let name, type, parameters;
            parsedStatement.column = statement.split('#')[0].length + 1;
            statement = statement.trim();
            if (statement === '#END#' || statement.length === 0) return null;
            row += 1;
            if (statement.match('##') && statement.match('##').index === 0) {
                statement = statement.slice(2, -2);
                name = statement.split('(')[0];
                type = name.match('install') ? 'install' : 'system';
                parameters = statement.slice(name.length + 1, -1).split(',').map(v => v.trim().replace(/\"/gi, ''));
            } else {
                if (statement.match('#') && statement.match('#').index === 0) {
                    statement = statement.slice(1, -1);
                    name = statement.split(' ')[1];
                    type = 'condition';
                    parameters = statement.split(' ').slice(2).map(v => v.trim().replace(/\"/gi, ''));
                }
            }
            parsedStatement = Object.assign(componentSchema[type][name], parsedStatement, { row });
            let index = 0;
            Object.keys(parsedStatement.parameters).map((param, i) => {
                if (parsedStatement.parameters[param].type !== 'Null' && parsedStatement.parameters[param].type !== 'Fixed') {
                    parsedStatement.parameters[param].value = parameters[index];
                    index += 1;
                }
            });
            parsedCommands.push(parsedStatement);
        });
        return parsedCommands;
    }

    render() {

        let html = <div className="div-localuser" style={{ position: "fixed", width: "100%" }}>
            <div className="div-currentposition" style={{ marginBottom: "0px" }}>
                <div className="text-position" onClick={this.refresh} style={{ cursor: "pointer", textDecoration: "none" }}><img src={'../images/blue_dot.png'} style={{ width: 5, height: 5 }} />{" 오토메이터"}</div>
            </div>

            <div className="div-device-wrapper" style={{ marginRight: this.props.ContentsArea.props.Body.state.isShowMenu ? 250 : 70 }}>
                <div    >
                    <div className="div-contents-table"
                        style={{
                            backgroundColor: "white"
                        }}>
                        <div className="w-form">
                            <form data-name="Email Form" id="email-form" name="email-form">
                                <div className="div-block-22" style={{ paddingTop: 13 }}>
                                    <div className="div-block-23">
                                        <input className="w-input"
                                            style={{
                                                border: "transparent",
                                                color: "#2d4fb2",
                                                fontWeight: 700,
                                                fontSize: "13pt",
                                                paddingTop: 0,
                                                backgroundColor: "#FAFAFA"
                                            }}
                                            data-name="Automator Name" id="Automator-Name" onChange={this.changeName} maxLength={256} name="Automator-Name" placeholder="Automator의 이름을 입력하세요." type="text" />
                                    </div>
                                    <div style={{ display: "flex" }}>
                                        <div style={{ display: "flex" }}>
                                            <div style={{ height: "30px", width: "44px", borderTopLeftRadius: "15px", borderBottomLeftRadius: "15px", backgroundColor: "#2d4fb2", marginLeft: "20px", marginRight: "-10px", paddingTop: "5px", color: "white", textAlign: "center" }}>조직</div>
                                            <div style={{ width: "150px" }}>
                                                <Dropdown
                                                    options={this.state.GroupList}
                                                    value={this.state.SelectedGroupName}
                                                    onChange={this.category}
                                                    placeholder=" " />
                                            </div>
                                        </div>
                                        <div style={{ paddingRight: 15, minWidth: 100 }}>
                                            <a onClick={this.showPopup.bind(null, true)} style={{ marginLeft: "10px" }} href="#"><img width={30} height={30} src={this.props.isNew ? './images/v.png' : './images/saveas.png'} /></a>
                                            <a onClick={this.movePage} style={{ marginLeft: "10px" }} href="#"><img width={30} height={30} src={'./images/x.png'} /></a>
                                        </div>
                                    </div>
                                </div>
                                <div className="div-block-26">
                                    <Editor
                                        onChangeCommands={this.onChangeCommands}
                                    />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div >

        var dialog =
            <div style={{ position: "fixed", height: "100%", width: "100%" }}>
                <div style={{
                    width: 60, height: 90, backgroundColor: "white", color: "#2d4fb2", border: "1px solid #2d4fb2", float: "right", marginRight: 325, marginTop: 110,
                    fontWeight: 700, display: "flex", alignContent: "center", flexDirection: "column"
                }}>
                    <div onClick={this.saveAutomator} style={{ textAlign: "center", backgroundColor: this.state.hover == "save" ? "#2d4fb2" : "white", color: this.state.hover == "save" ? "white" : "#2d4fb2", height: 30, paddingTop: 5, cursor: "pointer" }} onMouseOver={this.mouseOver.bind(null, "save")} onMouseOut={this.mouseOver.bind(null, "")}><a >저장</a></div>
                    <div onClick={this.saveAs} style={{ textAlign: "center", backgroundColor: this.state.hover == "saveas" ? "#2d4fb2" : "white", color: this.state.hover == "saveas" ? "white" : "#2d4fb2", height: 30, paddingTop: 5, cursor: "pointer" }} onMouseOver={this.mouseOver.bind(null, "saveas")} onMouseOut={this.mouseOver.bind(null, "")}><a >복제</a></div>
                    <div onClick={this.showPopup.bind(null, false)} style={{ textAlign: "center", backgroundColor: this.state.hover == "cancel" ? "#2d4fb2" : "white", color: this.state.hover == "cancel" ? "white" : "#2d4fb2", height: 30, paddingTop: 5, cursor: "pointer" }} onMouseOver={this.mouseOver.bind(null, "cancel")} onMouseOut={this.mouseOver.bind(null, "")}><a >취소</a></div>
                </div>
            </div>

        return (
            <div>
                {html}
                {this.state.popup ? dialog : ""}
                <PopupModal ref={ref => this.PopupModal = ref} ContentsArea={this.props.ContentsArea} GroupList={this.state.Groupinfo} GroupInfo={this.state.GroupList} parent={this} />
            </div>
        );
    }
}