import React, { useReducer, useCallback } from 'react';

const ArithContext = React.createContext(
  {
    number: '0',
    fullExpression: '',
    numberIsTouched: false,
    operatorIsTouched: false,
    handleNumClick: (num) => {},
    handleOperatorClick: (val) => {},
    handleMutateClick: (val) => {}
  }
);

const reducer = (state, action) => {
  switch(action.type){
    case '=':
      // evaluate the entered expression
      const evaluatedExpression = eval(state.fullExpression + ' '+state.number);
      // isInvalidExpression contains boolean if expression is divide by zero
      const isInvalidExpression = evaluatedExpression.toString() === 'Infinity' || evaluatedExpression.toString() === '-Infinity'  || Number.isNaN(evaluatedExpression);
      return {
        /* if isInvalidExpression is true then number state is set to error,
        else number is set to evaluatedExpression */
        number: isInvalidExpression ? 'Error' : evaluatedExpression.toString(),
        /* if the expression is invalid then set fullExpression state to an empty string,
        else set fullExpression to previous state value concatenated with state.number and =  */
        fullExpression: isInvalidExpression ? '' : state.fullExpression + ' ' +state.number + ' =',
        operator: '=',
        operatorIsTouched: false,
        numberIsTouched: false
      };
    case 'reEval':
      return {
        number:'0',
        // set fullExpression state to state.number concatenated with operator
        fullExpression: state.number+' '+action.payload.val,
        operator: null,
        operatorIsTouched:true,
        numberIsTouched: false
      };
    case 'clear':
      return {
        // set number state to clicked number
        number: action.payload.num,
        fullExpression: '',
        operator: null,
        operatorIsTouched: false,
        numberIsTouched: true
      };
    case 'pushOperator':
      return {
        ...state,
        number:'0',
        /* set fullExpression to previous fullExpression state,
         concatenated with number state concatenated with clicked operator */
        fullExpression: state.fullExpression + ' ' + state.number + ' ' + action.payload.val,
        operatorIsTouched:true,
        numberIsTouched: false,
      };
    case 'pushNumber':
      return {
        ...state,
        /* if previous number state is 0 and clicked number button is not a decimal point,
        then set number state to clicked number, else if previous number state contains a decimal point and decimal point button is clicked,
        then set number to previous number state, else set number state to previous number state concatenated with entered number */
        number: state.number === '0' && action.payload.num !== '.' ? action.payload.num : state.number.includes('.') && action.payload.num === '.' ? state.number : state.number + action.payload.num,//!state.number.toString().includes('.') ? state.number + action.payload.num : state.number === '0' ? state.number = action.payload.,//state.number.toString().includes('.') && action.payload.num === '.' ? state.number : state.number + action.payload.num,
        numberIsTouched: true,
      };
    case 'reset':
      return {
        // set state to orginal state
        number: '0',
        fullExpression:'',
        operator: null,
        operatorIsTouched:false,
        numberIsTouched: false
      };
    case 'mutateOperator':
      return {
        ...state,
        // switch last entered operator in fullExpression state to a new operator
        fullExpression: state.fullExpression.slice(0, state.fullExpression.length-1) + action.payload.val
      };
    case 'clearNumber':
      return {
        // set number state to zero and reset if numbers have been touched
        ...state,
        number:'0',
        numberIsTouched: false,
        operatorIsTouched: false
      };
    case 'negative':
      return {
        ...state,
        /* if number state is Error then set number state to previous number state,
        else set number state to previous number state multiplied by -1 */
        number: state.number === 'Error' ? state.number : state.number * -1 + ''
      };
    case 'percent':
      return {
        ...state,
        /* if number state is Error then set number state to previous number state,
        else set number state to previous number state divided by -1 */
        number: state.number === 'Error' ? state.number : state.number / 100 + ''
      };
    default:
      return state;
  };
};

export const ArithContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, {
    number: '0',
    fullExpression:'',
    operator: null,
    operatorIsTouched:false,
    numberIsTouched: false
  });

  const handleMutateClick = useCallback((val) => {
    //handle when a mutate button has been clicked
    switch(val){
      case 'AC':
        dispatch({ type: 'reset' });
        break;
      case 'C':
        dispatch({ type: 'clearNumber' });
        break;
      case '+/-':
        dispatch({ type: 'negative' });
        break;
      case '%':
        dispatch({ type: 'percent' });
        break;
      default:
        return;
    }
  },[dispatch]);

  const handleOperatorClick = useCallback(val => {
    if(state.number === 'Error'){
      return; //if there is an error and a operator button has been clicked, return.
    } else if(val === '='){
      if(state.operatorIsTouched){
        // if an operator button has been clicked and equals button has been clicked, evaluate expression
        return dispatch(
          {
            type: '='
          }
        );
      } else { /* if equals button has been clicked and an operator button has not been clicked, clear calculator */
        return dispatch(
          {
            type:'reset'
          }
        );
      };
    } else if(state.operator === '='){ /* if the equal button has been clicked,
      and an operator button is clicked, add operator to the fullExpression state
      */
        return dispatch(
          {
            type:'reEval',
            payload: {
              val: val
            }
          }
        );
    } else if(isNaN(state.fullExpression.slice(state.fullExpression.length - 1)) && !state.numberIsTouched){
      /* if an operator button has been clicked but a number button has not been clicked,
      change the operator */
        return dispatch(
          {
            type:'mutateOperator',
            payload: {
              val: val
            }
          }
        );
    } else { // if number button has been clicked, push operator to fullExpression state
      return dispatch(
        {
          type:'pushOperator',
          payload: {
            val: val
          }
        }
      );
    }
  },[dispatch, state.number, state.operatorIsTouched, state.operator, state.fullExpression, state.numberIsTouched]);

  const handleNumClick = useCallback((num) => {
    if(state.number === 'Error' && num ==='.'){
      /* if there is an Error and decimal point has been clicked,
      clear calculator and add "0." to number state */
      return dispatch(
        {
          type:'clear',
          payload: {
            num: '0'+num
          }
        }
      );
    } else if(state.operator === '='){
      if(num === '.'){
        /* if expression has been evaluated and decimal point button is clicked,
        clear fullExpression state and add "0." to number state */
        return dispatch(
          {
            type:'clear',
            payload: {
              num: '0'+num
            }
          }
        );
      } else {
        /* if expression has been evaluated and number button is clicked,
        clear fullExpression state and add num to number state */
          return dispatch(
            {
              type:'clear',
              payload: {
                num: num
              }
            }
          );
        };
      } else {
        /* add num to number state */
        return dispatch(
          {
            type:'pushNumber',
            payload: {
              num: num
            }
          }
        );
      };
  },[dispatch, state.number, state.operator,]);

  const contextValue = {
    number: state.number,
    fullExpression: state.fullExpression,
    numberIsTouched: state.numberIsTouched,
    operatorIsTouched: state.operatorIsTouched,
    handleNumClick: handleNumClick,
    handleOperatorClick: handleOperatorClick,
    handleMutateClick: handleMutateClick
  };

  return(
    <ArithContext.Provider value={contextValue}>
      {props.children}
    </ArithContext.Provider>
  );
};

export default ArithContext;
