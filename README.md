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