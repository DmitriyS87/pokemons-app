import React from 'react';
import { inject } from 'mobx-react';


class SearchInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {term: '', placeholder: 'Name'};
    this.handleChange = this.handleChange.bind(this);
    this.onFocusHandler = this.onFocusHandler.bind(this);
    this.onBlurHandler = this.onBlurHandler.bind(this);
  }

  handleChange(event) {
    const term = event.target.value;
    this.props.store.searchTerm = term;
    this.setState({ term });
  }

  onFocusHandler() {
    this.setState({placeholder: ''});
  }

  onBlurHandler() {
    this.setState({placeholder: 'Name'});
  }

  render() {
      return <input type="text" name="name" value={this.state.term} placeholder={this.state.placeholder} onChange={this.handleChange} onFocus={this.onFocusHandler} onBlur={this.onBlurHandler}/>
  }
}

export default inject('store')(SearchInput);