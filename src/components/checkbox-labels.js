import React from 'react';
import { inject } from 'mobx-react';

import { withStyles } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import FormGroup from '@material-ui/core/FormGroup';

import CheckboxTag from './checkbox-tag'


const TYPES_MAP = new Map([
    ["normal" , "Silver"], 
    ["fighting" , "YellowGreen"],
    ["flying" , "Fuchsia"],
    ["poison" , "Purple"],
    ["ground" , "Red"],
    ["rock" , "Maroon"],
    ["bug" , "Yellow"],
    ["ghost" , "Olive"],
    ["steel" , "Lime"],
    ["fire"  , "Green"],
    ["water"  , "Aqua"],
    ["grass"  , "Teal"],
    ["electric"  , "Blue"],
    ["psychic"  , "Navy"],
    ["ice"  , "Chocolate"],
    ["dragon"  , "DarkGoldenRod"],
    ["dark"  , "DarkSlateBlue"],
    ["fairy"  , "OrangeRed"],
    ["unknown" , "DarkSlateGray"],
    ["shadow" , "Gray"]
]);


const names = [];
const makeInitialState = () => {
  const innitialState = {};   

  for(let name of TYPES_MAP.keys()) {
    innitialState[name] = true;
    names.push(name);
}
return innitialState;
};


const styles = {
  root: {
    color: green[600],
    '&$checked': {
      color: green[500],
    },
  },
  checked: {
  }
};

class CheckboxLabels extends React.Component {
constructor(props) {
    super(props);
    this.state = makeInitialState();
    
    this.handleClick = this.handleClick.bind(this);
}

  handleClick(name) {
    this.props.store._filterByTags(name);
  }

  render() {
    const tagsContainerStyles = {
      padding: '5px 10px 5px 10px',
      display: 'flex', 
      flexWrap: 'wrap',
      alignContent: 'space-between',
    }
      
    return ( 
      <FormGroup row>
      <div style={tagsContainerStyles}>
      {names.map((name, index) => {
        return <CheckboxTag
          key={'checkbox' + index}
          labelText={name}
          onChangeCallback={this.handleClick}
          color={TYPES_MAP.get(name)}
        />
      })
      }
      </div>
      </FormGroup>
      );
  }
}

export default withStyles(styles)(inject('store')(CheckboxLabels));