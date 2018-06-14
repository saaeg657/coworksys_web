import React from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import componentSchema from './ComponentSchema.js';
import StatementDetail from './StatementDetail.js';
import ComponentMenuItem from './ComponentMenuItem.js';
import EditorBody from './EditorBody.js';

const styles = {
  root: {
    width: '100%',
    // maxWidth: '100vw',
    height: 'calc(100% - 100px)',
    maxHeight: 'calc(100vh - 100px)',
    // minWidth: 1000,
    // maxHeight: 1100,
    display: 'flex',
    flexDirection: 'row',
    background: '#c8c8c8',
  },
  leftComponent: {
    display: 'flex',
    flexDirection: 'column',
    width: 'calc(100% - 300px)',
    // flex: 5
  },
  rightComponent: {
    display: 'flex',
    width: 300,
    // minWidth: 300,
    flexDirection: 'column',
    // flex: 1
  },
  editor: {
    flex: 3,
    margin: 10,
    padding: 30,
    background: 'white',
    fontSize: 50,
    overflow: 'scroll'
  },
  statementDetail: {
    height: 300,
    margin: 10,
    padding: 30,
    background: 'white'
  },
  conditionComponentList: {
    flex: 1,
    margin: 10,
    padding: 10,
    background: 'white',
    overflowY: 'scroll'
  },
  installComponentList: {
    flex: 1,
    margin: 10,
    padding: 10,
    background: 'white',
    overflowY: 'scroll'
  },
  systemComponentList: {
    flex: 1,
    margin: 10,
    padding: 10,
    background: 'white',
    overflowY: 'scroll'
  },
  componentItem: {
    height: 30,
    cursor: 'pointer'
  },
  searchComponent: {
    height: 30,
    margin: 15
  }
};

class TextEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRow: -1,
      draggedStatement: {},
      statementList: [],
      searchKeyword: ''
    };
    this.onClickStatement = this.onClickStatement.bind(this);
    this.onFocusStatement = this.onFocusStatement.bind(this);
    this.onDropStatement = this.onDropStatement.bind(this);
    this.onBeginDrag = this.onBeginDrag.bind(this);
    this.onClickFold = this.onClickFold.bind(this);
    this.onClickRemoveStatement = this.onClickRemoveStatement.bind(this);
    this.onChangeParam = this.onChangeParam.bind(this);
    this.onChangeSearchKeyword = this.onChangeSearchKeyword.bind(this);
  }

  onChangeSearchKeyword(value) {
    this.setState({
      searchKeyword: value
    });
  }

  onClickStatement(row) {
    var newStatementList = [...this.state.statementList];
    if (this.state.selectedRow > 0 && newStatementList[this.state.selectedRow - 1]) newStatementList[this.state.selectedRow - 1].isSelected = false;
    newStatementList[row - 1].isSelected = true;
    this.setState({
      selectedRow: row,
      statementList: newStatementList
    });
  }

  onFocusStatement(row) {
    this.onClickStatement(row);
  }

  getSelectedRow(statementList) {
    var selectedRow = -1;
    for (let i = 0; i < statementList.length; ++i) {
      if (statementList[i].isSelected) {
        selectedRow = i + 1;
        break;
      }
    }
    return selectedRow;
  }

  // drag한 statement를 해당 (row, column) 좌표에 drop
  // drag한 statement가 if/else이고 statement들을 포함한 상태로 folded 되어 drop하였다면 그 statement들까지 같이 이동
  onDropStatement(row, column) {
    var newStatementList = [...this.state.statementList];
    var newStatement = Object.assign({}, this.state.draggedStatement);
    newStatement.column = column;
    // drag한 statement가 editor 안에 삽입된 statement인 경우
    if (this.state.draggedStatement.column) {
      var columnDifference = column - this.state.draggedStatement.column;
      newStatementList.splice(newStatement.row - 1, 1, '');
      newStatementList.splice(row - 1, 0, newStatement);
      if (newStatement.children && newStatement.children.length > 0) {
        newStatement.children.map((childRow, i) => {
          let j = row > newStatement.row ? newStatement.row + childRow - 1 : newStatement.row + childRow + i;
          let temp = Object.assign({}, newStatementList[j]);
          temp.column += columnDifference;
          newStatementList.splice(j, 1, '');
          newStatementList.splice(row + i, 0, temp);
          return null;
        });
      }
      newStatementList = newStatementList.filter(v => (v !== '' ? true : false));
    // drag한 statement가 component list에서 새로 삽입되는 경우
    } else {
      Object.keys(newStatement.parameters).map((param) => {
        if (!newStatement.parameters[param].value) newStatement.parameters[param].value = '';
        return null;
      });
      newStatementList.splice(row - 1, 0, newStatement);
    }
    // statement 이동 후 들여쓰기 조정
    newStatementList = this.adjustColumn(newStatementList);
    this.setState({
      statementList: newStatementList,
      selectedRow: this.getSelectedRow(newStatementList)
    });
  }

  // fold 아이콘 클릭시 trigger되는 함수
  // if/else 안에 들어있는 statement들을 접음
  onClickFold(row) {
    var newStatementList = [...this.state.statementList];
    var newStatement = Object.assign({}, newStatementList[row - 1]);
    newStatement.children = [];
    if (newStatement.isFolded) {
      newStatement.isFolded = false;
    } else {
      newStatement.isFolded = true;
      for (let i = row; i < newStatementList.length; ++i) {
        if (newStatementList[i].column > newStatement.column) {
          newStatement.children.push(i - row + 1);
        } else {
          break;
        }
      }
    }
    newStatementList[row - 1] = newStatement;
    this.setState({
      statementList: newStatementList
    });
  }

  // statement 이동/삭제시 column 조정
  adjustColumn(statementList) {
    if (statementList.length > 0) {
      let maxColumn = 1;
      statementList.map((statement) => {
        if (statement.column > maxColumn) statement.column = maxColumn;
        maxColumn = statement.type === 'condition' ? statement.column + 1 : statement.column;
        return statement;
      });
    }
    return statementList;
  }

  // statement를 drag하기 시작하면 trigger되는 함수
  onBeginDrag(statement) {
    this.setState({
      draggedStatement: statement
    });
  }

  // 해당 statement 1개를 삭제하는 버튼을 클릭 시 trigger되는 함수
  onClickRemoveStatement(e, row) {
    e.stopPropagation();
    var newStatementList = [...this.state.statementList];
    var newSelectedRow = this.state.selectedRow;
    newStatementList.splice(row - 1, 1);
    newStatementList = this.adjustColumn(newStatementList);
    if (this.state.selectedRow === row) newSelectedRow = -1;
    this.setState({
      statementList: newStatementList,
      selectedRow: newSelectedRow
    });
  }

  // statement 안의 input들의 값을 변경 시 trigger되는 함수
  // statement detail과 에디터의 statement 두 component에 모두 props로 전달
  // statement detail 부분과 에디터의 statement 두곳 중 한곳을 변경해도 모두 변경
  onChangeParam(name, value) {
    if (!this.isValidParam(this.state.statementList[this.state.selectedRow - 1].parameters[name], value)) return;
    var newStatementList = [...this.state.statementList];
    var newStatement = Object.assign({},
      newStatementList[this.state.selectedRow - 1], {
        parameters: Object.assign({},
          newStatementList[this.state.selectedRow - 1].parameters, {
            [name] : Object.assign({},
              newStatementList[this.state.selectedRow - 1].parameters[name], { value }) 
          })});
    // var newStatement = {
    //   ...newStatementList[this.state.selectedRow - 1],
    //   parameters: {
    //     ...newStatementList[this.state.selectedRow - 1].parameters,
    //     [name]: {
    //       ...newStatementList[this.state.selectedRow - 1].parameters[name],
    //       value
    //     }
    //   }
    // };
    newStatementList[this.state.selectedRow - 1] = newStatement;
    this.setState({
      statementList: newStatementList,
    });
  }

  // component schema에 따라 parameter의 rule을 정의
  // 추후 추가 가능
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

  render() {
    return (
      <div style={Object.assign(styles.root, this.props.style)}>
        <div style={styles.leftComponent}>
          <div style={styles.editor}>
            <EditorBody
              statementList={this.state.statementList}
              selectedRow={this.state.selectedRow}
              onClickStatement={this.onClickStatement}
              onDropStatement={this.onDropStatement}
              onBeginDrag={this.onBeginDrag}
              onClickFold={this.onClickFold}
              onChangeParam={this.onChangeParam}
              onClickRemoveStatement={this.onClickRemoveStatement}
              onFocusStatement={this.onFocusStatement}
            />
          </div>
          <div style={styles.statementDetail}>
            <StatementDetail
              statement={this.state.statementList[this.state.selectedRow - 1]}
              onChangeParam={this.onChangeParam}
            />
          </div>
        </div>
        <div style={styles.rightComponent}>
          <div style={styles.searchComponent}>
            <input
              type='text'
              name='searchKeyword'
              value={this.state.searchKeyword}
              onChange={(e) => this.onChangeSearchKeyword(e.target.value)}
              style={{
                height: 30,
                fontSize: 15,
                border: '1px solid blue',
                borderRadius: 10,
                outline: 'none',
                paddingLeft: 10,
                paddingRight: 10
              }}
              placeholder='검색'
            />
          </div>
          <div style={{ fontSize: 30, marginLeft: 20, height: 30 }}>IF</div>
          <div style={styles.conditionComponentList}>
            <div style={{ overflowY: 'scroll' }}>
              {Object.keys(componentSchema.condition).map((key, i) => {
                if (key.match(this.state.searchKeyword)) {
                  return (<ComponentMenuItem key={i} style={styles.componentItem} label={key} onBeginDrag={this.onBeginDrag} component={componentSchema.condition[key]} />);
                }
                return (null);
              })}
            </div>
          </div>
          <div style={{ fontSize: 30, marginLeft: 20, height: 30 }}>Install</div>
          <div style={styles.installComponentList}>
            <div style={{ overflowY: 'scroll' }}>
              {Object.keys(componentSchema.install).map((key, i) => {
                if (key.match(this.state.searchKeyword)) {
                  return (<ComponentMenuItem key={i} style={styles.componentItem} label={key} onBeginDrag={this.onBeginDrag} component={componentSchema.install[key]} />);
                }
                return (null);
              })}
            </div>
          </div>
          <div style={{ fontSize: 30, marginLeft: 20, height: 30 }}>System</div>
          <div style={styles.systemComponentList}>
            <div style={{ overflowY: 'scroll' }}>
              {Object.keys(componentSchema.system).map((key, i) => {
                if (key.match(this.state.searchKeyword)) {
                  return (<ComponentMenuItem key={i} style={styles.componentItem} label={key} onBeginDrag={this.onBeginDrag} component={componentSchema.system[key]} />);
                }
                return (null);
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(TextEditor);
