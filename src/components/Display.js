import React from 'react';
import Container from './Container.js';
import classes from './Display.module.css';

const Display = (props) => {
  return(
    <Container className={classes.display}>
      <p className={classes.expression}>{props.fullExpression}</p>
      <p className={classes.number}> {props.number}</p>
    </Container>
  );
}

export default React.memo(Display);
