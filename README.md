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
        "script": "",
        "parameters": {
            "input": "username1",
            "target": "에이전트가 설치된 컴퓨터",
            "operator": "사용중"
        },
        "commands": [
            {
                "type": "condition",
                "name": "isUserActive",
                "script": "",
                "parameters": {
                    "target": "에이전트가 설치된 컴퓨터",
                    "option": "사용중"
                },
                "commands": [
                    {
                        "type": "command",
                        "name": "installPKG",
                        "script": "",
                        "parameters": {
                            "input": "/user/test/pkg-ex.pkg",
                            "target": "에이전트가 설치된 컴퓨터",
                            "option": "경고문을 입력하세요"
                        }
                    }
                ]
            },
            {
                "type": "command",
                "name": "installMSI",
                "script": "",
                "parameters": {
                    "input": "/user/test/msi-ex.msi",
                    "target": "에이전트가 설치된 컴퓨터",
                    "option": "경고문을 입력하세요"
                }
            },
            {
                "type": "command",
                "name": "executeShellCommand",
                "script": "",
                "parameters": {
                    "input": "shutdown -r -t 60",
                    "target": "에이전트가 설치된 컴퓨터",
                    "option": "macOS"
                }
            }
        ]
    },
    {
        "type": "condition",
        "name": "else",
        "script": "",
        "commands": [
            {
                "type": "command",
                "name": "shutdown",
                "script": "",
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