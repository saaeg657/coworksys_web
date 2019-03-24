# Coworksys Automator Editor

### installation
```
npm i 
```

### Run for Dev
```
sudo npm start
```

### Port Definition
- localhost:80 (Development site)

#### Change Log
- add package dependencies
```
react-dnd^2.14
react-dnd-html5-backend^2.14
react-dnd-text-dragpreview^0.2.3
```

- move some files
```
/src/Component/Body/Contents/Automator/NewAutomator.js
=> /src/Component/Body/Contents/Automator/NewAutomator/NewAutomator.js
```

- add component schema
```
/src/InformationData/ComponentSchema.js
```

- add editor components
```
Editor.js, EditorBody.js, ComponentMenuItem.js, Statement.js, StatementDetail.js, LineSpace.js, LineSpaceColumn.js
=> /src/Component/Body/Contents/Automator/NewAutomator/
```

### Parsing Rule
![img](http://drive.google.com/uc?export=view&id=129c7bPGPWSrzW4rTzKsgX7irBjZ2vBhz)
```
[
    {
        "type": "condition",
        "name": "isUserLoggedIn",
        "comment": "입력과 대상의 실시간 값을 선택의 항목으로 비교",
        "parameters": {
            "input": "username1",
            "target": "에이전트가 설치된 컴퓨터",
            "operator": "사용중"
        },
        "row": 1,
        "column": 1,
        "commands": [
            {
                "type": "condition",
                "name": "isUserActive",
                "comment": "입력과 대상의 실시간 값을 선택의 항목으로 비교",
                "parameters": {
                    "target": "에이전트가 설치된 컴퓨터",
                    "option": "사용중"
                },
                "row": 2,
                "column": 2,
                "commands": [
                    {
                        "type": "command",
                        "name": "installPKG",
                        "comment" : "입력과 대상의 실시간 값을 선택의 항목으로 비교",
                        "script": "",
                        "parameters": {
                            "input": "/user/test/pkg-ex.pkg",
                            "target": "에이전트가 설치된 컴퓨터",
                            "option": "경고문을 입력하세요"
                        },
                        "row": 3,
                        "column": 3
                    }
                ]
            },
            {
                "type": "command",
                "name": "installMSI",
                "comment": ".msi 파일을 설치",
                "parameters": {
                    "input": "/user/test/msi-ex.msi",
                    "target": "에이전트가 설치된 컴퓨터",
                    "option": "경고문을 입력하세요"
                },
                "row": 4,
                "column": 2
            },
            {
                "type": "command",
                "name": "executeShellCommand",
                "comment": "입력된 Shell command를 대상 에이전트의 장치에 지정된 권한으로 실행합니다.",
                "parameters": {
                    "input": "shutdown -r -t 60",
                    "target": "에이전트가 설치된 컴퓨터",
                    "option": "macOS"
                },
                "row": 5,
                "column": 2
            }
        ]
    },
    {
        "type": "condition",
        "name": "else",
        "comment": "else",
        "row": 6,
        "column": 1,
        "commands": [
            {
                "type": "command",
                "name": "shutdown",
                "comment": "입력만큼의 시간 후에 시스템을 종료 합니다.",
                "row": 7,
                "column": 2,
                "parameters": {
                    "input": "360",
                    "target": "에이전트가 설치된 컴퓨터",
                    "option": "경고문을 입력하세요"
                }
            }
        ]
    }
]
```

### Added Functions
/src/Component/Body/Contents/Automator/NewAutomator.js line 162

단순 배열 형태의 raw commands를 depth가 있는 배열로 parsing
```
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

```

/src/Component/Body/Contents/Automator/NewAutomator.js line 209

depth가 있는 배열을 다시 단순 배열로 restoring
```
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
```

