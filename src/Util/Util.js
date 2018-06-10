import * as Properties from '../Properties.js';

export function toDateString(props) {
        let date = new Date(toLocalTime(props));
        return date.getFullYear() + "/" + ("0" + (date.getMonth() + 1)).slice(-2) + "/" + date.getDate() + " " + ("0" + date.getHours()).slice(-2) + ":" + ("0" + date.getMinutes()).slice(-2);
}
export function toDateStringYMDHHmmss_Kor(props) {

        let date = new Date(toLocalTime(props));

        return date.getFullYear() + "년 " + ("0" + (date.getMonth() + 1)).slice(-2) + "월 " + date.getDate() + "일" + " " + ("0" + date.getHours()).slice(-2) + ":" + ("0" + date.getMinutes()).slice(-2) + ":" + ("0" + date.getSeconds()).slice(-2);
}
export function toDateStringYMDHHmmss_Short(props) {

        let date = new Date(toLocalTime(props));

        return date.getFullYear() + "/" + ("0" + (date.getMonth() + 1)).slice(-2) + "/" + date.getDate() + "/" + " " + ("0" + date.getHours()).slice(-2) + ":" + ("0" + date.getMinutes()).slice(-2) + ":" + ("0" + date.getSeconds()).slice(-2);
}
export function toDateStringYMD_Kor(props) {

        let date = new Date(toLocalTime(props));
        var result = date.getFullYear();
        return date.getFullYear() + "년 " + ("0" + (date.getMonth() + 1)).slice(-2) + "월 " + date.getDate() + "일";
}
export function toDateStringHHmmss(props) {

        let date = new Date(toLocalTime(props));

        return ("0" + date.getHours()).slice(-2) + ":" + ("0" + date.getMinutes()).slice(-2) + ":" + ("0" + date.getSeconds()).slice(-2);
}

export function toDateStringYM_Kor(props) {
        let date = new Date(toLocalTime(props));
        return date.getFullYear() + "년 " + ("0" + (date.getMonth() + 1)).slice(-2) + "월";
}

export function toTimeString(props) {
        let date = new Date(toLocalTime(props));
        return ("0" + date.getHours()).slice(-2) + ":" + ("0" + date.getMinutes()).slice(-2);
}

export function toLocalTime(props) {
        let d = new Date();
        let n = d.getTimezoneOffset();

        // props += n * 60 * 1000;
        return parseInt(props);
}

export function enumStatus(props) {

        switch (props) {
                case "eActive":
                        return "활성화";
                case "eBlock":
                        return "비활성화";
                case "eConnected":
                        return "연결됨";
                case "eDisconnected":
                        return "연결끊김";
        }
        return props;
}
export function enumNetworkType(props) {

        switch (props) {
                case "eLocal":
                        return "로컬 유저";
                case "eNetwork":
                        return "네트워크 유저";
        }
        return props;
}

export function enumDeviceType(props) {

        switch (props) {
                case "eManagedGroup":
                        return "관리 장비";
                case "eUnmanagedGroup":
                        return "비관리 장비";
                case "eAssetGroup":
                        return "자산 장비";
                case "eAll":
                        return "모든 장비";
        }
        return props;
}

export function enumDeviceTypeToEng(props) {

        switch (props) {
                case "관리 장비":
                        return "eManagedGroup";
                case "비관리 장비":
                        return "eUnmanagedGroup";
                case "자산 장비":
                        return "eAssetGroup";
                case "모든 장비":
                        return "eAll";
        }
        return props;
}
export function enumOSType(props) {

        switch (props) {
                case "eWindows":
                case "eWindowsOnly":
                        return "윈도우";
                case "eMacOsOnly":
                case "eOSX":
                        return "macOS";
                case "eNoMatter":
                case "eNon":
                        return "미분류";
        }
        return props;
}
export function enumManufact(props) {

        switch (props) {
                case "eWindows":
                case "eWindowsOnly":
                        return "";
                case "eMacOsOnly":
                case "eOSX":
                        return "Apple";
                case "eNoMatter":
                case "eNon":
                        return "";
        }
        return props;
}


export function decodePermission(props) {
        let permission = "";
        if (props == -1)
                return "모든권한";
        if (props & 64)
                permission = "비밀번호";
        if (props & 32) {
                if (permission.length != 0 && permission.endsWith("|") == false)
                        permission += "|";
                permission += "자산 정보";
        }
        if (props & 16) {
                if (permission.length != 0 && permission.endsWith("|") == false)
                        permission += "|";
                permission += "고급 오토메이터";
        }
        if (props & 8) {
                if (permission.length != 0 && permission.endsWith("|") == false)
                        permission += "|";
                permission += "오토메이터";
        }
        if (props & 4) {
                if (permission.length != 0 && permission.endsWith("|") == false)
                        permission += "|";
                permission += "원격제어";
        }
        if (props & 2) {
                if (permission.length != 0 && permission.endsWith("|") == false)
                        permission += "|";
                permission += "원격 화면 공유";
        }
        if (props & 1) {
                if (permission.length != 0 && permission.endsWith("|") == false)
                        permission += "|";
                permission += "전원관리";
        }
        if (permission.length == 0)
                return "권한없음";
        else
                return permission;
}

export function getParam(key) {
        var _parammap = {};
        document.location.search.replace(/\??(?:([^=]+)=([^&]*)&?)/g, function () {
                function decode(s) {
                        return decodeURIComponent(s.split("+").join(" "));
                }

                _parammap[decode(arguments[1])] = decode(arguments[2]);
        });
        return _parammap[key];
}

export function generateUUID() {
        function s4() {
                return Math.floor((1 + Math.random()) * 0x10000)
                        .toString(16)
                        .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                s4() + '-' + s4() + s4() + s4();
}

export function getCurrentTimeStamp() {
        return Date.now();
}

export function ConvertDateToString(value) {
        let date = new Date(toLocalTime(value));
        return date.getFullYear() + "/" + ("0" + (date.getMonth() + 1)).slice(-2) + "/" + ("0" + (date.getDate())).slice(-2) + " " + ("0" + date.getHours()).slice(-2) + ":" + ("0" + date.getMinutes()).slice(-2);
}


export function newMap() {
        var map = {};
        map.value = {};
        map.getKey = function (id) {
                // return "k_" + id;
                return id;
        };
        map.put = function (id, value) {
                var key = map.getKey(id);
                map.value[key] = value;
        };
        map.contains = function (id) {
                var key = map.getKey(id);
                if (map.value[key]) {
                        return true;
                } else {
                        return false;
                }
        };
        map.get = function (id) {
                var key = map.getKey(id);
                if (map.value[key]) {
                        return map.value[key];
                }
                return null;
        };
        map.remove = function (id) {
                var key = map.getKey(id);
                if (map.contains(id)) {
                        map.value[key] = undefined;
                }
        };

        return map;
}
export function getDefaultHeader() {
        var header = {
                headers: {
                        'Content-Type': "application/json; charset=utf-8",
                }
        };
        return header;
}
export function generateHeader(command, receiverType, receiverUUID) {
        var header = {
                'Command': command,
                'SenderType': 'Web',
                'SenderUUID': Properties.UserUUID,
                'ReceiverType': receiverType,
                'ReceiverUUID': receiverUUID
        };
        return header;
}

export function enumAgentStatus(props) {

        switch (props) {
                case "eReadyToPublish":
                        return "배포 가능";
                case "ePublishing":
                        return "배포중";
                case "eStopPublish":
                        return "배포 중지";
                case "eDisconnected":
                        return "연결 끊김";
                case "eConnected":
                        return "연결됨";
        }
        return props;
}

export function toElipsisString(groups) {

        if (groups.length == 0)
                return groups;
        else if (groups.lastIndexOf(",") != -1)
                return groups.substring(0, groups.lastIndexOf(",")) + "...";
}

export function toMultipleString(list) {
        var string = "";
        if (list.length > 1) {
                string = list[0].name + " 외 " + (list.length - 1).toString() + "개";
        }
        else if (list.length == 1) {
                string = list[0].name;
        }
        return string;
}
export function enumAutomatorExcuteType(props) {
        switch (props) {
                case "eImmediatly":
                        return "즉시 실행";
                case "eSchedule":
                        return "예약 실행";
                case "eCondition":
                        return "상태";
        }
        return props;
}
export function enumAutomatorExcuteStatus(props) {
        switch (props) {
                case "eReady":
                        return "실행 준비";
                case "eRunning":
                        return "실행 중";
                case "eSuccess":
                        return "성공";
                case "eFail":
                        return "실패";
        }
        return props;
}

export function newButtonArea() {
        var button = {};
        button.list = [];
        ///데이터 타입, 라벨, 라벨 테이블 키, 액션
        button.put = function (submenu, title, type, label, list, callback, width) {
                var value = {
                        btnsubmenu: submenu,
                        btntitle: title,
                        btntype: type,
                        btnlabel: label,
                        labelList: list,
                        btncallback: callback,
                        btnwidth: width
                }
                button.list = button.list.concat(value);
        };
        button.contains = function (id) {
                var key = button.getKey(id);
                if (button.value[key]) {
                        return true;
                } else {
                        return false;
                }
        };
        button.get = function (id) {
                if (button.list[key]) {
                        return button.list[key];
                }
                return null;
        };
        button.remove = function (id) {
                if (button.contains(id)) {
                        button.list[id] = undefined;
                }
        };

        return button;
}


export function newTableArea() {
        var table = {};
        table.list = [];
        /// 데이터 타입, 데이터 넓이, 표시되는 라벨, 아이템 키, 파싱 함수, 콜백,표시여부
        table.put = function (type, width, label, key, parser, callback, visible) {
                var value = {
                        tabletype: type,//title, content
                        tablewidth: width,
                        tablelabel: label,
                        tablekey: key,
                        valueparser: parser,
                        btncallback: callback,
                        visibility: visible
                }
                table.list = table.list.concat(value);
        };
        table.setVisibility = function (key, visible) {
                for (var i = 0; i < table.list.length; i++) {
                        if (table.list[i].tablekey == key) {
                                table.list[i].visibility = visible;
                                break;
                        }
                }
        };
        table.contains = function (id) {
                var key = button.getKey(id);
                if (button.value[key]) {
                        return true;
                } else {
                        return false;
                }
        };
        table.get = function (id) {
                if (table.list[key]) {
                        return table.list[key];
                }
                return null;
        };
        table.remove = function (id) {
                if (table.contains(id)) {
                        table.list[id] = undefined;
                }
        };
        return table;
}
export function newAPICommand() {
        var api = {};

        ///데이터 타입, 라벨, 라벨 테이블 키, 콜백
        ///key, command, header, body, callback, listKey
        api.put = function (key, command, header, body, callback, listKey) {
                api = {
                        apikey: key,
                        apicommand: command,
                        apiheader: header,
                        apibody: body,
                        apicallback: callback,
                        apilistkey: listKey,
                }
        };

        api.get = function (id) {
                if (api[id]) {
                        return api[id];
                }
                return null;
        };
        return api;
}
export function newPopupInfo() {
        var item = {};
        item.list = [];
        item.put = function (type, submenu, label, content, action, img) {
                var value = {
                        popuptype: type,
                        popupsubmenu: submenu,
                        popuplabel: label,
                        popupcontent: content,
                        popupaction: action,
                        popupimg: img
                }
                item.list = item.list.concat(value);
        };

        item.get = function (id) {
                if (item.list[id]) {
                        return item.list[id];
                }
                return null;
        };
        return item;
}

export function GetReportList() {
        var table = {};
        table.list = [];
        /// 데이터 타입, 데이터 넓이, 표시되는 라벨, 아이템 키, 파싱 함수, 콜백,표시여부
        table.put = function (key, check) {
                var value = {
                        ColumnKey: key,
                        ColumnChecked: check
                }
                table.list = table.list.concat(value);
        };
        table.setCheck = function (key, check) {
                for (var i = 0; i < table.list.length; i++) {
                        if (table.list[i].ColumnKey == key) {
                                table.list[i].ColumnChecked = check;
                                break;
                        }
                }

        };
        table.getCheck = function (key) {
                for (var i = 0; i < table.list.length; i++) {
                        if (table.list[i].ColumnKey == key) {
                                return table.list[i].ColumnChecked;
                        }
                }
                return null;
        };
        table.remove = function (id) {
                if (table.contains(id)) {
                        table.list[id] = undefined;
                }
        };
        return table;
}
export function pxtopercent(width) {
        var rootWidth = 1500.0;
        var pwidth = parseFloat(width) / rootWidth * 100.0;
        return pwidth + "%";
}