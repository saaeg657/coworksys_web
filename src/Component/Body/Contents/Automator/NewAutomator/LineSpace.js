import React from 'react';
import propTypes from 'prop-types';
import LineSpaceColumn from './LineSpaceColumn.js';

class LineSpace extends React.Component {
  render() {
    const {
      maxColumn,
      row,
      spaceWidth,
      spaceHeight,
      onDropStatement
    } = this.props;
    return (
      <div style={{ height: spaceHeight, width: '100%', position: 'relative' }}>
        {Array(maxColumn).fill(null).map((_, i) => {
          return (
            <LineSpaceColumn
              key={i}
              row={row}
              column={i + 1}
              spaceWidth={maxColumn === i + 1 ? `calc(100% - ${spaceWidth * i}px)` : spaceWidth}
              spaceHeight={spaceHeight}
              onDropStatement={onDropStatement}
            />
          );
        })}
      </div>
    );
  }
}

LineSpace.propTypes = {
  onDropStatement: propTypes.func.isRequired
};

LineSpace.defaultProps = {

};

export default LineSpace;