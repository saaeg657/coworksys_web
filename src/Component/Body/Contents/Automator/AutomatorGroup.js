import React from 'react';
import AutomatingItem from './AutomatingItem.js'

export default class AutomatingGroup extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isChecked: false };
        this.fold = this.fold.bind(this);

    }

    fold() {
        if (this.state.isChecked)
            this.setState({ isChecked: false });
        else
            this.setState({ isChecked: true });
    }

    render() {
        const mapToComponent = (data) => {
            return data.map((automator, i) => {
                return (
                    <AutomatingItem ContentsArea={this.props.ContentsArea} automator={automator} key={i} index={i} checkall={this.props.checkall} />
                );
            });
        };

        if (this.props.index == 0) {
            return (
                <div>
                    <div className="div-table-item-automator-group" style={{ backgroundColor: "#ececec", fontSize: "11pt", fontWeight: 700, color: "#4059b3" }}>
                        <div className="div-automator-group-btn" >
                            <img width={20} height={20} src="../images/star.png" />
                        </div>
                        <div className="div-230">즐겨찾기
                            </div>
                        <div className="div-170">
                        </div>
                        <div className="div-150">
                        </div>
                        <div className="div-150">
                        </div>
                    </div>
                    <div>
                        {this.props.SubMenu == "automator" && this.props.group[0].automatorList != null ? mapToComponent(this.props.group[0].automatorList) : ""}
                    </div>
                </div>
            );
        } else
            return (
                <div>
                    {this.props.item.name == "즐겨찾기" ? mapToComponent(this.props.item.automatorList) : ""}
                    <div className="div-table-item-automator-group">
                        <div className="div-automator-group-btn">

                            <a className={this.state.isChecked == true ? "btn-automator-group-unfold w-button" : "btn-automator-group-fold w-button"} onClick={this.fold} href="javascript:void(0)"></a>
                        </div>
                        <div className="div-230" style={{ color: this.state.isChecked ? "#369de4" : "#6a6a6a", fontWeight: 700 }}>{this.props.item.name}</div>
                    </div>
                    {this.state.isChecked == true ? mapToComponent(this.props.item.automatorList) : ""}
                </div>
            );
    };
}