import React from 'react';
import propTypes from 'prop-types';
import { DragSource } from 'react-dnd';

const componentSource = {
  beginDrag(props) {
    return {};
  },
  endDrag(props) {
    return {};
  },
  canDrag(props) {
    if (props.statement.name) return true;
    return false;
  }
};

const collect = (connect, monitor) => {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
};

class Component extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenMessageBox: false
    };
  }

  isValidParam(param, value) {
    switch (param.type) {
      case 'Number':
        if (isNaN(Number(value))) return false;
        if (param.range && (param.range[0] > value || param.range[1] < value)) return false;
        break;
      default:
        break;
    }
    return true;
  }

  renderInputField(statement, param) {
    switch (statement.parameters[param].type) {
      case 'Null':
        return (null);
      case 'Fixed':
        return (
          <div>
            <span style={{ fontSize: 13 }}>{statement.parameters[param].value}</span>
          </div>
        );
      case 'Selection':
        return (
          <div style={{ display: 'flex', flexDirection: 'row', width: '100%', height: 20 }}>
            <select
              style={{ width: 200, fontSize: 15 }}
              name={param}
              value={statement.parameters[param].value}
              onChange={(e) => this.props.onChangeParam(e.target.name, 'value', e.target.value)}
            >
              {statement.parameters[param].options && statement.parameters[param].options.map(((v, i) => <option key={i} value={v}>{String(v)}</option>))}
            </select>
          </div>
        );
      case 'Message':
        return (
          <div style={{ display: 'flex', flexDirection: 'row', width: '100%', height: 20 }}>
            <select
              style={{ width: 200, fontSize: 15 }}
              name={param}
              value={statement.parameters[param].isNull}
              onChange={(e) => this.props.onChangeParam(e.target.name, 'isNull', e.target.value)}
            >
              {statement.parameters[param].options && statement.parameters[param].options.map(((v, i) => <option key={i} value={v === '없음' ? true : false}>{String(v)}</option>))}
            </select>
            {statement.parameters[param].isNull === 'false' && <input
              style={{ flex: 1, fontSize: 15, marginLeft: 10 }}
              type='text'
              name={param}
              value={statement.parameters[param].message}
              onChange={(e) => this.props.onChangeParam(e.target.name, 'value', e.target.value)}
              placeholder='메시지 입력'
            />}
          </div>
        );
      default:
        return (
          <input
            style={{ width: '100%', height: 20, fontSize: 15 }}
            type='text'
            name={param}
            value={statement.parameters[param].value}
            disabled={statement.parameters[param].type === 'Fixed' ? true : false}
            onChange={(e) => this.props.onChangeParam(e.target.name, 'value', e.target.value)}
            placeholder={statement.parameters[param].comment}
          />
        );
    }
  }


  render() {
    const { connectDragSource, isDragging, statement } = this.props;
    return connectDragSource(
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', fontSize: 20, textAlign: 'center', opacity: isDragging ? 0.3 : 1 }}>
        <div style={{ display: 'flex', flexDirection: 'row', flex: 1 }}>
          {/* component name */}
          <div style={{ flex: 1, margin: 'auto', fontSize: 30, padding: 5 }}>{statement && statement.name}</div>
          {/* component comment */}
          <div style={{ flex: 3, margin: 'auto', padding: 5 }}>{statement && statement.comment}</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', flex: 1 }}>
          {/* component input1 label */}
          <div style={{ flex: 1, margin: 'auto' }}>{statement && statement.parameters && statement.parameters.input1.name ? statement.parameters.input1.name : ''}</div>
          {/* component input1 value */}
          <div style={{ flex: 3, display: 'flex', alignItems: 'center' }}>
            {statement && statement.parameters && statement.parameters.input1.type !== 'Null' && this.renderInputField(statement, 'input1')}
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', flex: 1 }}>
          {/* component input2 label */}
          <div style={{ flex: 1, margin: 'auto' }}>{statement && statement.parameters && statement.parameters.input2.name ? statement.parameters.input2.name : ''}</div>
          {/* component input2 value */}
          <div style={{ flex: 3, display: 'flex', alignItems: 'center' }}>
            {statement && statement.parameters && statement.parameters.input2.type !== 'Null' && this.renderInputField(statement, 'input2')}
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', flex: 1 }}>
          {/* component option label */}
          <div style={{ flex: 1, margin: 'auto' }}>{statement && statement.parameters && statement.parameters.option.name ? statement.parameters.option.name : ''}</div>
          {/* component option value */}
          <div style={{ flex: 3, display: 'flex', alignItems: 'center' }}>
            {statement && statement.parameters && statement.parameters.option.type !== 'Null' && this.renderInputField(statement, 'option')}
          </div>
        </div>
      </div>
    );
  }
}

Component.propTypes = {
  connectDragSource: propTypes.func.isRequired,
  isDragging: propTypes.bool.isRequired
};

export default DragSource('Component', componentSource, collect)(Component);
