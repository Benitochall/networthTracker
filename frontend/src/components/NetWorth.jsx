import React from 'react';
import RedBox from './RedBox';
import GrabStocks from './GrabStocks';
import { useTotalAmount } from './context/TotalAmountContext';

function NetWorth() {
  // const { header } = props
  const vooStockAmount = 2.91097;
  const googlStockAmount = 5;
  const pltrStockAmount = 15;
  const { totalAmount } = useTotalAmount();

  return (
    <>
      <div className="net-worth">
        <GrabStocks
          vooStockAmount={vooStockAmount}
          googlStockAmount={googlStockAmount}
          pltrStockAmount={pltrStockAmount}
        />
        <RedBox leftText="Net Worth:" rightText={totalAmount === 0 ? ('Calculating...') : (`$${totalAmount}`)} />
        <h1>Here is some text displayed</h1>
      </div>
    </>
  );
}

export default NetWorth;
