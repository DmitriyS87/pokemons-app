import React from 'react';
import { observer, inject } from 'mobx-react';

import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';

import Pokemon from '../pokemon';

class PokemonsTable extends React.Component {
   render() {
      return <React.Fragment>
           <TableBody >
                {this.props.store.displayList.slice().map((pokemon, index) => {
                  return (
                    <TableRow
                      hover
                      tabIndex={-1}
                      key={index}
                    >
                      <Pokemon item={pokemon} />
                    </TableRow>
                  );
                })}
            </TableBody>
      </React.Fragment>
  }
}
export default (inject('store')(observer(PokemonsTable)))


