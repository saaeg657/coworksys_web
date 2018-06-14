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

    let lastRow = 1;
    let hiddenStatementIndexList = [];

    if (statementList.length > 0) {
      statementList.map((statement, i) => {
        if (statement.children && statement.children.length > 0) {
          hiddenStatementIndexList = hiddenStatementIndexList.concat(statement.children.map(v => (v + i + 1)));
        }
        return null;
      });
    }

    return (
      <div style={{ display: 'flex', flexDirection: 'row', width: '100%', height: '100%', overflowX: 'hidden', overflowY: 'scroll' }}>
        <div style={{ height: statementList.length * 30 + 800, position: 'relative', width: 50, borderWidth: '0px 1px 0px 0px', borderStyle: 'solid', borderColor: '#808080', color: '#808080' }}>
          {statementList && statementList.map((statement, i) => {
            if (hiddenStatementIndexList.indexOf(i + 1) === -1) {
              return (<div key={i} style={{ fontSize: 10, fontStyle: 'normal', paddingTop: 10, height: 30, color: '#cdcdcd', textAlign: 'center' }}>{i + 1}</div>);
            }
            return (null);
          })}
        </div>
        <div style={{ flex: 1, overflowX: 'scroll', overflowY: 'hidden' }}>
          {statementList && statementList.map((statement, i) => {
            if (hiddenStatementIndexList.indexOf(i + 1) === -1) {
              lastRow = i + 1;
              return (
                <div key={i}>
                  <LineSpace
                    row={i + 1}
                    spaceWidth={50}
                    spaceHeight={5}
                    maxColumn={i > 0 ? statementList[i - 1].type === 'condition' ? statementList[i - 1].column + 1 : statementList[i - 1].column : 1}
                    onDropStatement={onDropStatement}
                  />
                  <Statement
                    row={i + 1}
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
                    foldable={statementList[i + 1] && statementList[i + 1].column === statement.column + 1}
                  />
                </div>
              );
            }
            return (null);
          })}
          <LineSpace
            row={statementList.length ? statementList.length + 1 : 1}
            spaceWidth={50}
            spaceHeight={800}
            maxColumn={statementList.length ? (statementList[lastRow - 1].type === 'condition' ? statementList[lastRow - 1].column + 1 : statementList[lastRow - 1].column) : 1}
            onDropStatement={onDropStatement}
          />
        </div>
      </div>
    );
  }
}
