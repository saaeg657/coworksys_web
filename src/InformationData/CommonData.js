export var CurrentMenu = "device_device";
export var bulkactionList = [];
export var addItemList = [];
export var selectedAutomator = null;
export var thirdPopupList = [];
export var newAgent_automator = [];
export var newAgent_group = [];
export var newAgent_network = [];
export var applyNow = false;
export var sendEmail = false;
export var currentoption="";

///export var report_hardwareList=["name", "ipAddress", "currentUser", "osVersion", "deviceGroupName", "agentStatus", "agentVersion"];

export function clearData(list) {
        list.splice(0, list.length);
}

export function setData(list, item) {
        if (existItem(list, item)) {
                list = removeData(list, item);
        }
        else {
                list = appendData(list, item);
        }
        return list;

}
export function existItem(list, item) {
        if (list != undefined) {
                for (var i = 0; i < list.length; i++) {
                        if (list[i].id != null || list[i].id != undefined) {
                                //console.log("existItem",list[i].id,item.id)
                                if (list[i].id == item.id) {
                                        return true;
                                }
                        } else {
                                if (list[i] == item)
                                        return true;
                        }
                }
                return false;
        }
}
export function appendData(list, item) {
        list = list.concat(item);
        return list;
}
export function removeData(list, item) {
        if (list != undefined) {
                if (list.length == 1) {
                        list.splice(0, 1);
                        return [];
                }
                for (var i = 0; i < list.length; i++) {
                        if (list[i] == item) {
                                return list.splice(i, 1);
                        }
                }

                if (list.length == 0)
                        list = [];
                return list;
        }

}
///기존 유저그룹, 디바이스 그룹에서 구성원 추가/제거에 사용
export var selectedUserGroup = null;
export var selectedDeviceGroup = null;
export var selectedDevice = null;
export var addUserList = [];
export var removeUserList = [];

export var addDeviceList = [];
export var removeDeviceList = [];
export var refreshData = false;
export var refreshDeviceData = false;

///
export var addDeviceList_NewDeviceGroup = [];

export var addUserlist_AddtoGroup = [];


///오토메이터

export var targetDevices = [];

export var automatorList = [];
export var groupList = [];
export var networkRangeList = [];

///에이전트
export var email = "";
export var securitykey = "";
