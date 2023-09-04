import {
  React, createContext, useContext, useState,
} from 'react';

import PropTypes from 'prop-types';

const StockEvaluationContext = createContext();

export function useStockEvaluation() {
  return useContext(StockEvaluationContext);
}

export function StockEvaluationProvider({ children }) {
  const [stockEvaluation, setStockEvaluation] = useState(0);

  const updateStockEvaluation = (newStockEvaluation) => {
    setStockEvaluation(newStockEvaluation);
  };

  return (
    <StockEvaluationContext.Provider value={{ stockEvaluation, updateStockEvaluation }}>
      {children}
    </StockEvaluationContext.Provider>
  );
}
StockEvaluationProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
