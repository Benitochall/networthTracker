import React from 'react';

const UpdateNetworthBox = () => {
  const boxStyle = {
    margin: '10',
    pading: '1px',
    display: 'flex',
    flex: '1', 
    height: '60px',

  };

  return (
    <div style={boxStyle}>
        <h1 style={{marginLeft: "30px"}}>Update net worth</h1>
    </div>
  );
};

export default UpdateNetworthBox;