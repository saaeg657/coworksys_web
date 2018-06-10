import React from 'react';
import * as util from '../../../../Util/Util';
import * as CommonData from '../../../../InformationData/CommonData.js';
export default class AutomatorItem extends React.Component {
  constructor(props) {
    super(props);
    this.changeEvent = this.changeEvent.bind(this);
  }
  changeEvent() {
    if (CommonData.automatorList.indexOf(this.props.list.id) == -1)
      CommonData.automatorList = CommonData.automatorList.concat(this.props.list);
    else
      CommonData.automatorList.splice(CommonData.automatorList.indexOf(this.props.list), 1);
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
        <div className="div-230">
          <div>{this.props.list.name}</div>
        </div>
        <div className="div-block-10">
          <div>{util.enumOSType(this.props.list.osType)}</div>
        </div>
      </div>

    );
  };
}