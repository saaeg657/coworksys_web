import React from 'react';
import * as CommonData from '../../../../InformationData/CommonData.js';
import * as util from '../../../../Util/Util.js';
import APIManager from '../../../../Controller/APIManager.js';

/**
 * BulkAction
 * 
 * props 목록
 * PopupManager
 * 
 */

export default class BulkAction extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isShow: true
        }
        this.show = this.show.bind(this);
        this.close = this.close.bind(this);
        this.action = this.action.bind(this);
    }
    show(visibility) {
        this.setState({ isShow: visibility })
    }
    setPopupType(item) {
        console.log("bulkaction-setPopupType", item);
        this.setState({ item: item });
    }
    close() {
        this.props.PopupManager.closeSubpopup();
        this.props.PopupManager.close();
        CommonData.removeData(CommonData.bulkactionList);
        CommonData.bulkactionList = [];
    }
    action(content, act) {
        console.log("bulkaction-action", content, act);
        var IDlist = [];
        switch (act) {
            case "addtofavorite":
                for (var i = 0; i < CommonData.bulkactionList.length; i++)
                    IDlist = IDlist.concat(CommonData.bulkactionList[i].id);
                var newAPI = util.newAPICommand();
                newAPI.put(
                    "/coworksys", "/api/automator/update/favorites", util.getDefaultHeader(),
                    {
                        "automatorIDList": IDlist,
                        "favorites": true
                    },
                    null,
                    null);
                APIManager.requestAPI(
                    newAPI.get("apikey"),
                    newAPI.get("apicommand"),
                    newAPI.get("apiheader"),
                    newAPI.get("apibody"),
                    this.responseAPICallback_done,
                    newAPI.get("apilistkey"));
            this.showMessage("사용자가 조직에 추가되었습니다.");
                this.props.PopupManager.close();
                this.props.PopupManager.closeSubpopup();
                return;
        }
        this.props.PopupManager.openSubPopup(content, act);
    }

    render() {

        if (CommonData.bulkactionList.length > 0 && this.props.popup != null) {
            var result = [];
            for (var index = 0; index < this.props.popup.list.length; index++) {
                var item = null;

                if (this.props.popup.list[index].popupaction == "activate") {
                    var active = false;
                    for (var i = 0; i < CommonData.bulkactionList.length; i++) {
                        if (CommonData.bulkactionList[i].status == "eBlock") {
                            active = true;
                            break;
                        }
                    }
                    item = <div className="div-bulk-actions" key={index} style={{ paddingLeft: 25 }}>
                        <div className="div-bulk-actions-icon" style={{
                            paddingLeft: 3,
                            paddingBottom: 5,
                            width: 30,
                            height: 30
                        }}>
                            <a 
                                onClick={this.action.bind(null, this.props.popup.list[index].popupcontent, this.props.popup.list[index].popupaction)} ><img src={active ? '../images/activate.png' : '../images/deactivate.png'} /></a>
                        </div>
                        <div className="div-bulk-actions-button">
                            <a className="button-bulk-action w-button" href="#" onClick={this.action.bind(null, this.props.popup.list[index].popupcontent, this.props.popup.list[index].popupaction)}>{active ? "사용 가능" : "사용 불가능"}</a>
                        </div>
                    </div>
                }
                else if (this.props.popup.list[index].popupaction == "publish") {
                    console.log("publish")
                    var active = false;
                    for (var i = 0; i < CommonData.bulkactionList.length; i++) {
                        if (CommonData.bulkactionList[i].status != "ePublishing") {
                            active = true;
                            break;
                        }
                    }
                    item = <div className="div-bulk-actions" key={index} style={{ paddingLeft: 25 }}>
                        <div className="div-bulk-actions-icon" style={{
                            paddingLeft: 3,
                            paddingBottom: 5,
                            width: 30,
                            height: 30,
                            marginRight: 0
                        }}>
                            <a onClick={this.action.bind(null, this.props.popup.list[index].popupcontent, this.props.popup.list[index].popupaction)} >
                                <img src={active ? '../images/publish.png' : '../images/unpublish.png'} />
                            </a>
                        </div>
                        <div className="div-bulk-actions-button">
                            <a className="button-bulk-action w-button" href="#" onClick={this.action.bind(null, this.props.popup.list[index].popupcontent, this.props.popup.list[index].popupaction)}>{active ? "배포 가능" : "배포 중지"}</a>
                        </div>
                    </div>
                }
                else {
                    item = <div className="div-bulk-actions" key={index} style={{ paddingLeft: 25 }}>
                        <div className="div-bulk-actions-icon">
                            <a width={50} height={50} onClick={this.action.bind(null, this.props.popup.list[index].popupcontent, this.props.popup.list[index].popupaction)} >
                                <img src={"images/" + this.props.popup.list[index].popupimg + ".png"} />
                            </a>
                        </div>
                        <div className="div-bulk-actions-button">
                            <a className="button-bulk-action w-button" href="#" onClick={this.action.bind(null, this.props.popup.list[index].popupcontent, this.props.popup.list[index].popupaction)}>{this.props.popup.list[index].popuplabel}</a>
                        </div>
                    </div>
                }


                result = result.concat(item);
            }

            return (

                <div style={{ display: this.state.isShow && CommonData.CurrentMenu != "deleted" ? "flex" : "none" ,
                float:"right",marginRight:this.props.PopupManager.props.Body.state.isShowMenu?225:45}}>
                    <div className="bulkaction-wrapper">
                        <div className="div-bulk-top-wrapper">
                            <div className="div-bulk-close" ><a className="link-bulk-close" onClick={this.close} href="#" ><img style={{minWidth:22,width:22,height:22}} src='../images/close_black.png'/></a>
                            </div>
                            <div className="div-bulk-title" style={{ fontSize: 19, fontWeight: 900 }}>작업 목록
                        </div>
                            <div className="div-bulk-count">
                                <div>{CommonData.bulkactionList.length}</div>
                                <div>개가 선택되었습니다.</div>
                            </div>

                        </div>
                        <div className="div-line" style={{ paddingTop: 5, width: 210 }} />
                        <div className="div-bulk-actions-wrapper" style={{ paddingTop: 20 }}>
                            <div className="div-bulk-action-userngroup">
                                {result}
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
        else
        { return (<div />) }
    }
}