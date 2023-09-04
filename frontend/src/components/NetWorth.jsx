import React, { useState, useEffect } from 'react';
import RedBox from './RedBox';
import GrabStocks from './GrabStocks';
import { useStockEvaluation } from './context/StockEvaluationContext';
import UpdateNetworthBox from './UpdateNetworthBox';
import FinacneForm from './FinanceForm';
import { updateNetworth } from '../javascript/updateNetworth';
import { pullNetworth } from '../javascript/pullNetworth';

function NetWorth() {
  const vooStockAmount = 2.91097;
  const googlStockAmount = 5;
  const pltrStockAmount = 15;
  const { stockEvaluation } = useStockEvaluation();
  const [totalNetworth, setTotalNetworth] = useState(0);
  const [accountBalance, setAccountBalance] = useState(0);

  const handleFinanceFormSubmit = async (selectedOption, currencyAmount) => {
    try {
      const updatedAccountBalance = await updateNetworth(selectedOption, currencyAmount);
      setAccountBalance(updatedAccountBalance);
      console.log(accountBalance);
      setTotalNetworth(Math.ceil((stockEvaluation + accountBalance) * 100) / 100);
    } catch (error) {
      console.error(error);
      setAccountBalance(0);
    }
  };

  useEffect(() => {
    // this is done when both account balence and stock eveluation are ready 
    setTotalNetworth(Math.ceil((stockEvaluation + accountBalance) * 100) / 100);
  }, [stockEvaluation, accountBalance]);

  // pull networth is done when the component initally mounts
  useEffect(() => {
    pullNetworth()
      .then((initialAccountBalance) => {
        setAccountBalance(initialAccountBalance);
      })
      .catch((error) => {
        console.error(error);
        setAccountBalance(0);
      });
  }, []);

  return (
    <>
      <div className="net-worth">
        <GrabStocks
          vooStockAmount={vooStockAmount}
          googlStockAmount={googlStockAmount}
          pltrStockAmount={pltrStockAmount}
        />
        <RedBox
          leftText="Net Worth:"
          rightText={stockEvaluation === 0 ? 'Calculating...' : `$${totalNetworth}`}
        />
        <h1
          style={{
            color: '#326771',
            fontSize: '54px',
            textAlign: 'left',
            paddingLeft: '15px',
          }}
        >
          Welcome Bennett!
        </h1>

        <div>
          <UpdateNetworthBox></UpdateNetworthBox>
          <FinacneForm onSubmit={handleFinanceFormSubmit}></FinacneForm>
        </div>
      </div>
    </>
  );
}

export default NetWorth;
