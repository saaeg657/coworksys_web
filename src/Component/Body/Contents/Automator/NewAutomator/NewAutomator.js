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
            Commands: this.parseCommands(Commands)
        });
    }


    // 단순 배열 형태의 raw commands를 depth가 있는 배열로 parsing
    parseCommands(Commands) {
        if (!Commands || Commands.length === 0) return;
        console.log('original', Commands);
        var parsedCommands = [];
        let columnArray = [0];
        let depth = 1;
        var currentCommand = {};
        Commands.forEach((command, i) => {
            if (depth === command.column) {
                depth = command.column;
                columnArray[depth - 1] += 1;
            } else if (depth < command.column) {
                depth = command.column;
                columnArray[depth - 1] = 1;
            } else {
                depth = command.column;
                columnArray[depth - 1] += 1;
            }

            currentCommand = parsedCommands;
            for (let j = 0; j < depth; ++j) {
                if (j > 0) {
                    if (!currentCommand.commands[columnArray[j] - 1]) currentCommand.commands.push({});
                    currentCommand = currentCommand.commands[columnArray[j] - 1];
                }
                else {
                    if (!currentCommand[columnArray[j] - 1]) currentCommand.push({});
                    currentCommand = currentCommand[columnArray[j] - 1];
                }
            }
            currentCommand.type = command.type;
            currentCommand.name = command.name;
            currentCommand.comment = command.comment;
            currentCommand.parameters = {};
            Object.keys(command.parameters).forEach((param) => {
                currentCommand.parameters[param] = command.parameters[param].value;
            });
            if (currentCommand.type === 'condition') {
                currentCommand.commands = [];
            }
        });
        console.log('parsed', parsedCommands);
        console.log('restored', this.restoreCommandsToArray(JSON.stringify(parsedCommands)));
        return JSON.stringify(parsedCommands);
    }

    // depth가 있는 배열을 다시 단순 배열로 restoring
    restoreCommandsToArray(Commands) {
        if (!Commands || Commands.length === 0) return;
        let _Commands = JSON.parse(Commands);
        let restoredCommands = [];
        let nextStatement = {};
        let row = 1;
        let column = 1;
        _Commands = _Commands.map((v) => { v.column = column; return v; });
        while (_Commands.length > 0) {
            nextStatement = _Commands[0];
            _Commands.splice(0, 1);
            let newStatement = {};
            if (nextStatement.name) newStatement.name = nextStatement.name;
            if (nextStatement.type) newStatement.type = nextStatement.type;
            if (nextStatement.parameters) newStatement.parameters = nextStatement.parameters;
            if (nextStatement.comment) newStatement.comment = nextStatement.comment;
            newStatement.row = row++;
            newStatement.column = nextStatement.column;
            restoredCommands.push(newStatement);
            if (nextStatement.commands && nextStatement.commands.length > 0) {
                _Commands = [...nextStatement.commands.map((v) => { v.column = nextStatement.column + 1; return v; }), ..._Commands];
            }
        }
        return restoredCommands;
    }
    // parseCommandsToString(_Commands) {
    //     let Commands = _Commands.slice();
    //     var parsedCommands = '';
    //     let columnStack = [];
    //     let extraColumn = 0;
    //     Commands.map((command, i) => {
    //         if (command.column + extraColumn <= columnStack.length) {
    //             let prevColumnStack = columnStack.length;
    //             let stackDiff = 0;
    //             let extraColumnPrev = 0;
    //             let countIF = 0;
    //             let k = 0;
    //             while (countIF < command.column - 1) {
    //                 if (columnStack[k] === 'LOOP') extraColumnPrev += 1;
    //                 else countIF += 1;
    //                 k += 1;
    //             }
    //             if (command.name === 'else') stackDiff = prevColumnStack - (command.column + extraColumnPrev);
    //             else stackDiff = prevColumnStack - (command.column + extraColumnPrev - 1);
    //             for (let j = 0; j < stackDiff; ++j) {
    //                 for (let k = 0; k < prevColumnStack - j - 1; ++k) {
    //                     parsedCommands += '\t';
    //                 }
    //                 if (columnStack[columnStack.length - 1] === 'LOOP') {
    //                     parsedCommands += '#ENDLOOP#\r\n';
    //                     extraColumn -= 1;
    //                 } else {
    //                     parsedCommands += '#ENDIF#\r\n';
    //                 }
    //                 columnStack.pop();
    //             }
    //         }

    //         for (let j = 0; j < command.column - 1 + extraColumn; ++j) {
    //             parsedCommands += `\t`;
    //         }
    //         if (command.type === 'condition') {
    //             if (command.loop) {
    //                 parsedCommands += `#LOOP#\r\n`;
    //                 extraColumn += 1;
    //                 columnStack.push('LOOP');
    //                 for (let j = 0; j < command.column - 1 + extraColumn; ++j) {
    //                     parsedCommands += `\t`;
    //                 }
    //             }
    //             parsedCommands += `#${(command.name === 'else' || command.name === 'break') ? `${command.name.toUpperCase()}` : `IF ${command.name}`}`;
    //             Object.keys(command.parameters).map((param, j) => {
    //                 if (command.parameters[param].type !== 'Null' && command.parameters[param].type !== 'Fixed') {
    //                     if (command.parameters[param].name === '연산자') {
    //                         parsedCommands += ` ${command.parameters[param].value}`;
    //                     } else {
    //                         parsedCommands += ` "${command.parameters[param].value}"`;
    //                     }
    //                 }
    //             });
    //             parsedCommands += '#\r\n';
    //             if (command.name !== 'break') columnStack.push('IF');
    //         } else {
    //             parsedCommands += `##${command.name}(`;
    //             let index = 0;
    //             Object.keys(command.parameters).map((param) => {
    //                 if (command.parameters[param].type !== 'Null' && command.parameters[param].type !== 'Fixed') {
    //                     parsedCommands += `${index < 1 ? '' : ', '}"${command.parameters[param].value}"`;
    //                     index += 1;
    //                 }
    //             });
    //             parsedCommands += `)##\r\n`;
    //             if (command.column + extraColumn <= columnStack.length) columnStack.pop();
    //         }
    //     });
    //     if (columnStack.length === 0) parsedCommands += '#END#\r\n';
    //     for (let j = columnStack.length - 1; j >= 0; --j) {
    //         for (let k = 0; k < j; ++k) {
    //             parsedCommands += '\t';
    //         }
    //         parsedCommands += (columnStack[j] === 'LOOP' ? '#ENDLOOP#\r\n' : '#ENDIF#\r\n');
    //     }
    //     console.log(this.parseCommands(_Commands))
    //     // console.log('Commands created by editor\n', Commands);
    //     // console.log(parsedCommands);
    //     // console.log('Restored commands from string\n', this.parseCommandsToArray(parsedCommands));
    //     return parsedCommands;
    // }

    // parseCommandsToArray(_Commands) {
    //     let Commands = _Commands.slice();
    //     var parsedCommands = [];
    //     let row = 0;
    //     let extraColumn = 0;
    //     Commands.split('\n').map((statement) => {
    //         let parsedStatement = {};
    //         let name, type, parameters;
    //         parsedStatement.column = statement.split('#')[0].length + 1 - extraColumn;
    //         statement = statement.trim();
    //         if (statement === '#LOOP#') extraColumn += 1;
    //         if (statement === '#ENDLOOP#') extraColumn -= 1;
    //         if (statement === '#LOOP#' || statement === '#END#' || statement === '#ENDIF#' || statement === '#ENDLOOP#' || statement.length === 0) return null;
    //         row += 1;
    //         if (statement.match('##') && statement.match('##').index === 0) {
    //             statement = statement.slice(2, -2);
    //             name = statement.split('(')[0];
    //             type = name.match('install') ? 'install' : 'system';
    //             parameters = statement.slice(name.length + 1, -1).split(',').map(v => v.trim().replace(/\"/gi, ''));
    //         } else if (statement.match('#') && statement.match('#').index === 0) {
    //             statement = statement.slice(1, -1);
    //             name = statement.split(' ').length > 1 ? statement.split(' ')[1] : statement.split(' ')[0].toLowerCase();
    //             type = 'condition';
    //             parameters = statement.split(' ').slice(2).map(v => v.trim().replace(/\"/gi, ''));
    //         }
    //         parsedStatement = Object.assign(componentSchema[type][name], parsedStatement, { row });
    //         let index = 0;
    //         Object.keys(parsedStatement.parameters).map((param, i) => {
    //             if (parsedStatement.parameters[param].type !== 'Null' && parsedStatement.parameters[param].type !== 'Fixed') {
    //                 parsedStatement.parameters[param].value = parameters[index];
    //                 index += 1;
    //             }
    //         });
    //         parsedCommands.push(parsedStatement);
    //     });
    //     return parsedCommands;
    // }

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