import React from 'react';
import propTypes from 'prop-types';
import { DragSource } from 'react-dnd';
import { createDragPreview } from 'react-dnd-text-dragpreview';

const componentSource = {
  beginDrag(props) {
    props.onBeginDrag(Object.assign({}, props.statement, { row: props.row }));
    return {};
  },
  endDrag(props) {
    return {};
  },
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

class Statement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFolded: false,
      isOver: false
    };
    this.onClickFold = this.onClickFold.bind(this);
    this.onMouseOver = this.onMouseOver.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
  }
  componentDidMount() {
    this.dragPreview = createDragPreview(`${this.props.statement.name}()`, dragPreviewStyle);
    this.props.connectDragPreview(this.dragPreview);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.statement.name !== this.props.statement.name) this.initDragPreview(nextProps.statement.name);
  }

  initDragPreview(name) {
    this.dragPreview = createDragPreview(`${name}()`, dragPreviewStyle);
    this.props.connectDragPreview(this.dragPreview);
  }

  onClickFold(row) {
    this.setState({
      isFolded: !this.state.isFolded
    });
    this.props.onClickFold(row);
  }

  onMouseOver() {
    this.setState({
      isOver: true
    });
  }

  onMouseLeave() {
    this.setState({
      isOver: false
    });
  }

  render() {
    const {
      connectDragSource,
      statement,
      selectedRow,
      columnWidth,
      lineHeight,
      row,
      column,
      foldable,
      onClickStatement,
      onChangeParam,
      onFocusStatement
    } = this.props;
    let index = -1;
    return (
      <div
        style={{ height: lineHeight, padding: '2.5px 5px 2.5px 5px', width: 1200 + (column - 1) * columnWidth }}
        onMouseOver={() => this.onMouseOver()}
        onMouseLeave={() => this.onMouseLeave()}
      >
        {foldable &&
          <div
            onClick={() => this.onClickFold(row)}
            style={{
              border: '1px solid #9db4cb',
              borderRadius: 2,
              height: 10,
              width: 10,
              float: 'left',
              margin: '6px 5px 0px 0px', 
              background: '#DCDCDC',
              cursor: 'pointer',
              WebkitUserSelect: 'none',
              WebkitTouchCallout: 'none',
              MozUserSelect: 'none',
              msUserSelect: 'none',
              userSelect: 'none',
              fontSize: 8,
              fontStyle: 'normal',
              lineHeight: '10px',
              textAlign: 'center'
            }}>
            {statement.isFolded ? '+' : '-'}
          </div>}
        {connectDragSource(
          <div
            style={{
              fontSize: 11,
              fontStyle: 'normal',
              float: 'left',
              marginLeft: columnWidth * (column - 1) - (foldable && column > 1 ? 15 : 0),
              height: lineHeight - 5
            }}
            onClick={() => { if (statement.name !== 'else') onClickStatement(row); }}
          >
            <div
              style={{
                border: `${selectedRow === row ? '1px' : '0px'} dotted black`,
                padding: selectedRow === row ? '0px' : '1px',
                float: 'left'
              }}
            >
              <span style={{ fontSize: 12, color: '#1d43c5', fontWeight: 900, fontStyle: 'normal' }}>{statement.type === 'condition' ? (statement.name === 'else' ? 'Else' : 'If ') : ''}</span>
              <span style={{ color: '#69c1fc', fontStyle: 'italic' }}>{statement.name === 'else' ? '' : statement.name}</span>
              <span>{statement.name === 'else' ? '' : ' ('}</span>
              {Object.keys(statement.parameters).map((param, i) => {
                switch (statement.parameters[param].type) {
                  case 'Null':
                    return (null);
                  case 'Fixed': {
                    index += 1;
                    return (
                      <span key={i}>
                        <span>{index !== 0 ? ', ' : ''}</span>
                        <span style={{ color: '#4a8f55' }}>"{statement.parameters[param].value}"</span>
                      </span>
                    );
                  }
                  case 'Selection': {
                    index += 1;
                    return (
                      <span key={i}>
                        <span>{index !== 0 ? ', ' : ''}</span>
                        <select
                          style={{ margin: '0px 5px 0px 5px' }}
                          name={param}
                          value={statement.parameters[param].value}
                          onChange={(e) => onChangeParam(e.target.name, 'value', e.target.value)}
                          onFocus={() => onFocusStatement(row)}
                        >
                          {statement.parameters[param].options.map((option, j) => {
                            return (<option key={j} value={option}>{String(option)}</option>);
                          })}
                        </select>
                      </span>
                    );
                  }
                  case 'Message': {
                    index += 1;
                    return (
                      <span key={i}>
                        <span>{index !== 0 ? ', ' : ''}</span>
                        <select
                          style={{ margin: '0px 5px 0px 5px' }}
                          name={param}
                          value={statement.parameters[param].isNull}
                          onChange={(e) => onChangeParam(e.target.name, 'isNull', e.target.value)}
                          onFocus={() => onFocusStatement(row)}
                        >
                          {statement.parameters[param].options.map((option, j) => {
                            return (<option key={j} value={option === '없음' ? true : false}>{String(option)}</option>);
                          })}
                        </select>
                      </span>
                    );
                  }
                  default: {
                    index += 1;
                    return (
                      <span key={i}>
                        <span>{index !== 0 ? ', ' : ''}</span>
                        <input
                          style={{ border: '1px solid black', borderRadius: 3, margin: '0px 5px 0px 5px' }}
                          type='text'
                          name={param}
                          value={statement.parameters[param].value}
                          disabled={statement.parameters[param].type === 'Fixed' ? true : false}
                          onChange={(e) => onChangeParam(e.target.name, 'value', e.target.value)}
                          onFocus={() => onFocusStatement(row)}
                          placeholder={statement.parameters[param].comment}
                          size={statement.parameters[param].comment && statement.parameters[param].comment.length > 30 ? statement.parameters[param].comment.length + 10 : 30}
                        />
                      </span>
                    );
                  }
                }
              })}
              <span>{statement.name === 'else' ? '' : ')'}</span>
            </div>
            {(this.state.isOver || selectedRow === row) && <div style={{ paddingLeft: 10, color: '#808080', cursor: 'pointer', float: 'left', paddingTop: 3 }} onClick={(e) => this.props.onClickRemoveStatement(e, this.props.row)}>remove</div>}
          </div>
        )}
      </div >
    );
  }
}

Statement.propTypes = {
  onChangeParam: propTypes.func.isRequired,
  onBeginDrag: propTypes.func.isRequired,
  onClickStatement: propTypes.func.isRequired,
  onFocusStatement: propTypes.func.isRequired
};

Statement.defaultProps = {

};

export default DragSource('Component', componentSource, collect)(Statement);
