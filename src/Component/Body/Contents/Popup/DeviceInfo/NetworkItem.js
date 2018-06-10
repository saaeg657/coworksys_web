import React from 'react';

export default class NetworkItem extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        var titlewidth = 320;
        var tableList = [];
        var jsonData = this.props.item;
        var index = 0;
        var bg = "#f7f7f7";
        for (var i in jsonData) {
            var key = i;
            var val = jsonData[i];
            var obj = <div key={index} className="div-deviceinfo-network" style={{ backgroundColor: index % 2 == 0 ? bg : "white" }}>
                <div style={{ width: titlewidth }}>{key}</div>
                <div>{val}</div>
            </div>
            index++;
            tableList = tableList.concat(obj);
        }

        return (
            <div style={{ marginBottom: 20 }}>
                <div className="div-hardware-listitem">
                    {tableList}

                </div>
            </div>
        );
    }
}


  /*
        <div className="div-deviceinfo-network">
                        <div style={{ width: titlewidth }}>Manufacturer</div>
                        <div>값 </div>
                    </div>
                    <div className="div-deviceinfo-network" style={{ backgroundColor: "#f7f7f7" }}>
                        <div style={{ width: titlewidth }}>MAC Address</div>
                        <div>값 </div>
                    </div>
                    <div className="div-deviceinfo-network">
                        <div style={{ width: titlewidth }}>IP Address</div>
                        <div>값 </div>
                    </div>
                    <div className="div-deviceinfo-network" style={{ backgroundColor: "#f7f7f7" }}>
                        <div style={{ width: titlewidth }}>DNS Domain</div>
                        <div>값 </div>
                    </div>
                    <div className="div-deviceinfo-network">
                        <div style={{ width: titlewidth }}>DNS HostName</div>
                        <div>값 </div>
                    </div>
                    <div className="div-deviceinfo-network" style={{ backgroundColor: "#f7f7f7" }}>
                        <div style={{ width: titlewidth }}>DNS Server Search order</div>
                        <div>값 </div>
                    </div>
                    <div className="div-deviceinfo-network">
                        <div style={{ width: titlewidth }}>DHCP Enabled</div>
                        <div>값 </div>
                    </div>
                    <div className="div-deviceinfo-network" style={{ backgroundColor: "#f7f7f7" }}>
                        <div style={{ width: titlewidth }}>DHCP LeaseObtained</div>
                        <div>값 </div>
                    </div>
                    <div className="div-deviceinfo-network">
                        <div style={{ width: titlewidth }}>DHCP LeaseExpires</div>
                        <div>값 </div>
                    </div>
                    <div className="div-deviceinfo-network" style={{ backgroundColor: "#f7f7f7" }}>
                        <div style={{ width: titlewidth }}>DHCP Server</div>
                        <div>값 </div>
                    </div>
                    <div className="div-deviceinfo-network">
                        <div style={{ width: titlewidth }}>Default IP GateWay</div>
                        <div>값 </div>
                    </div>
                    <div className="div-deviceinfo-network" style={{ backgroundColor: "#f7f7f7" }}>
                        <div style={{ width: titlewidth }}>IP Subnet</div>
                        <div>값 </div>
                    </div>
                    <div className="div-deviceinfo-network">
                        <div style={{ width: titlewidth }}>Device Status</div>
                        <div>값 </div>
                    </div>
                    <div className="div-deviceinfo-network" style={{ backgroundColor: "#f7f7f7" }}>
                        <div style={{ width: titlewidth }}>Description</div>
                        <div>값 </div>
                    </div>
                    <div className="div-deviceinfo-network">
                        <div style={{ width: titlewidth }}>Connection Status</div>
                        <div>값 </div>
                    </div>
        */