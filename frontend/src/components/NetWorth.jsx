import React, { useState, useEffect } from 'react';
import RedBox from './RedBox';
import GrabStocks from './GrabStocks';
import { useStockEvaluation } from './context/StockEvaluationContext';
import UpdateNetworthBox from './UpdateNetworthBox';
import FinacneForm from './FinanceForm';
import { updateNetworth } from '../javascript/updateNetworth';
import { pullNetworth } from '../javascript/pullNetworth';
import { pullStockAmountFromDatabase } from '../javascript/pullStockAmountFromDatabase';
import { updateStocks } from '../javascript/updateStocks';

function NetWorth() {
  const [vooStockAmount, setVooStockAmount ] = useState(0);
  const [googlStockAmount, setGooglStockAmount ] = useState(0);
  const [pltrStockAmount, setPltrStockAmount ] = useState(0);
  const { stockEvaluation } = useStockEvaluation();
  const [totalNetworth, setTotalNetworth] = useState(0);
  const [accountBalance, setAccountBalance] = useState(0);

  const handleFinanceFormSubmit = async (selectedOption, currencyAmount, memo) => {

    if (selectedOption !== 'Investment'){
      try {
        const updatedAccountBalance = await updateNetworth(selectedOption, currencyAmount, memo);
        setAccountBalance(updatedAccountBalance);
        setTotalNetworth(Math.ceil((stockEvaluation + accountBalance) * 100) / 100);
      } catch (error) {
        console.error(error);
        setAccountBalance(0);
      }
    }
    else {
      try {
        const stockUpdate = await updateStocks(selectedOption, currencyAmount, memo);
        console.log(stockUpdate)
        const stockAmounts = stockUpdate.split(',');
        for (const stockEntry of stockAmounts) {
          const stock = stockEntry.split(':');
          if (stock[0].trim() === 'VOO') {
            setVooStockAmount(Number(stock[1].trim()));
          }
          if (stock[0].trim() === 'GOOGL') {
            setGooglStockAmount(Number(stock[1].trim()));
          }
          if (stock[0].trim() === 'PLTR') {
            setPltrStockAmount(Number(stock[1].trim()));
          }
        }
        // the last thing to do is to render the new pull stocks from database
        useEffect(() => {
          pullStockAmountFromDatabase();
        }, []);

      } catch (error) {
        console.error(error);
      }

    }
  };

  useEffect(() => {
    // this is done when both account balence and stock eveluation are ready 
    setTotalNetworth(Math.ceil((stockEvaluation + accountBalance) * 100) / 100);
  }, [stockEvaluation, accountBalance]);

  // pull networth is done when the component initally mounts
  useEffect(() => {
    Promise.all([pullNetworth(), pullStockAmountFromDatabase()])
      .then(([initialAccountBalance, result]) => {
        // Set account balance
        setAccountBalance(initialAccountBalance);
  
        // Parse and set stock amounts
        const stockAmounts = result.split(',');
        for (const stockEntry of stockAmounts) {
          const stock = stockEntry.split(':');
          if (stock[0].trim() === 'VOO') {
            setVooStockAmount(Number(stock[1].trim()));
          }
          if (stock[0].trim() === 'GOOGL') {
            setGooglStockAmount(Number(stock[1].trim()));
          }
          if (stock[0].trim() === 'PLTR') {
            setPltrStockAmount(Number(stock[1].trim()));
          }
        }

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
