import React, { useContext } from 'react';
import Container from './components/Container.js';
import Button from './components/UI/Button.js';
import Display from './components/Display.js';
import ArithContext from './store/arith-context.js';
import classes from './App.module.css';

const buttonNumbers = ['7', '8', '9', '4', '5', '6', '1', '2', '3', '0', '.'];
const buttonArith = ['/', '*', '-', '+', '='];
const buttonMutate = ['AC', '+/-', '%'];

function App() {
  const arithCtx = useContext(ArithContext);
  return (
      <React.Fragment>
        <Container className={classes['calculator-wrapper']}>
        <Display
          fullExpression={arithCtx.fullExpression}
          number={arithCtx.number}
        />
        <Container className={classes['button-container']}>
        <Container className={classes['integer-container']}>
          {
            buttonMutate.map((button, index) => {
              return(
                <Button
                  key={index}
                  val={button === 'AC' && (arithCtx.numberIsTouched === true || arithCtx.operatorIsTouched === true) ? 'C' : button}
                  className={`btn btn-secondary`}
                  onClick={arithCtx.handleMutateClick}
                >
                  {button === 'AC' && (arithCtx.numberIsTouched || arithCtx.operatorIsTouched) ? 'C' : button}
                </Button>
              );
            })
          }
          {
            buttonNumbers.map((num, index) => {
              return (
                <Button
                  key={index}
                  className={`btn btn-dark`}
                  onClick={arithCtx.handleNumClick}
                  val={num}
                >
                  {num}
                </Button>
              );
            })
          }
        </Container>
        <Container className={classes['operator-container']}>
          {
            buttonArith.map((val, index) => {
              return (
                <Button
                  key={index}
                  className={`btn btn-warning`}
                  onClick={arithCtx.handleOperatorClick}
                  val={val}
                >
                  {val}
                </Button>
              );
            })
          }
        </Container>
        </Container>
      </Container>
    </React.Fragment>
  );
};

export default App;
