import React from 'react';
import PropTypes from 'prop-types';

const RedBox = ({ leftText, rightText }) => {
  const boxStyle = {
    backgroundColor: '#BB0A21',
    width: '100vw',
    height: '100px',
    padding: '20px',
    boxSizing: 'border-box',
    color: 'white',
    textAlign: 'left',
    fontSize: '40px',
    fontWeight: 'bold',
    display: 'flex',
    justifyContent: 'space-between',

  };

  return (
    <div style={boxStyle}>
      <div>{leftText}</div>
      <div>{rightText}</div>
    </div>
  );
};

RedBox.propTypes = {
  leftText: PropTypes.string,
  rightText: PropTypes.string,
};

RedBox.defaultProps = {
  leftText: 'Net Worth',
  rightText: '$0',
};

export default RedBox;
