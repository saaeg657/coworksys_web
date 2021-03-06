import React from 'react';
import ModelManager from '../../../../../Controller/ModelManager.js';
import * as util from '../../../../../Util/Util.js';
export default class Automator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isShow: true, category: []
        }
        this.show = this.show.bind(this);
        this.close = this.close.bind(this);
        this.dropdownClick = this.dropdownClick.bind(this);

    }
    dropdownClick(e) {
        console.log("dropdownClick", e)
    }
    componentDidMount() {
        var buttons = ModelManager.GetCommandInfo("software");
        this.setState({ category: buttons.list });
    }
    show(visibility) {
        this.setState({ isShow: visibility });
    }

    close() {
        this.setState({ isShow: false });
    }
    render() {
        console.log(this.props)

        const mapToComponent = (data) => {
            console.log(data)
            if (data == null)
                return "";
            return data.map((item, i) => {
                return (
                    <div className="div-deviceinfo-network" style={{ backgroundColor: i % 2 == 0 ? "#f7f7f7" : "white", paddingLeft: 20 }}>
                        <div style={{ width: 130 }}>{item.userName}</div>
                        <div style={{ width: 180 }}>{item.automatorName}</div>
                        <div style={{ width: 200 }}>{util.toDateStringYMDHHmmss_Kor(item.runningTime)}</div>
                        <div style={{ width: 180 }}>{item.description}</div>
                    </div>
                );
            })
        };
        const mapToComponent_category = (data) => {
            return data.map((item, i) => {
                let objList = [];
                if (item.btntype == "category") {
                    let obj_dropdown = [];

                    for (var i = 0; i < item.labelList.length; i++) {
                        obj_dropdown = obj_dropdown.concat(<a key={i} href="#" onClick={this.dropdownClick.bind(this, item.labelList[i])} className="dropdown-link w-dropdown-link">{item.labelList[i]}</a>)
                    }

                    let obj_category =
                        <div className="div-category" key={i}>
                            <div data-delay={0} className="dropdown w-dropdown">
                                <div className="dropdown-toggle-group w-dropdown-toggle">
                                    <div>{item.labelList[0]}</div>
                                    <div className="icon-3 w-icon-dropdown-toggle" />
                                </div>
                                <nav className="dropdown-list w-dropdown-list">
                                    {obj_dropdown}
                                </nav>
                            </div>
                            <div className="form-wrapper w-form" style={{ width: 145 }}>
                                <form id="email-form" name="email-form" data-name="Email Form" className="form-search" >
                                    <input style={{ width: 145 }} type="text" id="name-5" name="name-5" data-name="Name 5" placeholder="검색" maxLength={256} className="form-search-input w-input" />
                                </form>
                                <div className="w-form-done" />
                                <div className="w-form-fail" />
                            </div>
                        </div>
                    objList = objList.concat(obj_category);
                }
                return objList;
            })
        };
        return (
            <div className="div-deviceinfo-popup">
                <div className="div-block-58" style={{ marginLeft: 30 }}>
                    <div className="div-block-59" style={{ marginTop: 20, width: 725, justifyContent: "space-between" }}>
                        <div>{"Total : " + (this.props.automatorHistory != undefined ? this.props.automatorHistory.length : 0)}</div>
                        {/*mapToComponent_category(this.state.category)*/}
                    </div>
                    <div className="div-block-60" style={{ paddingLeft: 20, display: "flex", fontFamily: "Notosanscjkkr" }} >
                        <div style={{ width: 130, fontSize: "12pt", fontWeight: 700, color: "#324fb5", paddingTop: 7, paddingRight: 10 }}>
                            사용자
                            </div>
                        <div style={{ width: 180, fontSize: "12pt", fontWeight: 700, color: "#324fb5", paddingTop: 7, paddingRight: 10 }}>
                            오토메이터 이름
                            </div>
                        <div style={{ width: 200, fontSize: "12pt", fontWeight: 700, color: "#324fb5", paddingTop: 7, paddingRight: 10 }}>
                            실행 날짜
                            </div>
                        <div style={{ width: 200, fontSize: "12pt", fontWeight: 700, color: "#324fb5", paddingTop: 7, paddingRight: 10 }}>
                            설명
                            </div>
                    </div>
                    <div className="div-block-61">
                        {mapToComponent(this.props.automatorHistory)}
                    </div>
                </div>
            </div>
        );
    }
}
