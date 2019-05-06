import React from 'react';
import PropTypes from 'prop-types';

import TableCell from '@material-ui/core/TableCell';
import Avatar from '@material-ui/core/Avatar';
import TypeTag from './type-tag.js';
import { inject } from 'mobx-react';

const STATS_SEQUENCE = ['hp', 'attack', 'defense', 'special-attack', 'special-defense', 'speed', 'accuracy', 'evasion']

class Pokemon extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        dataLoaded: false,
        data: {}
      }
  }

  dataCells(isLoaded) {
    if (isLoaded) {
      return (<React.Fragment>
        <TableCell align="left">
        <Avatar alt="img" src={this.state.data.avatar} />
        </TableCell>
        {STATS_SEQUENCE.map((stat) => {
          return <TableCell key={this.state.data.id + stat} align="right">{this.state.data[stat]}</TableCell>
        })}
        <TableCell align="right">
        {this.state.data.types.map((type) => {
          return <TypeTag key={this.state.data.id + type.name[0]} name={type.name[0]} color={type.color} id={this.state.data.id + type.name[0]} />
        })}
        </TableCell>
        </React.Fragment>
    );
    }
    return false;   
  }

  componentDidUpdate(prevProps) {
    if (this.props.item !== prevProps.item) {
      this.props.store.getPokemonData(this.item)
    .then((data) => {
      this.setState({
        data: data
      })
    })
    }
  }

  componentDidMount() {
    var self = this;
    this.props.store.getPokemonData(this.item)
    .then((data) => {
      self.setState({
        dataLoaded: true,
        data: data
      })
    })
  }

  render() {
      this.item = this.props.item;

      return (<React.Fragment>
        <TableCell component="th" scope="row" padding="default">
          {this.item.name}
        </TableCell>
        {this.dataCells(this.state.dataLoaded)}
        </React.Fragment>)
  }
}

Pokemon.propTypes = {
  item: PropTypes.object.isRequired,
};

export default inject('store')(Pokemon);
