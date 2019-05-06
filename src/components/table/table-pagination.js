import React from 'react';
import TablePagination from '@material-ui/core/TablePagination';
import { inject, observer } from 'mobx-react';

class TablePaginationCustom extends React.Component {

    constructor(props) {
     super(props);
     this.MaterialPagination = TablePagination;
    }

    handleChangePage = (event, page) => {
        this.props.store.setState({
            currentPage: page
          });
      };
    
      handleChangeRowsPerPage = event => {
        const rowsPerPage = event.target.value;
        this.props.store.setState({
          rowsPerPage: rowsPerPage,
        });
      };

  render() {
    const page = this.props.store.currentPage;
    const rowsPerPage = this.props.store.rowsCount;
    const count = this.props.store.state.pokemonsCount;

      return (<this.MaterialPagination
        rowsPerPageOptions={[10, 20, 50]}
        component="div"
        count={count}
        rowsPerPage={rowsPerPage}
        page={page}
        backIconButtonProps={{
          'aria-label': 'Previous Page',
        }}
        nextIconButtonProps={{
          'aria-label': 'Next Page',
        }}
        onChangePage={this.handleChangePage}
        onChangeRowsPerPage={this.handleChangeRowsPerPage}
      />);
  }
}

export default inject('store')(observer(TablePaginationCustom));

