import * as util from '../Util/Util.js';
import APIManager from './APIManager.js';
import ModelManager from './ModelManager.js';

export default class ActionManager {
    constructor() {
        //this.APIManager = new APIManager();
        //this.ModelManager = new ModelManager(this);
        this.GetTableInfo = this.GetTableInfo.bind(this);
        this.GetCommandInfo = this.GetCommandInfo.bind(this);
        this.GetAPICommand = this.GetAPICommand.bind(this);
    }

    GetTableInfo(submenu) {
        return ModelManager.GetTableInfo(submenu);
    }
    GetCommandInfo(submenu) {
        return ModelManager.GetCommandInfo(submenu);
    }
    GetAPICommand(submenu) {
        return ModelManager.GetAPICommand(submenu);
    }
    GetPopupInfo(type,submenu) {
        console.log("GetPopupInfo",type,submenu)
        return ModelManager.GetPopupInfo(type,submenu);
    }
}