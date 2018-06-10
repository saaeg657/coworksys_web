import React from 'react';
import * as util from '../../../../Util/Util.js';
import * as CommonData from '../../../../InformationData/CommonData.js';
import DatePicker from 'react-datepicker';
import Moment from 'moment';
import Dropdown from 'react-dropdown';
import APIManager from '../../../../Controller/APIManager.js';

export default class AdvancedRun extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isShow: false,
            selectedtab: 0,
            useMonth: false,
            useWeek: false,
            useDay: false,
            useStartFrom: false,
            useRepeatUntil: false,
            time_hh: "",
            time_mm: "",
            time_ss: "",
            startFrom_hh: "",
            startFrom_mm: "",
            startFrom_ss: "",
            repeatUntil_hh: "",
            repeatUntil_mm: "",
            repeatUntil_ss: "",
            interval: "",
            repeatCount: "",
            Month: "",
            Week: "",
            Day: "",
            failed_Agent: "",
            failed_Automating: "",
            repeatType: "",
            intervalType: "",
            startDate: null,
            startDateText: "",
            repeatUntill: null,
            repeatUntillText: ""
        };
        require('react-datepicker/dist/react-datepicker.css');
        require('react-datepicker/dist/react-datepicker-cssmodules.css');
        this.handleChangeDate = this.handleChangeDate.bind(this);
        this.show = this.show.bind(this);
        this.close = this.close.bind(this);
        this.switchtocondition = this.switchtocondition.bind(this);
        this.switchtoschedule = this.switchtoschedule.bind(this);
        this.comboboxChange = this.comboboxChange.bind(this);
        this.calender = this.calender.bind(this);

        var today = new Date();
        var lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);

        this.onChange = this.onChange.bind(this);
        this.onChangeText = this.onChangeText.bind(this);
        this.run = this.run.bind(this);
        this.showMSG = this.showMSG.bind(this);
        this.responseAPICallback = this.responseAPICallback.bind(this);
    }
    responseAPICallback(response, key) {
        console.log("responseAPICallback-advanced run", response, key);
    }
    show(visible) {
        this.setState({ isShow: visible });
    }
    handleChangeDate(id, date) {
        var selectedDate = new Date(date);

        if (id == "startdate") {
            this.setState({
                startDate: date,
                startDateText: util.toDateStringHHmmss(selectedDate.getTime())
            });

        }
        else if (id == "repeatuntill") {
            this.setState({
                repeatUntill: date,
                repeatUntillText: util.toDateStringHHmmss(selectedDate.getTime())
            });
        }
    }
    run() {
        if (CommonData.selectedAutomator == undefined ||
            this.state.time_hh.length == 0 ||
            this.state.time_mm.length == 0 ||
            this.state.time_ss.length == 0) {
            alert("Time의 시,분,초를 입력해주세요.");
            return;
        }

        if (CommonData.addItemList.length == 0) {
            alert("적어도 하나 이상의 디바이스를 선택해야합니다.");
            return;
        }

        var today = new Date();
        var startTime = undefined;
        var endTime = undefined;
        var Time = "";

        ///시작시간
        if (this.state.useStartFrom == true) {
            var date = new Date(this.state.startDate);
            date.setHours(this.state.startFrom_hh);
            date.setMinutes(this.state.startFrom_mm);
            date.setSeconds(this.state.startFrom_ss);
            startTime = date.getTime();
        }
        else {
            startTime = undefined;
        }

        ///종료시간
        if (this.state.useRepeatUntil == true) {
            var date = new Date(this.state.repeatUntillDate);
            date.setHours(this.state.repeatUntil_hh);
            date.setMinutes(this.state.repeatUntil_mm);
            date.setSeconds(this.state.repeatUntil_ss);
            endTime = date.getTime();
        }
        else {
            endTime = undefined;
        }

        ///필수로 입력되는 시간
        Time = ("0" + this.state.time_hh).slice(-2) + ":" +
            ("0" + this.state.time_mm).slice(-2) + ":" +
            ("0" + this.state.time_ss).slice(-2);

        var month = this.state.Month;
        var week = this.state.Week;
        var day = this.state.Day;

        /// 날짜 콤보 처리방법 논의해야함
        if (this.state.useMonth) {
            switch (month) {
                case "매월":
                    month = "EveryMonth";
                    break;
                case "홀수 월":
                    month = "odd";
                    break;
                case "짝수 월":
                    month = "even";
                    break;
                default:
                    if (month.length == 0)
                        month = "EveryMonth"
                    else
                        month = month.replace("월", "");
                    break;
            }
        }
        else
            month = -1;
        if (this.state.useWeek) {
            switch (week) {
                case "매주":
                    week = "EveryWeek";
                    break;
                case "홀수 주":
                    week = "oddWeek";
                    break;
                case "짝수 주":
                    week = "eventWeek";
                    break;
                default:
                    if (week.length == 0)
                        week = "EveryWeek";
                    else {
                        week = week.replace("매월 ", "");
                        week = week.replace("주", "");
                    }
                    break;
            }
        }
        else
            week = -1;
        if (this.state.useDay) {
            switch (day) {
                case "매일":
                    day = "EveryDay";
                    break;
                case "매주 일요일":
                    day = "SUN";
                    break;
                case "매주 월요일":
                    day = "MON";
                    break;
                case "매주 화요일":
                    day = "TUE";
                    break;
                case "매주 수요일":
                    day = "WED";
                    break;
                case "매주 목요일":
                    day = "THU";
                    break;
                case "매주 금요일":
                    day = "FRI";
                    break;
                case "매주 토요일":
                    day = "SAT";
                    break;
                default:
                    if (day.length == 0)
                        day = "EveryDay";
                    else
                        day = day.replace("일", "");
                    break;
            }
        }
        else
            day = -1;

        var failed_agent = false;
        switch (this.state.failed_Agent) {
            case "중지":
                failed_agent = false;
                break;
            case "재시작":
                failed_agent = true;
                break;
            default:
                failed_agent = false;
                break;
        }
        var failed_automator = false;
        switch (this.state.failed_Automating) {
            case "중지":
                failed_automator = false;
                break;
            case "재시작":
                failed_automator = true;
                break;
            default:
                failed_automator = false;
                break;
        }
        var newAPI = util.newAPICommand();
        newAPI.put(
            "/coworksys", "/api/automatorschedule/insert", util.getDefaultHeader(),
            {
                "scheduleType": "eSchedule",
                "automatorID": CommonData.selectedAutomator.id,
                "startTime": startTime,
                "endTime": endTime,
                "month": month,
                "week": week,
                "day": day,
                "time": Time,
                "deviceIDList": CommonData.targetDevices,
                "retryByAgentStatus": failed_agent,
                "retryByAutomating": failed_automator
            },
            null,
            null);

        APIManager.requestAPI(
            newAPI.get("apikey"),
            newAPI.get("apicommand"),
            newAPI.get("apiheader"),
            newAPI.get("apibody"),
            this.responseAPICallback,
            newAPI.get("apilistkey"));
        alert("오토메이터가 스케줄에 추가되었습니다.");

    }
    showMSG(Response, msg) {
        let { dispatch } = this.props;
        let action_msg = ShowMessageBox(true, Response.status == 200 ? true : false, msg, "Response");
        dispatch(action_msg);
    }

    close() {
        this.setState({ isShow: false });
    }
    switchtocondition() {
        this.setState({ selectedtab: 1 });
    }
    switchtoschedule() {
        this.setState({ selectedtab: 0 });
    }
    onChange(e) {
        if (e.target.id == "chkmonth")
            this.setState({ useMonth: e.target.checked });
        else if (e.target.id == "chkweek")
            this.setState({ useWeek: e.target.checked });
        else if (e.target.id == "chkday")
            this.setState({ useDay: e.target.checked });
        else if (e.target.id == "chkstartfrom")
            this.setState({ useStartFrom: e.target.checked });
        else if (e.target.id == "chkrepeatuntil")
            this.setState({ useRepeatUntil: e.target.checked });
        else
            return;

    }
    onChangeText(e) {
        if (e.target.id == "time_hh")
            this.setState({ time_hh: e.target.value });
        else if (e.target.id == "time_mm")
            this.setState({ time_mm: e.target.value });
        else if (e.target.id == "time_ss")
            this.setState({ time_ss: e.target.value });
        else if (e.target.id == "startfrom_hh")
            this.setState({ startFrom_hh: e.target.value });
        else if (e.target.id == "startfrom_mm")
            this.setState({ startFrom_mm: e.target.value });
        else if (e.target.id == "startfrom_ss")
            this.setState({ startFrom_ss: e.target.value });
        else if (e.target.id == "repeatuntil_hh")
            this.setState({ repeatUntil_hh: e.target.value });
        else if (e.target.id == "repeatuntil_mm")
            this.setState({ repeatUntil_mm: e.target.value });
        else if (e.target.id == "repeatuntil_ss")
            this.setState({ repeatUntil_ss: e.target.value });
        else if (e.target.id == "interval")
            this.setState({ interval: e.target.value });
        else if (e.target.id == "repeatcount")
            this.setState({ repeatCount: e.target.value });
        else
            return;
    }
    comboboxChange(id, e) {
        if (id == "month")
            this.setState({ Month: e.value });
        else if (id == "week")
            this.setState({ Week: e.value });
        else if (id == "day")
            this.setState({ Day: e.value });
        else if (id == "failed_agent")
            this.setState({ failed_Agent: e.value });
        else if (id == "failed_automating")
            this.setState({ failed_Automating: e.value });
        else if (id == "intervaltype")
            this.setState({ intervalType: e.value });
        else
            return;
    }

    calender() {

    }
    render() {

        let html_schedule =
            <div style={{ height: "950px" }}>
                <div className="div-block-18">
                    <div className="tabs-menu w-tab-menu">
                        <a className="tab-link w--current w-inline-block w-tab-link">
                            <div >일정</div>
                        </a>
                        <a className="tab-link-2 w-inline-block w-tab-link" onClick={this.switchtocondition}>
                            <div>조건</div>
                        </a>
                    </div>

                </div>
                <div className="w--tab-active w-tab-pane" data-w-tab="Tab 1">
                    <div className="div-advanced-schedule" style={{ marginTop: 21 }}>
                        <form data-name="Email Form 2" id="email-form-2" name="email-form-2">
                            <div className="div-advancedrun-time">
                                <div className="checkbox-field-2 w-checkbox">
                                    <input className="checkbox-item w-checkbox-input" id="chkmonth" onChange={this.onChange} type="checkbox" style={{ marginRight: "10px" }} />
                                    <label className="field-label w-form-label" htmlFor="node-3" />
                                </div>

                                <div className="div-advancedrun-time-title">
                                    <div>Month</div>
                                </div>
                                <div className="div-advancedrun-time-combo" style={{ width: "180px" }}>
                                    <div >
                                        <Dropdown className="button-delete-user"
                                            options={[
                                                '매월', '홀수 월', '짝수 월',
                                                '1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'
                                            ]}
                                            value={this.state.Month}
                                            onChange={this.comboboxChange.bind(this, "month")}
                                            placeholder="Month" />
                                    </div>
                                </div>
                            </div>
                            <div className="div-advancedrun-time">
                                <div className="checkbox-field-2 w-checkbox">
                                    <input className="checkbox-item w-checkbox-input" id="chkweek" onChange={this.onChange} type="checkbox" style={{ marginRight: "10px" }} />
                                    <label className="field-label w-form-label" htmlFor="node-3" />
                                </div>
                                <div className="div-advancedrun-time-title">
                                    <div>Week</div>
                                </div>
                                <div className="div-advancedrun-time-combo" style={{ width: "180px" }}>
                                    <div> <Dropdown className="button-delete-user"
                                        options={['매주', '짝수 주', '홀수 주', '매월 1주'
                                            , '매월 2주', '매월 3주', '매월 4주', '매월 5주'
                                        ]}
                                        value={this.state.Week}
                                        onChange={this.comboboxChange.bind(this, "week")}
                                        placeholder="Week" /></div>
                                </div>
                            </div>

                            <div className="div-advancedrun-time">
                                <div className="checkbox-field-2 w-checkbox">
                                    <input className="checkbox-item w-checkbox-input" id="chkday" onChange={this.onChange} type="checkbox" style={{ marginRight: "10px" }} />
                                    <label className="field-label w-form-label" htmlFor="node-3" />
                                </div>
                                <div className="div-advancedrun-time-title">
                                    <div>Day</div>
                                </div>
                                <div className="div-advancedrun-time-combo" style={{ width: "180px" }}>
                                    <div> <Dropdown className="button-delete-user"
                                        options={['매일', '매주 월요일', '매주 화요일', '매주 수요일', '매주 목요일', '매주 금요일', '매주 토요일', '매주 일요일',
                                            '1일', '2일', '3일', '4일', '5일', '6일', '7일', '8일', '9일',
                                            '10일', '11일', '12일', '13일', '14일', '15일', '16일', '17일', '18일', '19일',
                                            '20일', '21일', '22일', '23일', '24일', '25일', '26일', '27일', '28일', '29일', '30일', '31일'
                                        ]}
                                        value={this.state.Day}
                                        onChange={this.comboboxChange.bind(this, "day")}
                                        placeholder="Day" /></div>
                                </div>
                            </div>
                            <div className="div-advancedrun-time">
                                <div className="div-advancedrun-time-title" style={{ marginLeft: "25px" }}>
                                    <div>Time</div>
                                </div>
                                <div className="div-advancedrun-date">
                                    <div className="form-block-3 w-form">
                                        <form data-name="Email Form" id="email-form" name="email-form">
                                            <input className="text-field-5 w-input" style={{ width: "50px", border: "1px solid #347dc2", maxHeight: "22px" }} min={0} max={23} data-name="Time" id="time_hh" onChange={this.onChangeText} maxLength={2} name="Number" placeholder="HH" /></form>
                                        <div className="w-form-done" />
                                        <div className="w-form-fail" />
                                    </div>
                                </div>
                                <div className="div-advancedrun-date">
                                    <div className="form-block-3 w-form">
                                        <form data-name="Email Form" id="email-form" name="email-form">
                                            <input className="text-field-5 w-input" style={{ width: "50px", border: "1px solid #347dc2", maxHeight: "22px" }} min={0} max={59} data-name="Time" id="time_mm" onChange={this.onChangeText} maxLength={2} name="Number" placeholder="MM" /></form>
                                        <div className="w-form-done" />
                                        <div className="w-form-fail" />
                                    </div>
                                </div>
                                <div className="div-advancedrun-date">
                                    <div className="form-block-3 w-form">
                                        <form data-name="Email Form" id="email-form" name="email-form">
                                            <input className="text-field-5 w-input" style={{ width: "50px", border: "1px solid #347dc2", maxHeight: "22px" }} min={0} max={59} data-name="Time" id="time_ss" onChange={this.onChangeText} maxLength={2} name="Number" placeholder="SS" /></form>
                                        <div className="w-form-done" />
                                        <div className="w-form-fail" />
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="div-advanced-schedule">
                        <div className="row-4 w-row">
                            <form data-name="Email Form 2" id="email-form-2" name="email-form-2">
                                <div className="w-col w-col-6">
                                    <div>
                                        <div className="checkbox-field-2 w-checkbox">
                                            <input className="checkbox-item w-checkbox-input" id="chkstartfrom" onChange={this.onChange} type="checkbox" style={{ marginRight: "10px" }} />특정 시간에 시작
                                            <label className="field-label w-form-label" htmlFor="node-3" />
                                        </div>
                                    </div>
                                    <div className="div-block-19">
                                        <div className="div-block-20">
                                            <div>Start at</div>
                                        </div>
                                        <div style={{ marginLeft: "7px" }}>
                                            <DatePicker
                                                placeholderText="YYYY/MM/DD"
                                                className="div-advancedrun-datepicker"
                                                value={this.state.startDateText}
                                                readOnly="true"
                                                disabledKeyboardNavigation
                                                dateFormat="YYYY/MM/DD"
                                                selected={this.state.startDate}
                                                onChange={this.handleChangeDate.bind(this, "startdate")} />
                                        </div>
                                    </div>
                                    <div className="div-block-19">
                                        <div style={{ marginLeft: "7px" }}>
                                            <div className="form-block-3 w-form">
                                                <form data-name="Email Form" id="email-form" name="email-form">
                                                    <input className="text-field-5 w-input" style={{ width: "50px", height: "22px", border: "1px solid #347dc2" }}
                                                        min={0} max={23} data-name="startfrom_hh" id="startfrom_hh" onChange={this.onChangeText} maxLength={2} name="Number" placeholder="HH" /></form>
                                                <div className="w-form-done" />
                                                <div className="w-form-fail" />
                                            </div>
                                        </div>
                                        <div className="div-advancedrun-date">
                                            <div className="form-block-3 w-form">
                                                <form data-name="Email Form" id="email-form" name="email-form">
                                                    <input className="text-field-5 w-input" style={{ width: "50px", height: "22px", border: "1px solid #347dc2" }} onChange={this.onChangeText} min={0} max={59} data-name="startfrom_mm" id="startfrom_mm" maxLength={2} name="Number" placeholder="MM" /></form>
                                                <div className="w-form-done" />
                                                <div className="w-form-fail" />
                                            </div>
                                        </div>
                                        <div className="div-advancedrun-date">
                                            <div className="form-block-3 w-form">
                                                <form data-name="Email Form" id="email-form" name="email-form">
                                                    <input className="text-field-5 w-input" style={{ width: "50px", height: "22px", border: "1px solid #347dc2" }} onChange={this.onChangeText} min={0} max={59} data-name="startfrom_ss" id="startfrom_ss" maxLength={2} name="Number" placeholder="SS" /></form>
                                                <div className="w-form-done" />
                                                <div className="w-form-fail" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-col w-col-6">
                                    <div>
                                        <div className="checkbox-field-2 w-checkbox">
                                            <input className="checkbox-item w-checkbox-input" id="chkrepeatuntil" onChange={this.onChange} type="checkbox" style={{ marginRight: "10px" }} />특정 시간까지 반복
                                            <label className="field-label w-form-label" htmlFor="node-3" />
                                        </div>
                                    </div>
                                    <div className="div-block-19" >
                                        <div className="div-block-20">
                                            <div>Start at</div>
                                        </div>
                                        <div style={{ marginLeft: "7px" }}>
                                            <DatePicker
                                                placeholderText="YYYY/MM/DD"
                                                className="div-advancedrun-datepicker"
                                                value={this.state.repeatUntillText}
                                                readOnly="true"
                                                disabledKeyboardNavigation
                                                dateFormat="YYYY/MM/DD"
                                                selected={this.state.repeatUntill}
                                                onChange={this.handleChangeDate.bind(this, "repeatuntill")} />
                                        </div>
                                    </div>
                                    <div className="div-block-19">

                                        <div style={{ marginLeft: "7px" }}>
                                            <div className="form-block-3 w-form">
                                                <form data-name="Email Form" id="email-form" name="email-form">
                                                    <input className="text-field-5 w-input" style={{ width: "50px", height: "22px", border: "1px solid #347dc2" }} onChange={this.onChangeText} min={0} max={23} data-name="Time" id="repeatuntil_hh" maxLength={2} name="Number" placeholder="HH" /></form>
                                                <div className="w-form-done" />
                                                <div className="w-form-fail" />
                                            </div>
                                        </div>
                                        <div className="div-advancedrun-date">
                                            <div className="form-block-3 w-form">
                                                <form data-name="Email Form" id="email-form" name="email-form">
                                                    <input className="text-field-5 w-input" style={{ width: "50px", height: "22px", border: "1px solid #347dc2" }} onChange={this.onChangeText} min={0} max={59} data-name="Time" id="repeatuntil_mm" maxLength={2} name="Number" placeholder="MM" /></form>
                                                <div className="w-form-done" />
                                                <div className="w-form-fail" />
                                            </div>
                                        </div>
                                        <div className="div-advancedrun-date">
                                            <div className="form-block-3 w-form">
                                                <form data-name="Email Form" id="email-form" name="email-form">
                                                    <input className="text-field-5 w-input" style={{ width: "50px", height: "22px", border: "1px solid #347dc2" }} onChange={this.onChangeText} min={0} max={59} data-name="Time" id="repeatuntil_ss" maxLength={2} name="Number" placeholder="SS" /></form>
                                                <div className="w-form-done" />
                                                <div className="w-form-fail" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="div-advanced-schedule">
                        <div className="div-block-21">
                            <div>에이전트와 통신이 불가능한 경우</div>
                        </div>
                        <div className="div-block-21" style={{ width: "180px" }}>
                            <div> <Dropdown className="button-delete-user"
                                options={['중지', '재시도']}
                                value={this.state.failed_Agent}
                                onChange={this.comboboxChange.bind(this, "failed_agent")}
                                placeholder="선택" /></div>
                        </div>

                        <div className="div-block-21">
                            <div>Automating이 실패했을경우</div>
                        </div>
                        <div className="div-block-21" style={{ width: "180px" }}>
                            <div> <Dropdown className="button-delete-user"
                                options={['중지', '재시도']}
                                value={this.state.failed_Automating}
                                onChange={this.comboboxChange.bind(this, "failed_automating")}
                                placeholder="선택" /></div>
                        </div>
                        <div className="div-block-21">
                            <div>분산 실행</div>
                        </div>
                        <div className="div-block-19" style={{ marginLeft: "20px" }}>
                            <form data-name="Email Form" id="email-form" name="email-form">
                                <input className="text-field-5 w-input" style={{ width: "60px", border: "1px solid #347dc2" }} min={0} max={59} data-name="Time" id="interval" onChange={this.onChangeText} maxLength={2} name="Number" placeholder="간격" /></form>
                            <div style={{ marginBottom: 14 }}>
                                <Dropdown className="button-delete-user"
                                    options={['시', '분']}
                                    value={this.state.intervalType}
                                    onChange={this.comboboxChange.bind(this, "intervaltype")}
                                    placeholder="분"
                                />
                            </div>
                            에
                                <form data-name="Email Form" id="email-form" name="email-form">
                                <input className="text-field-5 w-input" style={{ width: "60px", border: "1px solid #347dc2" }} min={0} max={59} data-name="Time" id="repeatcount" onChange={this.onChangeText} maxLength={2} name="Number" placeholder="행동" /> </form>
                            회 실행
                        </div>
                    </div>
                    <div className="div-block-11" style={{ top: 842 }}>
                        <div className="div-adduser-input" ><a href="#" onClick={this.run} className="button-adduser-summit w-button">실행</a></div>
                    </div>
                </div>
            </div >


        let html_condition =
            <div>
                <div className="div-block-18">
                    <div className="tabs-menu w-tab-menu">
                        <a className="tab-link w-inline-block w-tab-link" onClick={this.switchtoschedule}>
                            <div >일정</div>
                        </a>
                        <a className="tab-link-2 w--current w-inline-block w-tab-link">
                            <div>조건</div>
                        </a>
                    </div>

                </div>
                <div  >
                    <div className="div-advanced-schedule">
                        <div className="div-advancedrun-time">
                            <div className="div-advancedrun-time-title">
                                <div>Type</div>
                            </div>
                            <div className="div-advancedrun-time-combo" style={{ width: "180px" }}>
                                <div>
                                    <Dropdown className="button-delete-user"
                                        options={['Windows', 'OSX']}
                                        placeholder="OS" />
                                </div>
                            </div>
                        </div>
                        <div className="div-advancedrun-time">
                            <div className="div-advancedrun-time-title">
                                <div>Process</div>
                            </div>
                            <div className="div-advancedrun-time-combo" style={{ width: "180px" }}>
                                <div>
                                    <Dropdown className="button-delete-user"
                                        options={['Option1', 'Option2', 'Option3']}
                                        onChange={this.category}
                                        placeholder="Process" />
                                </div>
                            </div>
                        </div>
                        <div className="div-advancedrun-time">
                            <div className="div-advancedrun-time-title">
                                <div>Action</div>
                            </div>
                            <div className="div-advancedrun-time-combo" style={{ width: "180px" }}>
                                <div>
                                    <Dropdown className="button-delete-user"
                                        options={['Option1', 'Option2', 'Option3']}
                                        onChange={this.category}
                                        placeholder="Action" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="div-advanced-schedule">
                        <div className="row-4 w-row" style={{ paddingLeft: 0 }}>
                            <form data-name="Email Form 2" id="email-form-2" name="email-form-2">
                                <div className="w-col w-col-6">
                                    <div>
                                        <div className="checkbox-field-2 w-checkbox">
                                            <input className="checkbox-item w-checkbox-input" id="chkstartfrom" onChange={this.onChange} type="checkbox" style={{ marginRight: "10px" }} />특정 시간에 시작
                                            <label className="field-label w-form-label" htmlFor="node-3" />
                                        </div>
                                    </div>
                                    <div className="div-block-19">
                                        <div className="div-block-20">
                                            <div>Start at</div>
                                        </div>
                                        <div className="div-advancedrun-date">
                                            <div className="text-block-14" >YYYY/MM/DD</div>
                                        </div>
                                    </div>
                                    <div className="div-block-19">
                                        <div className="div-advancedrun-date">
                                            <div className="form-block-3 w-form">
                                                <form data-name="Email Form" id="email-form" name="email-form">
                                                    <input className="text-field-5 w-input" style={{ width: "50px" }}
                                                        min={0} max={23} data-name="startfrom_hh" id="startfrom_hh" onChange={this.onChangeText} maxLength={2} name="Number" placeholder="HH" /></form>
                                                <div className="w-form-done" />
                                                <div className="w-form-fail" />
                                            </div>
                                        </div>
                                        <div className="div-advancedrun-date">
                                            <div className="form-block-3 w-form">
                                                <form data-name="Email Form" id="email-form" name="email-form">
                                                    <input className="text-field-5 w-input" style={{ width: "50px" }} onChange={this.onChangeText} min={0} max={59} data-name="startfrom_mm" id="startfrom_mm" maxLength={2} name="Number" placeholder="MM" /></form>
                                                <div className="w-form-done" />
                                                <div className="w-form-fail" />
                                            </div>
                                        </div>
                                        <div className="div-advancedrun-date">
                                            <div className="form-block-3 w-form">
                                                <form data-name="Email Form" id="email-form" name="email-form">
                                                    <input className="text-field-5 w-input" style={{ width: "50px" }} onChange={this.onChangeText} min={0} max={59} data-name="startfrom_ss" id="startfrom_ss" maxLength={2} name="Number" placeholder="SS" /></form>
                                                <div className="w-form-done" />
                                                <div className="w-form-fail" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-col w-col-6">
                                    <div>
                                        <div className="checkbox-field-2 w-checkbox">
                                            <input className="checkbox-item w-checkbox-input" id="chkrepeatuntil" onChange={this.onChange} type="checkbox" style={{ marginRight: "10px" }} />특정 시간까지 반복
                                            <label className="field-label w-form-label" htmlFor="node-3" />
                                        </div>
                                    </div>
                                    <div className="div-block-19" style={{ paddingLeft: 0 }}>
                                        <div className="div-block-20">
                                            <div>Start at</div>
                                        </div>
                                        <div className="div-advancedrun-date">
                                            <div className="text-block-14">YYYY/MM/DD</div>
                                        </div>
                                    </div>
                                    <div className="div-block-19">

                                        <div className="div-advancedrun-date">
                                            <div className="form-block-3 w-form">
                                                <form data-name="Email Form" id="email-form" name="email-form">
                                                    <input className="text-field-5 w-input" style={{ width: "50px" }} onChange={this.onChangeText} min={0} max={23} data-name="Time" id="repeatuntil_hh" maxLength={2} name="Number" placeholder="HH" /></form>
                                                <div className="w-form-done" />
                                                <div className="w-form-fail" />
                                            </div>
                                        </div>
                                        <div className="div-advancedrun-date">
                                            <div className="form-block-3 w-form">
                                                <form data-name="Email Form" id="email-form" name="email-form">
                                                    <input className="text-field-5 w-input" style={{ width: "50px" }} onChange={this.onChangeText} min={0} max={59} data-name="Time" id="repeatuntil_mm" maxLength={2} name="Number" placeholder="MM" /></form>
                                                <div className="w-form-done" />
                                                <div className="w-form-fail" />
                                            </div>
                                        </div>
                                        <div className="div-advancedrun-date">
                                            <div className="form-block-3 w-form">
                                                <form data-name="Email Form" id="email-form" name="email-form">
                                                    <input className="text-field-5 w-input" style={{ width: "50px" }} onChange={this.onChangeText} min={0} max={59} data-name="Time" id="repeatuntil_ss" maxLength={2} name="Number" placeholder="SS" /></form>
                                                <div className="w-form-done" />
                                                <div className="w-form-fail" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="div-advanced-schedule">
                        <div className="div-block-21">
                            <div>에이전트와 통신이 불가능한 경우</div>
                        </div>
                        <div className="div-block-21" style={{ width: "180px" }}>
                            <div>

                                <Dropdown className="button-delete-user"
                                    options={['중지', '재시도']}
                                    onChange={this.category}
                                    placeholder="선택" />

                            </div>
                        </div>
                    </div>
                    <div className="div-block-11" style={{ bottom: 57 }}>
                        <div className="div-adduser-input" ><a href="#" onClick={this.run} className="button-adduser-summit w-button">실행</a></div>
                    </div>
                </div>
            </div>


        return (
            <div className="popup-advancedrun" style={{ display: this.state.isShow ? "block" : "none", right: 960 }}>
                <div className="div-popup-title2" style={{ marginTop: 14, marginLeft: 10, fontSize: "16pt", fontWeight: 700 }}>
                    <div>고급 실행</div>
                    <div className="div-close">
                        <a className="button-close" onClick={this.close} href="#">
                            <img style={{ width: 20, height: 20, marginLeft: -35 }} src={'../images/close_black.png'} /></a></div>
                </div>
                {this.state.selectedtab == 0 ? html_schedule : html_condition}
            </div>
        );



    }
}
