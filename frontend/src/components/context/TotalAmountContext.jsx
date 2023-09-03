import {
  React, createContext, useContext, useState,
} from 'react';

import PropTypes from 'prop-types';

const TotalAmountContext = createContext();

export function useTotalAmount() {
  return useContext(TotalAmountContext);
}

export function TotalAmountProvider({ children }) {
  const [totalAmount, setTotalAmount] = useState(0);

  const updateTotalAmount = (newTotalAmount) => {
    setTotalAmount(newTotalAmount);
  };

  return (
    <TotalAmountContext.Provider value={{ totalAmount, updateTotalAmount }}>
      {children}
    </TotalAmountContext.Provider>
  );
}
TotalAmountProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
