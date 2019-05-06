
import React from 'react';
import PropTypes from 'prop-types';
// import DevTools from 'mobx-react-devtools'

import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import Paper from '@material-ui/core/Paper';

import CheckboxLabels from '../checkbox-labels'
import EnhancedTableHead from './table-header';
import TablePaginationCustom from './table-pagination';
import EnhancedTableToolbar from './table-toolbar';
import PokemonsTable from './table-body';

const styles = theme => ({
  root: {
    width: '90%',
    marginTop: theme.spacing.unit * 3,
    marginLeft: theme.spacing.unit * 3
  },
  table: {
    minWidth: 1200,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
});


class PokemonsBoard extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <Paper className={classes.root}>
        {/* <div className={"MuiTableCell-root-109 MuiTableCell-body-111"}>
           <DevTools />
        </div> */}
        <EnhancedTableToolbar />
        <div className={classes.title}>
        <CheckboxLabels />
        </div>
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <EnhancedTableHead />
            <PokemonsTable />
          </Table>
        </div>
        <TablePaginationCustom />
      </Paper>
    );
  }
}

PokemonsBoard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PokemonsBoard);
