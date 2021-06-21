import React from 'react';

const Container = (props) => {
  return(
    <div className={props.className}>
      {props.children}
    </div>
  );
}

export default React.memo(Container);
