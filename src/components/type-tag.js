import React from 'react';
import PropTypes from 'prop-types';

class TypeTag extends React.Component {
  render() {
      return <div key={this.props.name + this.props.id} style={{ color: this.props.color }}>{this.props.name}</div>
  }
}

TypeTag.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired
};

export default TypeTag;