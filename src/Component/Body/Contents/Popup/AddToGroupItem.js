import React from 'react';
import * as CommonData from '../../../../InformationData/CommonData.js';

export default class AddToGroupItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ischecked: false
        }
        this.checkbox = this.checkbox.bind(this);
    }
    checkbox(checkall) {
        if (checkall != null) {
            //이미 선택된 체크박스 예외처리
            if (checkall == true && this.state.ischecked == true) {
                return;
            }
            else if (checkall == true && this.state.ischecked == false) {
                this.setState({ ischecked: true });
                CommonData.addItemList = CommonData.addItemList.concat(this.props.item);
            }
            else if (checkall == false && this.state.ischecked == true) {
                this.setState({ ischecked: false });
                CommonData.removeData(CommonData.addItemList, this.props.item);
            }
            else {
                return;
            }
        }
        else {
            if (CommonData.existItem(CommonData.addItemList, this.props.item)) {
                CommonData.addItemList = CommonData.removeData(CommonData.addItemList, this.props.item);
                if (CommonData.addItemList.length == 0) {
                    CommonData.clearData(CommonData.addItemList);
                    CommonData.addItemList = [];
                }

                this.setState({ ischecked: false });
            } else {
                CommonData.addItemList = CommonData.appendData(CommonData.addItemList, this.props.item);
                this.setState({ ischecked: true });
            }
            console.log(CommonData.addItemList)
        }

    }

    componentWillReceiveProps(nextProps) {
        if (this.props != nextProps) {
            if (nextProps.checkall != null) {
                this.checkbox(nextProps.checkall);
            }
        }
    }

    render() {

        let result = [];
        for (var tableIndex = 0; tableIndex < this.props.tableinfo.list.length; tableIndex++) {
            ///1. 여러개의 키를 조합하는 경우
            var value = "";
            for (var i = 0; i < this.props.tableinfo.list[tableIndex].tablekey.length; i++) {
                value += this.props.item[this.props.tableinfo.list[tableIndex].tablekey[i]] + " ";
            }
            ///2. 여백 제거
            value = value.trim();

            ///3. 파서가 존재하는경우
            if (this.props.tableinfo.list[tableIndex].valueparser != null) {

                var afterparse = this.props.tableinfo.list[tableIndex].valueparser(value);
                value = afterparse;

            }

            ///4. 정보가 없는경우
            if (value == "null" || value == "undefined")
                value = "정보없음";
            var obj =
                <div key={tableIndex} className="div-table-username" style={{ width: this.props.tableinfo.list[tableIndex].tablewidth, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }} >
                    {value}
                </div>
            result = result.concat(obj);
        }

        return (
            <div className="div-group-addtomember-checkbox" >
                <div className="div-table-checkbox" >
                    <div className="form-wrapper-6 w-form">
                        <form data-name="Email Form 2" id="email-form-2" name="email-form-2">
                            <div className="checkbox-field-2 w-checkbox">
                                <input className="checkbox-item w-checkbox-input" style={{ display: "none" }} checked={this.state.ischecked} onChange={this.checkbox.bind(null, null)} id="node-3" type="checkbox" />
                                <img src={this.state.ischecked ? '../images/chkbox2_on.png' : '../images/chkbox2_off.png'} onClick={this.checkbox.bind(null, null)} />
                                <label className="field-label w-form-label" htmlFor="node-4" />
                            </div>
                        </form>
                        <div className="w-form-done" />
                        <div className="w-form-fail" />
                    </div>
                </div>
                {result}
            </div>
        );



    }
}