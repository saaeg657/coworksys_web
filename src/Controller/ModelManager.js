import * as properties from '../Properties.js';
import * as util from '../Util/Util.js';
import APIManager from './APIManager.js';
import * as CommonData from '../InformationData/CommonData.js';

class ModelManager {
    constructor(props) {
        this.GetTableInfo = this.GetTableInfo.bind(this);
        this.GetCommandInfo = this.GetCommandInfo.bind(this);
        this.GetAPICommand = this.GetAPICommand.bind(this);
    }

    /**
     * newTableArea:
     * 데이터 타입, 데이터 넓이, 표시되는 라벨, 아이템 키, 파싱 함수, API콜백
    */
    GetTableInfo(submenu) {
        var newTable = {};
        switch (submenu) {
            //장치
            case "device_device":
                newTable = util.newTableArea();
                newTable.put("title", 207, "장치 이름", ["name"], null, "device_detail", true);
                newTable.put("title", 171, "IP Address", ["ipAddress"], null, null, true);
                newTable.put("title", 155, "ID", ["currentUser"], util.enumStatus, null, true);
                newTable.put("title", 171, "OS Version", ["osVersion"], null, null, true);
                newTable.put("title", 166, "조직", ["deviceGroupName"], null, null, true);
                newTable.put("title", 193, "Agent 상태", ["agentStatus"], util.enumAgentStatus, null, true);
                newTable.put("title", 133, "Agent Version", ["agentVersion"], null, null, true);
                return newTable;
            case "device_group":
                newTable = util.newTableArea();
                newTable.put("title", 200, "조직 이름", ["name"], null, "modifydevicegroup", true);
                newTable.put("title", 170, "ID", ["id"], null, null, true);
                newTable.put("title", 170, "상태", ["deviceGroupType"], util.enumDeviceType, null, true);
                return newTable;

            //오토메이터
            case "automator":
                newTable = util.newTableArea();
                newTable.put("title", 207, "오토메이터", ["name"], null, "automator", true);
                newTable.put("title", 170, "만든이", ["id"], null, null, true);
                newTable.put("title", 116, "특성", [], null, null, true);
                newTable.put("title", 150, "최종 수정일", [], null, null, true);
                return newTable;

            //보고서-소프트웨어
            case "report_software":
                newTable = util.newTableArea();
                newTable.put("title", 350, "소프트웨어 이름", ["name"], null, null, true);
                newTable.put("title", 200, "Version", ["version"], null, null, true);
                newTable.put("title", 150, "개발사", ["company"], util.enumStatus, null, true);
                newTable.put("title", 150, "설치개수", ["count"], null, null, true);
                return newTable;
            //보고서-하드웨어
            case "report_hardware":
                newTable = util.newTableArea();
                newTable.put("title", 207, "장치 이름", ["name"], null, null, true);
                newTable.put("title", 133, "운영체제", ["osType"], null, null, false);
                newTable.put("title", 171, "IP Address", ["ipAddress"], null, null, true);
                newTable.put("title", 155, "ID", ["currentUser"], util.enumStatus, null, true);
                newTable.put("title", 171, "OS Version", ["osVersion"], null, null, true);
                newTable.put("title", 166, "조직", ["deviceGroupName"], null, null, true);
                newTable.put("title", 193, "Agent 상태", ["agentStatus"], util.enumAgentStatus, null, true);
                newTable.put("title", 133, "Agent Version", ["agentVersion"], null, null, true);
                newTable.put("title", 133, "시리얼 번호", ["serialNumber"], null, null, false);
                newTable.put("title", 133, "MAC Address", ["macAddress"], null, null, false);
                newTable.put("title", 133, "프로세서", ["processor"], null, null, false);
                newTable.put("title", 133, "메모리", ["memory"], null, null, false);
                newTable.put("title", 133, "그래픽카드", ["graphicsCard"], null, null, false);
                newTable.put("title", 133, "네트워크 형식", ["networType"], null, null, false);
                newTable.put("title", 133, "유선 네트워크 어댑터", ["wiredNetworkAdapter"], null, null, false);
                newTable.put("title", 133, "무선 네트어크 어댑터", ["wiressNetworkAdapter"], null, null, false);
                return newTable;
            //삭제된 항목
            case "deleted":
                newTable = util.newTableArea();
                newTable.put("title", 165, "사용자 / 조직", ["firstName", "lastName"], null, null, true);
                newTable.put("title", 135, "삭제된 날짜", ["aliveModifiedTime"], util.toDateStringYMD_Kor, null, true);
                newTable.put("title", 85, "종류", ["networkType"], util.enumNetworkType, null, true);
                return newTable;

            //설정
            case "setting_user":
                newTable = util.newTableArea();
                newTable.put("title", 207, "사용자 이름", ["firstName", "lastName"], null, "add_user", true);
                newTable.put("title", 173, "사용자 계정", ["userName"], null, null, true);
                newTable.put("title", 105, "상태", ["status"], util.enumStatus, null, true);
                newTable.put("title", 105, "조직", ["userGroupName"], null, null, true);
                return newTable;
            case "setting_group":
                newTable = util.newTableArea();
                newTable.put("title", 207, "조직 이름", ["name"], null, "add_user_group", true);
                newTable.put("title", 170, "ID", ["id"], null, null, true);
                newTable.put("title", 100, "권한", ["permission"], util.decodePermission, null, true);
                return newTable;
            case "setting_agent":
                newTable = util.newTableArea();
                newTable.put("title", 207, "에이전트 이름", ["name"], null, null, true);
                newTable.put("title", 173, "제작일", ["modifiedTime"], util.toDateString, null, true);
                newTable.put("title", 200, "제작자", [], null, null, true);
                newTable.put("title", 180, "Version", [], null, null, true);
                newTable.put("title", 140, "Agent ID", ["id"], null, null, true);
                newTable.put("title", 170, "상태", ["status"], util.enumAgentStatus, null, true);
                return newTable;

        }
        return null;
    }

    GetPopupContentInfo(popuptype) {
        var newTable = {};
        switch (popuptype) {
            case "addtogroup_device":
                newTable = util.newTableArea();
                newTable.put("title", 129, "조직 이름", ["name"], null, null);
                newTable.put("title", 75, "GID", ["id"], null, null);
                newTable.put("title", 150, "설명", ["note"], null, null);
                return newTable;
            case "adddevicegroup":
                newTable = util.newTableArea();
                newTable.put("title", 180, "장치 이름", ["name"], null, null);
                newTable.put("title", 120, "OS", ["osVersion"], null, null);
                return newTable;
            case "adddevice_togroup":
                newTable = util.newTableArea();
                newTable.put("title", 180, "장치 이름", ["name"], null, null);
                newTable.put("title", 120, "OS", ["osVersion"], null, null);
                return newTable;
            case "addautomator_togroup":
                newTable = util.newTableArea();
                newTable.put("title", 180, "조직 이름 ", ["name"], null, null);
                newTable.put("title", 120, "지원 OS", ["osType"], util.enumOSType, null);
                return newTable;
            case "addtogroup":
                newTable = util.newTableArea();
                newTable.put("title", 180, "조직 이름 ", ["name"], null, null);
                newTable.put("title", 120, "형태", ["networkType"], util.enumNetworkType, null);
                newTable.put("title", 120, "권한", ["permission"], util.decodePermission, null);
                return newTable;
            case "adduser_togroup":
                newTable = util.newTableArea();
                newTable.put("title", 180, "사용자 이름", ["userName"], null, null);
                newTable.put("title", 120, "종류", ["networkType"], util.enumNetworkType, null);
                return newTable;
            case "autoinstall_automator":
                newTable = util.newTableArea();
                newTable.put("title", 180, "오토메이터", ["name"], null, null);
                newTable.put("title", 120, "OS", ["osType"], util.enumOSType, null);
                newTable.put("title", 150, "설명", ["note"], null, null);
                return newTable;
            case "autoinstall_group":
                newTable = util.newTableArea();
                newTable.put("title", 180, "장치 조직", ["name"], null, null);
                newTable.put("title", 120, "OS", ["deviceAdvancedOption"], util.enumOSType, null);
                newTable.put("title", 150, "설명", ["note"], null, null);
                return newTable;
        }
        return null;
    }

    /**
    * newTableArea:
    * 데이터 타입, 표시되는 라벨, 아이템 키, API콜백
    */
    GetCommandInfo(submenu) {
        var newBtn = util.newButtonArea();

        switch (submenu) {
            case "device_device":
                newBtn = util.newButtonArea();
                newBtn.put("device_device", "장치", "button", "동기화", null, "device_sync", 60);
                //newBtn.put("device_device", "로컬 유저", "category", "모든 장비", ['모든 장비', '관리 장비', '비관리 장비', '자산 장비'], null, null);
                //newBtn.put("device_device", "로컬 유저", "category", "장치 조직", ['장치 조직'], null, null);
                return newBtn;
            case "device_group":
                newBtn = util.newButtonArea();
                newBtn.put("device_group", "장치 조직", "button", "조직 추가하기", null, "adddevicegroup", 100);
                newBtn.put("device_group", "로컬 유저", "category", "모든 장비", ['모든 장비', '관리 장비', '비관리 장비', '자산 장비'], null, null);
                return newBtn;

            case "automator":
                newBtn = util.newButtonArea();
                newBtn.put("automator", "오토메이터", "button", "오토메이터 만들기", null, "addautomator", 120);
                //newBtn.put("automator", "오토메이터", "button", "조직 추가하기", null, "add_automator_group"), 100;
                newBtn.put("automator", "오토메이터", "category", "모든 OS", ['모든 OS', 'Windows 전용', 'MAC 전용', '미분류'], null, null);
                //newBtn.put("automator", "오토메이터", "category", "모든 장비", ['모든 장비', '관리 장비', '비관리 장비', '자산 장비'], null, null);
                return newBtn;

            case "report_software":
                newBtn = util.newButtonArea();
                newBtn.put("report_hardware", "보고서", "button", "PDF", null, "pdf", 60);
                //newBtn.put("report_report1", "오토메이터", "button", "아이콘", null, "", 80);
                //newBtn.put("report_software", "보고서", "category", "모든 사용자", ['모든 사용자', '전원 관리자', '원격 화면 공유 관리자', '원격제어 관리자', '오토메이터', '고급 오토메이터', '자산 정보 관리자', '비밀번호 관리자'], null, null);
                return newBtn;
            case "report_hardware":
                newBtn = util.newButtonArea();
                newBtn.put("report_hardware", "보고서", "button", "PDF", null, "pdf", 60);
                newBtn.put("report_hardware", "보고서", "category", "모든 장비", ['모든 장비', '관리 장비', '비관리 장비', '자산 장비'], null, null);
                return newBtn;
            case "setting_user":
                newBtn = util.newButtonArea();
                newBtn.put("setting_user", "사용자", "button", "사용자 추가하기", null, "add_user", 120);
                newBtn.put("setting_user", "사용자", "category", "모든 사용자", ['모든 사용자', '전원 관리자', '원격 화면 공유 관리자', '원격제어 관리자', '오토메이터', '고급 오토메이터', '자산 정보 관리자', '비밀번호 관리자'], null, null);
                return newBtn;
            case "setting_group":
                newBtn = util.newButtonArea();
                newBtn.put("setting_group", "조직", "button", "조직 추가하기", null, "add_user_group", 120);
                newBtn.put("setting_group", "조직", "category", "모든 사용자", ['모든 사용자', '전원 관리자', '원격 화면 공유 관리자', '원격제어 관리자', '오토메이터', '고급 오토메이터', '자산 정보 관리자', '비밀번호 관리자'], null, null);
                return newBtn;
            case "setting_agent":
                newBtn = util.newButtonArea();
                newBtn.put("setting_agent", "에이전트", "button", "동기화", null, "agent_sync", 80);
                newBtn.put("setting_agent", "에이전트", "button", "새 에이전트 만들기", null, "add_agent_group", 132);
                newBtn.put("setting_agent", "에이전트", "category", "모든 에이전트", ['모든 에이전트', '배포 가능', '배포 중지', '배포 중'], null, null);
                return newBtn;

            case "deleted":
                newBtn.put("deleted", "삭제된 목록", "button", "복구", null, "restore", 60);
                newBtn.put("deleted", "삭제된 목록", "button", "삭제", null, "remove", 60);
                newBtn.put("setting_agent", "에이전트", "category", "사용자", ['사용자', '장치 조직', '사용자 조직', '에이전트', '오토메이터'], null, null);
                return newBtn;
            case "software":
                newBtn.put("device_device", "장치", "category", "All Software", ['All Software', '장치 조직', '사용자', '사용자 조직', '에이전트', '오토메이터'], null, null);
                return newBtn;
        }
        return null;
    }

    GetAPICommand(submenu) {
        var newAPI = util.newAPICommand();
        switch (submenu) {
            case "device_device":
                newAPI.put(
                    "/coworksys",
                    "/api/device/get/list",
                    util.getDefaultHeader(),
                    {
                        "startIndex": 0,
                        "count": 300,
                        "deviceGroupID": -1,
                        "deviceGroupType": "eAll",
                        "alive": "eAlive",
                        "sort": "",
                        "search": ""
                    },
                    null,
                    "deviceList");
                break;
            case "device_group":
                newAPI.put(
                    "/coworksys",
                    "/api/deviceGroup/get/list",
                    util.getDefaultHeader(),
                    {
                        "startIndex": 0,
                        "count": 300,
                        "deviceGroupType": "eAll",
                        "alive": "eAlive",
                        "sort": "",
                        "search": ""
                    },
                    null,
                    "deviceGroupList");
                break;

            case "automator":
                newAPI.put(
                    "/coworksys",
                    "/api/automator/get/list",
                    util.getDefaultHeader(),
                    {
                        "osType": "eAll",
                        "isGroup": true,
                        "alive": "eAlive"
                    },
                    null,
                    "automatorGroupList");
                break;

            case "report_software":
                newAPI.put(
                    "/coworksys",
                    "/api/report/swsummary",
                    util.getDefaultHeader(),
                    {
                    },
                    null,
                    "swSummaryList");
                break;
            case "report_hardware":
                newAPI.put(
                    "/coworksys",
                    "/api/device/get/list",
                    util.getDefaultHeader(),
                    {
                        "startIndex": 0,
                        "count": 300,
                        "deviceGroupID": -1,
                        "deviceGroupType": "eAll",
                        "alive": "eAlive"
                    },
                    null,
                    "deviceList");
                break;
            case "setting_general":
                newAPI.put(
                    null,
                    null,
                    null,
                    null,
                    null,
                    null);
                break;

            case "setting_user":
                newAPI.put(
                    "/coworksys",
                    "/api/user/get/list",
                    util.getDefaultHeader(),
                    {
                        "startIndex": 0,
                        "count": 300,
                        "status": "eActive",
                        "permission": -1,
                        "alive": "eAlive",
                        "sort": "",
                        "search": ""
                    },
                    null,
                    "userList");
                break;

            case "setting_group":
                newAPI.put(
                    "/coworksys", "/api/userGroup/get/list", util.getDefaultHeader(),
                    {
                        "startIndex": 0,
                        "count": 300,
                        "permission": -1,
                        "alive": "eAlive",
                        "sort": "",
                        "search": ""
                    },
                    null,
                    "userGroupList");
                break;

            case "setting_agent":
                newAPI.put(
                    "/coworksys", "/api/agentGroup/get/list", util.getDefaultHeader(),
                    {
                        "status": "eAllAgent",
                        "alive": "eAlive"
                    },
                    null,
                    "agentGroupList");
                break;

            case "deleted":
                newAPI.put(
                    "/coworksys", "/api/user/get/list", util.getDefaultHeader(),
                    {
                        "startIndex": 0,
                        "count": 300,
                        "status": "eActive",
                        "permission": -1,
                        "alive": "eRemove",
                        "sort": "",
                        "search": ""
                    },
                    null,
                    "userList");
                break;

            //팝업
            case "addusertogroup":
                newAPI.put(
                    "/coworksys", "/api/user/insert/group", util.getDefaultHeader(),
                    {
                        "groupID": 0,
                        "count": 300,
                        "status": "eActive",
                        "permission": -1,
                        "alive": "eRemove"
                    },
                    null,
                    "userList");
                break;
            case "getuserfromgroup":
                newAPI.put(
                    "/coworksys", "/api/userGroup/get/userList", util.getDefaultHeader(),
                    {
                        "startIndex": 0,
                        "count": 300,
                        "groupID": CommonData.selectedDevice != null ? CommonData.selectedDevice.id : -1
                    },
                    null,
                    "userList");
                break;
            case "getdevicefromgroup":
                newAPI.put(
                    "/coworksys", "/api/device/get/list", util.getDefaultHeader(),
                    {
                        "startIndex": 0,
                        "count": 300,
                        "deviceGroupID": CommonData.selectedDevice != null ? CommonData.selectedDevice.id : -1,
                        "deviceGroupType": "eAll",
                        "alive": "eAlive"
                    },
                    null,
                    "deviceList");
                break;
            case "selectautomator":
                newAPI.put(
                    "/coworksys", "/api/automator/get/list", util.getDefaultHeader(),
                    {
                        "osType": "eAll",
                        "isGroup": false,
                        "alive": "eAlive"
                    },
                    null,
                    "automatorList");
                break;
            case "login":
                newAPI.put(
                    "/coworksys", "/api/user/login", util.getDefaultHeader(),
                    null,
                    null,
                    "user");
                break;
            case "vnc":
                newAPI.put(
                    "/coworksys", "/api/vnc/control", util.getDefaultHeader(),
                    null,
                    null,
                    null);
                break;


        }
        return newAPI;
    }

    ///type, submenu,label,content,action,img
    GetPopupInfo(type, submenu) {
        var newItem = util.newPopupInfo();
        switch (type) {
            case "bulkaction":
                switch (submenu) {
                    case "device_device":
                        newItem.put("bulkaction", submenu, "조직에 추가하기", "device_group", "addtogroup_device", "addtogroup");
                        newItem.put("bulkaction", submenu, "장치 삭제하기", null, "delete_device", "delete");
                        newItem.put("bulkaction", submenu, "메세지 보내기", null, "sendmessage", "sendmessage");
                        newItem.put("bulkaction", submenu, "제어", null, "control", "control");
                        //newItem.put("bulkaction", submenu, "원격 화면 공유", null, "remoteshare", "remoteshare");
                        //newItem.put("bulkaction", submenu, "원격 화면 제어", null, "remotecontrol", "remotecontrol");
                        break;
                    case "device_group":
                        newItem.put("bulkaction", submenu, "구성원 추가하기", "device_device", "adddevice_togroup", "addtogroup");
                        newItem.put("bulkaction", submenu, "설명 변경하기", null, "changenote", "note");
                        newItem.put("bulkaction", submenu, "조직 삭제하기", null, "delete_group", "deletegroup");
                        break;
                    case "automator":
                        newItem.put("bulkaction", submenu, "조직에 추가하기", "automator", "addautomator_togroup", "addtogroup");
                        newItem.put("bulkaction", submenu, "패키지 만들기", null, "makepackage", "package");
                        newItem.put("bulkaction", submenu, "즐겨찾기에 추가", null, "addtofavorite", "favorite");
                        newItem.put("bulkaction", submenu, "삭제하기", null, "delete_automator", "delete");
                        break;
                    case "setting_user":
                        newItem.put("bulkaction", submenu, "조직에 추가하기", "setting_group", "addtogroup", "addtogroup");
                        newItem.put("bulkaction", submenu, "비밀번호 변경하기", null, "changepassword", "password");
                        newItem.put("bulkaction", submenu, "삭제하기", null, "delete", "delete");
                        newItem.put("bulkaction", submenu, "사용 가능 / 불가능", null, "activate", "activation");
                        newItem.put("bulkaction", submenu, "설명 변경하기", null, "changenote", "note");
                        break;
                    case "setting_group":
                        newItem.put("bulkaction", submenu, "구성원 추가하기", "setting_user", "adduser_togroup", "addtogroup");
                        newItem.put("bulkaction", submenu, "권한 부여하기", null, "changepermission", "permissionicon");
                        newItem.put("bulkaction", submenu, "설명 변경하기", null, "changenote", "note");
                        newItem.put("bulkaction", submenu, "조직 삭제하기", null, "delete_usergroup", "deletegroup");
                        break;
                    case "setting_agent":
                        newItem.put("bulkaction", submenu, "배포 시작 / 배포 중지", "setting_group", "publish", "publish");
                        newItem.put("bulkaction", submenu, "삭제하기", null, "delete_agent", "delete");
                        newItem.put("bulkaction", submenu, "업데이트", null, "update", "update");
                        newItem.put("bulkaction", submenu, "보안 키 변경하기", null, "changesecurity", "changesecurity");
                        newItem.put("bulkaction", submenu, "설정하기", null, "setting", "setting");
                        break;
                }
                break;
            case "adddevicegroup":
                newItem.put("adddevicegroup", submenu, null, null, null, null);
                break;
            case "modifydevicegroup":
                newItem.put("modifydevicegroup", submenu, null, null, null, null);
                break;
            case "add_user":
                newItem.put("add_user", submenu, null, null, null, null);
                break;
            case "add_user_group":
                newItem.put("add_user_group", submenu, null, null, null, null);
                break;
            case "user_detail":
                newItem.put("user_detail", submenu, null, null, null, null);
                break;
            case "user_group_detail":
                newItem.put("user_detail", submenu, null, null, null, null);
                break;
            case "add_automator_group":
                newItem.put("add_automator_group", submenu, null, null, null, null);
                break;
            case "add_agent_group":
                newItem.put("add_agent_group", submenu, null, null, null, null);
                break;
            case "device_detail":
                newItem.put("device_detail", submenu, null, null, null, null);
                break;
            case "device_group_detail":
                newItem.put("device_group_detail", submenu, null, null, null, null);
                break;
        }
        return newItem;
    }
}
export default (new ModelManager)