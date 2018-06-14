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