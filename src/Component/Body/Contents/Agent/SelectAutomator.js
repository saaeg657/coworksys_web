import React from 'react';
import Axios from 'axios';
import * as properties from '../../../../Properties.js';
import AutomatorItem from './AutomatorItem.js';
import * as CommonData from '../../../../InformationData/CommonData.js';

export default class SelectAutomator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            List: []
        }
        this.getList = this.getList.bind(this);
        this.getList();
        this.submit = this.submit.bind(this);
    }
    getList() {
        var header = {
            headers: {
                'Content-Type': "application/json; charset=utf-8",
            }
        };

        Axios.post(properties.TestServerURL + '/coworksys/api/automator/get/list',
            {
                "osType": "eAll",
                "isGroup": false
            }, header)
            .then(
            Response => {
                let newList = Response.data.automatorList;
                this.setState({
                    List: newList
                });
                console.log(Response);
            }
            );
    }
    submit() {
        var value = {
            'command': "selectautomator",
            'value': ""
        };

        if (CommonData.automatorList.length > 1) {
            value.value = CommonData.automatorList[0].name + " 외 " + (CommonData.automatorList.length - 1).toString() + "개";
        }
        else if (CommonData.automatorList.length == 1) {
            value.value = CommonData.automatorList[0].name;
        }


        App.communicator.sendToSubscriber('AddPage', value);
    }

    render() {

        let title = "";
        let leftposition = 1085;
        let popupwidth = 450;


        const mapToComponent = (data) => {
            return data.map((list, i) => {
                return (<AutomatorItem list={list} key={i} />);
            });
        };
        let html = <div className="popup-localuser-addtogroup" style={{ width: popupwidth, left: leftposition }}>
            <div className="div-popup-title">
                <div className="div-group-addtomember-title">
                    <div>설치 후 자동 실행할 오토메이터</div>
                </div>
                <div className="form-block w-form">
                    <form className="form-search" data-name="Email Form" id="email-form" name="email-form">
                    </form>
                    <div className="w-form-done" />
                    <div className="w-form-fail" />
                </div>
            </div>
            <div className="div-group-addtomember-wrapper">
                <div className="div-group-addtomember-type-title">
                    <div className="div-table-checkbox">
                        <div className="form-wrapper-6 w-form">
                            <form data-name="Email Form 2" id="email-form-2" name="email-form-2">
                                <div className="checkbox-field-2 w-checkbox">

                                    <label className="field-label w-form-label" htmlFor="node-4" />
                                </div>
                            </form>
                            <div className="w-form-done" />
                            <div className="w-form-fail" />
                        </div>
                    </div>
                    <div className="div-230">
                        <div className="text-block-10">오토메이터</div>
                    </div>
                    <div className="div-block-9">
                        <div className="text-block-10">OS</div>
                    </div>
                    <div className="div-block-9">
                        <div className="text-block-10">설명</div>
                    </div>
                </div>
                <div className="div-line" style={{ width: 400, marginTop: 10, marginBottom: 10, marginLeft: 0 }} />
                {mapToComponent(this.state.List)}
                <div className="div-block-11"><a className="button-circle-gray-nomargin w-button" onClick={this.submit} href="#">확인</a>
                </div>
            </div>
        </div>


        return (html);

    }
};