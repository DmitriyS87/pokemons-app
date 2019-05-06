import React from 'react';
import { Input } from '@material-ui/core';

import PropTypes from 'prop-types';

class CheckboxTag extends React.Component {
  constructor(props) {
      super(props);
      this.baseColor = this.props.color;
      this.sameColor = 'white';
      this.state = {
        isChecked: true,
        color: this.baseColor,
        backgroundcolor: this.sameColor,
      };
  }

  toggleChange = (event) => {
    this.setState({
      isChecked: !this.state.isChecked,
      color: this.state.isChecked ? this.sameColor : this.baseColor,
      backgroundcolor: this.state.isChecked ? this.baseColor : this.sameColor,
    });
    this.props.onChangeCallback(event.target.name);
  }

  render() {
    const labelContainerStyle = {
        padding: '5px 10px 5px 10px',
        margin: '5px',
        borderRadius: '15px',
        backgroundColor: this.state.backgroundcolor,
        cursor: "pointer"
      }

      const labelStyle = {
        display: "flex", 
        alignItems: 'center',
        color: this.state.color,
        cursor: "pointer"
      }

      return <div style={labelContainerStyle}><label style={labelStyle}>
        <Input name={this.props.labelText} type="checkbox" style={{display: "none"}} checked={this.state.isChecked} onChange={this.toggleChange}/>
        {this.props.labelText}
        </label>
        </div>
  }
}

CheckboxTag.propTypes = {
  labelText: PropTypes.string.isRequired,
  onChangeCallback: PropTypes.func.isRequired,
  color: PropTypes.string.isRequired
};

export default CheckboxTag;

