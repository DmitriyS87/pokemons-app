import React from 'react';

import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

import SearchInput from '../search-input';

const rows = [
    { id: 'image', disablePadding: true, label: 'Avatar' },
    { id: 'hp', disablePadding: true, label: 'Hp' },
    { id: 'attack', disablePadding: true, label: 'Attack' },
    { id: 'defense', disablePadding: true, label: 'Defense' },
    { id: 'special-attack', disablePadding: true, label: 'Special Att' },
    { id: 'special-defense', disablePadding: true, label: 'Special Def' },
    { id: 'speed', disablePadding: true, label: 'Speed' },
    { id: 'accuracy', disablePadding: true, label: 'Accuracy' },
    { id: 'evasion', disablePadding: true, label: 'Evasion' },
    { id: 'types', disablePadding: false, label: 'Types' },
  ];
  
  class EnhancedTableHead extends React.Component {
    createChangeHandler = property => event => {
      this.props.onChangeInputHandler(event, property);
    };

    render() {
      return (
        <TableHead >
          <TableRow>
            <TableCell
              key="name"
              align="left"
              padding="default"
            >
            <SearchInput onChangeHandler={this.createChangeHandler("name")}/>
            </TableCell>
            {rows.map(
              row => (
                <TableCell
                  key={row.id}
                  align="center"
                  padding={row.disablePadding ? 'none' : 'default'}
                >
                    <label>
                      {row.label}
                    </label>
                </TableCell>
              ),
              this,
            )}
          </TableRow>
        </TableHead>
      );
    }
  }
  
  export default EnhancedTableHead;