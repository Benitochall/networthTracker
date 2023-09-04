import { React, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useStockEvaluation } from './context/StockEvaluationContext';

function GrabStocks({ vooStockAmount, googlStockAmount, pltrStockAmount }) {
  const [output, setOutput] = useState('');
  const { updateStockEvaluation } = useStockEvaluation();

  const executePythonScript = async () => {
    const pythonScript = '/Users/benitochall/Documents/personalDevelopment/aboutMeProject/aboutMe/backend/pullStocks/pullstockdata.py';
    // const args = 'arg1 arg2'; Doesn't take any args
    // Notes to futures self, I had to change the executable permissions of the pull stocks data
    // as well as make sure the path was correct

    try {
      const response = await fetch('http://localhost:3001/executePython', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ pythonScript }),
      });

      if (!response.ok) {
        throw new Error('Failed to execute Python script');
      }

      const data = await response.json();
      setOutput(data.output);
    } catch (error) {
      console.error(error);
      setOutput('Error occurred while executing Python script');
    }
  };
  // this makes the fuction autmatically run while the data is being pulled
  useEffect(() => { executePythonScript(); });

  useEffect(() => {
    if (output && vooStockAmount && googlStockAmount && pltrStockAmount) {
      // Parse and calculate the StockEvaluation whenever output changes
      let vooNum;
      let pltrNum;
      let googlNum;

      const stocks = output.split(',');
      for (const stockEntry of stocks) {
        const stock = stockEntry.split(':');
        if (stock[0] === 'VOO') {
          vooNum = Number(stock[1]);
        }
        if (stock[0] === 'GOOGL') {
          googlNum = Number(stock[1]);
        }
        if (stock[0] === 'PLTR') {
          pltrNum = Number(stock[1]);
        }
      }

      const vooAmount = vooNum * Number(vooStockAmount);
      const googlAmount = googlNum * Number(googlStockAmount);
      const pltrAmount = pltrNum * Number(pltrStockAmount);
      const newStockEvaluation = vooAmount + googlAmount + pltrAmount;

      updateStockEvaluation(newStockEvaluation);
    }
  }, [output, vooStockAmount, googlStockAmount, pltrStockAmount]);
  return (
    <div>
      {/* need to return blank hrere */}
    </div>
  );
}

GrabStocks.propTypes = {
  vooStockAmount: PropTypes.number,
  googlStockAmount: PropTypes.number,
  pltrStockAmount: PropTypes.number,
};

GrabStocks.defaultProps = {
  vooStockAmount: 0,
  googlStockAmount: 0,
  pltrStockAmount: 0,
};

export default GrabStocks;
