import React from 'react';
import propTypes from 'prop-types';
import { DropTarget } from 'react-dnd';

const componentTarget = {
  drop(props, monitor, component) {
    component.props.onDropStatement(component.props.row, component.props.column);
  },
  hover(props, monitor, component) {

  }
};

const collect = (connect, monitor) => {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  };
};

class LineSpaceColumn extends React.Component {
  render() {
    const { connectDropTarget, isOver } = this.props;
    return connectDropTarget(
      <div
        style={{
          width: this.props.spaceWidth,
          height: this.props.spaceHeight,
          float: 'left',
          textAlign: 'left',
          color: 'green',
          fontSize: 13,
          fontWeight: 1200,
          WebkitUserSelect: 'none',
          WebkitTouchCallout: 'none',
          MozUserSelect: 'none',
          msUserSelect: 'none',
          userSelect: 'none'
        }}
      >
        {/* <div style={{ border: '1px solid black' }}> */}
          {isOver ? '=>' : ''}
        {/* </div> */}
      </div>
    );
  }
}

LineSpaceColumn.propTypes = {
  onDropStatement: propTypes.func.isRequired,
  isOver: propTypes.bool.isRequired
};

LineSpaceColumn.defaultTypes = {
};

export default DropTarget('Component', componentTarget, collect)(LineSpaceColumn);