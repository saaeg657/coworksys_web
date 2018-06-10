import React from 'react';
import * as util from '../../../../Util/Util';
import * as CommonData from '../../../../InformationData/CommonData.js';
export default class GroupItem extends React.Component {
  constructor(props) {
    super(props);
    this.changeEvent = this.changeEvent.bind(this);
  }
  changeEvent() {
    if (CommonData.groupList.indexOf(this.props.list.id) == -1)
      CommonData.groupList = CommonData.groupList.concat(this.props.list);
    else
      CommonData.groupList.splice(CommonData.groupList.indexOf(this.props.list), 1);

  }
  render() {
    return (
      <div className="div-group-addtomember-checkbox">
        <div className="div-table-checkbox">
          <div className="form-wrapper-6 w-form">
            <form data-name="Email Form 2" id="email-form-2" name="email-form-2">
              <div className="checkbox-field-2 w-checkbox">
                <input className="checkbox-item w-checkbox-input" id="node-3" onChange={this.changeEvent} type="checkbox" />
                <label className="field-label w-form-label" htmlFor="node-3" />
              </div>
            </form>
            <div className="w-form-done" />
            <div className="w-form-fail" />
          </div>
        </div>
        <div className="div-170">
          <div>{this.props.list.name}</div>
        </div>
        <div className="div-150" style={{ justifyContent: "left" }}>
          <div>{util.enumOSType(this.props.list.deviceAdvancedOption)}</div>
        </div>
        <div className="div-150">
          <div >{this.props.list.note}</div>
        </div>
      </div>

    );
  };
}