import React from 'react';
import './Button.module.css';

const Button = props => {
  // set isMutatorButton variable to a boolean value if it equals a mutator
  const isMutatorButton = props.val === '+/-' || props.val === '%' || props.val === 'AC' || props.val === 'C';
  // set isArithButton variable to a boolean value if it equals an operator
  const isArithButton = props.val === '/' || props.val === '*' || props.val === '-' || props.val === '+' || props.val === '=';

  const handleClick = () => {
    props.onClick(props.val);
  }

  return(
    <button
      style={{fontSize:'2rem'}}
      className={`${props.className} ${isArithButton ? 'text-white' : ''} ${isMutatorButton ? 'text-dark':''}`}
      onClick={handleClick}
    >
      {props.children}
    </button>
  );
}

export default React.memo(Button);
