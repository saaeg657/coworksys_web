import React from 'react';
import PropTypes from 'prop-types';
import { DragSource } from 'react-dnd';
import { createDragPreview } from 'react-dnd-text-dragpreview';

const componentSource = {
  beginDrag(props) {
    props.onBeginDrag(props.component);
    return {};
  },
  endDrag(props) {
    return {};
  },
  canDrag(props) {
    if (props.label) return true;
    return false;
  }
};

const collect = (connect, monitor) => {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging()
  };
};

const dragPreviewStyle = {
  backgroundColor: 'rgba(255, 255, 255, 0)',
  borderColor: 'rgba(255, 255, 255, 0)',
  color: 'black',
  fontSize: 13,
  paddingTop: 4,
  paddingRight: 7,
  paddingBottom: 6,
  paddingLeft: 7
};

class ComponentItem extends React.Component {
  componentDidMount() {
    this.dragPreview = createDragPreview(`${this.props.label}()`, dragPreviewStyle);
    this.props.connectDragPreview(this.dragPreview);
  }

  render() {
    const { connectDragSource } = this.props;
    return (
      <div style={this.props.style}>{connectDragSource(<span style={{ padding: 3 }}>{this.props.label}</span>)}</div>
    );
  }
}

ComponentItem.propTypes = {
  connectDragSource: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired,
  onBeginDrag: PropTypes.func.isRequired,
  style: PropTypes.object,
  component: PropTypes.object.isRequired
};

ComponentItem.defaultProps = {
  style: {},
  label: '',
  component: {}
};

export default DragSource('Component', componentSource, collect)(ComponentItem);