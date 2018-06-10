import React from 'react';
import NetworkItem from './NetworkItem.js';
export default class Hardware extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isShow: true,
            tab: 0
        }
        this.show = this.show.bind(this);
        this.close = this.close.bind(this);
        this.switchTab = this.switchTab.bind(this);
    }
    switchTab(number) {
        console.log(number)
        this.setState({ tab: number });
    }
    show(visibility) {
        this.setState({ isShow: visibility });
    }

    close() {
        this.setState({ isShow: false });
    }
    render() {
        const mapToComponent = (data) => {
            return data.map((item, i) => {
                return (
                    <NetworkItem item={item} key={i} />
                );

            })
        };

        var select = "tab-link-5 w--current w-inline-block w-tab-link";
        var unselect = "tab-link-5 w-inline-block w-tab-link";

        return (
            <div className="div-deviceinfo-popup">
                <div data-duration-in={300} data-duration-out={100} className="tab-pane-2 w-hidden-medium w-tabs" style={{ marginLeft: 0, marginTop: -20 }}>
                    <div className="w-tab-menu">
                        <a data-w-tab="Tab 1" onClick={this.switchTab.bind(null, 0)} className={this.state.tab == 0 ? select : unselect} style={{ height: 33 }}>
                            <div className="text-block-22">Network Adapters</div>
                        </a>
                        <a data-w-tab="Tab 2" onClick={this.switchTab.bind(null, 1)} className={this.state.tab == 1 ? select : unselect} style={{ height: 33 }}>
                            <div className="text-block-23">메모리</div>
                        </a>
                        <a data-w-tab="Tab 3" onClick={this.switchTab.bind(null, 2)} className={this.state.tab == 2 ? select : unselect} style={{ height: 33 }}>
                            <div className="text-block-23">프로세서</div>
                        </a>
                        <a data-w-tab="Tab 4" onClick={this.switchTab.bind(null, 3)} className={this.state.tab == 3 ? select : unselect} style={{ height: 33 }}>
                            <div className="text-block-23">하드 디스크</div>
                        </a>
                        <a data-w-tab="Tab 5" onClick={this.switchTab.bind(null, 4)} className={this.state.tab == 4 ? select : unselect} style={{ height: 33 }}>
                            <div className="text-block-23">모니터</div>
                        </a>
                        <a data-w-tab="Tab 5" onClick={this.switchTab.bind(null, 5)} className={this.state.tab == 5 ? select : unselect} style={{ height: 33 }}>
                            <div className="text-block-23">비디오 컨트롤러</div>
                        </a>
                    </div>
                    <div className="w-tab-content">
                        <div data-w-tab="Tab 1" className="tab-pane-2 w-tab-pane">
                            <div className="div-block-47" style={{ display: this.state.tab == 0 ? "block" : "none", height: 915, paddingTop: 20 }}>
                                <div>
                                    <div style={{ fontWeight: 700, marginBottom: 13 }}>{"Network : " + this.props.NetworkAdapters.length}</div>
                                </div>
                                {mapToComponent(this.props.NetworkAdapters)}
                            </div>
                            <div className="div-block-47" style={{ display: this.state.tab == 1 ? "block" : "none", height: 915, paddingTop: 20 }}>
                                <div>
                                    <div style={{ fontWeight: 700, marginBottom: 13 }}>{"메모리 : " + this.props.PhysicalMemory.length}</div>
                                </div>
                                {mapToComponent(this.props.PhysicalMemory)}
                            </div>
                            <div className="div-block-47" style={{ display: this.state.tab == 2 ? "block" : "none", height: 915, paddingTop: 20 }}>
                                <div>
                                    <div style={{ fontWeight: 700, marginBottom: 13 }}>{"프로세서 : " + this.props.Processors.length}</div>
                                </div>
                                {mapToComponent(this.props.Processors)}
                            </div>
                            <div className="div-block-47" style={{ display: this.state.tab == 3 ? "block" : "none", height: 915, paddingTop: 20 }}>
                                <div>
                                    <div style={{ fontWeight: 700, marginBottom: 13 }}>{"하드디스크 : " + this.props.HardDisk.length}</div>
                                </div>
                                {mapToComponent(this.props.HardDisk)}
                            </div>
                            <div className="div-block-47" style={{ display: this.state.tab == 4 ? "block" : "none", height: 915, paddingTop: 20 }}>
                                <div>
                                    <div style={{ fontWeight: 700, marginBottom: 13 }}>{"모니터 : " + this.props.Monitor.length}</div>
                                </div>
                                {mapToComponent(this.props.Monitor)}
                            </div>
                            <div className="div-block-47" style={{ display: this.state.tab == 5 ? "block" : "none", height: 915, paddingTop: 20 }}>
                                <div>
                                    <div style={{ fontWeight: 700, marginBottom: 13 }}>{"비디오 컨트롤러 : " + this.props.VideoController.length}</div>
                                </div>
                                {mapToComponent(this.props.VideoController)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
