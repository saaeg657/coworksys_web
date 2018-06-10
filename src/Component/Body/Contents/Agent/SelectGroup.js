import React from 'react';
import Axios from 'axios';
import * as properties from '../../../../Properties.js';
import GroupItem from './GroupItem.js';
import * as CommonData from '../../../../InformationData/CommonData.js';

export default class SelectGroup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            List: []
        }
        this.getList = this.getList.bind(this);
        this.getList();
        this.showMSG = this.showMSG.bind(this);
        this.submit = this.submit.bind(this);
    }
    getList() {
        var header = {
            headers: {
                'Content-Type': "application/json; charset=utf-8",
            }
        };

        Axios.post(properties.TestServerURL + '/coworksys/api/deviceGroup/get/list',
            {
                "startIndex" : 0 ,
                "count" : 10 , 
                "deviceGroupType" : "eAll"
            }, header)
            .then(
            Response => {
                let newList = Response.data.deviceGroupList;
                this.setState({
                    List: newList
                });
                console.log( Response);
            }
            );
    }

    submit() {
        let { dispatch } = this.props;
        let action_msg = ActivePopup("","","");
        dispatch(action_msg);

        var value = {
            'command' : 'selectgroup',
            'value':""
        };
        
        if (CommonData.groupList.length > 1) {
            value.value = CommonData.groupList[0].name + " 외 " + (CommonData.groupList.length - 1).toString() + "개";
        }
        else if (CommonData.groupList.length == 1) {
            value.value = CommonData.groupList[0].name;
        }
        
        App.communicator.sendToSubscriber('AddPage', value);

    }
    showMSG(Response, text) {
        let { dispatch } = this.props;
        let action_msg = ShowMessageBox(true, Response.status == 200 ? true : false, text, "Response");
        dispatch(action_msg);
    }

    render() {

        const mapToComponent = (data) => {
            return data.map((list, i) => {
                return (<GroupItem list={list} key={i} />);
            });
        };
        let html = <div className="popup-localuser-addtogroup" style={{left:1160}}>
            <div className="div-popup-title">
                <div className="div-group-addtomember-title">
                    <div>설치 후 포함 될 장치 조직</div>
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
                        <div className="text-block-10">장치 조직</div>
                    </div>
                    <div className="div-170">
                        <div className="text-block-10">OS</div>
                    </div>
                    <div className="div-150">
                        <div className="text-block-10">설명</div>
                    </div>
                </div>
                {mapToComponent(this.state.List)}
                <div className="div-block-11"><a className="button-circle-gray-nomargin w-button" onClick={this.submit} href="#">확인</a>
                </div>
            </div>
        </div>


        return (html);

    }
};