import React from 'react';
import propTypes from 'prop-types';
import Statement from './Statement.js';
import LineSpace from './LineSpace.js';

export default class EditorBody extends React.Component {
  render() {
    const {
      statementList,
      selectedRow,
      onDropStatement,
      onBeginDrag,
      onClickFold,
      onClickStatement,
      onChangeParam,
      onClickRemoveStatement,
      onFocusStatement
    } = this.props;

    let lastRow = 0;
    let shownStatementList = [];
    let shownStatementIndexList = []

    if (statementList.length > 0) {
      let foldedCount = 0;
      statementList.map((statement, i) => {
        if (foldedCount > 0) foldedCount -= 1;
        else {
          shownStatementList.push(Object.assign(statement, { row: i + 1 }));
          if (statement.children && statement.children.length > 0) {
            foldedCount = statement.children.length;
          }
        }
        return null;
      });
    }

    return (
      <div style={{ display: 'flex', flexDirection: 'row', width: '100%', height: '100%', overflowX: 'hidden', overflowY: 'scroll' }}>
        <div style={{ height: statementList.length * 30 + 800, position: 'relative', width: 50, borderWidth: '0px 1px 0px 0px', borderStyle: 'solid', borderColor: '#808080', color: '#808080' }}>
          {shownStatementList && shownStatementList.map((statement, i) => {
            return (<div key={i} style={{ fontSize: 10, fontStyle: 'normal', paddingTop: 10, height: 30, color: '#cdcdcd', textAlign: 'center' }}>{statement.row}</div>);
          })}
        </div>
        <div style={{ flex: 1, overflowX: 'scroll', overflowY: 'hidden' }}>
          {shownStatementList && shownStatementList.map((statement, i) => {
            return (
              <div key={i}>
                <LineSpace
                  row={statement.row}
                  spaceWidth={50}
                  spaceHeight={5}
                  maxColumn={i > 0 ? shownStatementList[i - 1].type === 'condition' ? shownStatementList[i - 1].column + 1 : shownStatementList[i - 1].column : 1}
                  onDropStatement={onDropStatement}
                />
                <Statement
                  row={statement.row}
                  column={statement.column}
                  columnWidth={50}
                  lineHeight={25}
                  statement={statement}
                  selectedRow={selectedRow}
                  onBeginDrag={onBeginDrag}
                  onClickFold={onClickFold}
                  onClickStatement={onClickStatement}
                  onChangeParam={onChangeParam}
                  onClickRemoveStatement={onClickRemoveStatement}
                  onFocusStatement={onFocusStatement}
                  foldable={statementList[statement.row] && statementList[statement.row].column === statement.column + 1}
                />
              </div>
            );
          })}
          <LineSpace
            row={statementList.length ? statementList.length + 1 : 1}
            spaceWidth={50}
            spaceHeight={800}
            maxColumn={shownStatementList.length ? (shownStatementList[shownStatementList.length - 1].type === 'condition' ? shownStatementList[shownStatementList.length - 1].column + 1 : shownStatementList[shownStatementList.length - 1].column) : 1}
            onDropStatement={onDropStatement}
          />
        </div>
      </div>
    );
  }
}
