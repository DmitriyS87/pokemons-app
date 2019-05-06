import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const TABLE_TITLE = `POKEMONS LIST`;

const toolbarStyles = theme => ({
    root: {
      paddingRight: theme.spacing.unit,
    },
    spacer: {
      flex: '1 1 100%',
    },
    title: {
      flex: '0 0 auto',
    },
  });
  
  let EnhancedTableToolbar = props => {
    const { classes } = props;
  
    return (
      <Toolbar
        className={classes.root}
      >
      <div className={classes.title}>
            <Typography variant="h6" id="tableTitle">
              {TABLE_TITLE}
            </Typography>
        </div>
        <div  className={classes.spacer}/>
      </Toolbar>
    );
  };
  
  EnhancedTableToolbar.propTypes = {
    classes: PropTypes.object.isRequired
  };
  
  export default withStyles(toolbarStyles)(EnhancedTableToolbar);