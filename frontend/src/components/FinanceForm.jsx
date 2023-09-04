import React, { useState } from 'react';

const formContainerStyle = {
    display: 'flex',
    flexDirection: 'row',
    gap: '20px',
    marginLeft: '15px'
  };

  const labelStyle = {
    display: 'flex',
    flexDirection: 'column',
  };

  const inputStyle = {
    width: '150px',
  };
  const dropdownStyle = {
    height: '30px', // 
  };

  const submitStyle = {
    marginTop: '24px',
    height: '30px', // Adjust the width as needed
    borderColor: '#28464B',
    backgroundColor: '#42D9C8',
  };

function FinacneForm({ onSubmit }) {
  const [selectedOption, setSelectedOption] = useState('');
  const [ amount, setAmount] = useState('');
  const [memo, setMemo ] = useState(''); 

  // Dropdown options
  const dropdownOptions = ['Paycheck', 'Gift', 'Gas', 'Education', 'Rent', 'Food', 'Clothing', 'Travel', 'Misc', 'Investment', 'Add to Investment Account'];

  const handleDropdownChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleCurrencyInputChange = (event) => {
    setAmount(event.target.value);
  };

  const handleMemoChange = (event) => {
    setMemo(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(selectedOption, amount, memo)
  };

  return (
    <form style = {formContainerStyle} onSubmit={handleSubmit} className="form-container">
      <div>
      </div>
      <label style = {labelStyle}>
        Select Purchase/Payment:
        <select style = {dropdownStyle} value={selectedOption} onChange={handleDropdownChange}>
          <option value="">Select Purchase/Payment</option>
          {dropdownOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>
      <label style= {labelStyle}>
        Amount:
        <input 
          type="number"
          value={amount}
          onChange={handleCurrencyInputChange}
          placeholder="Enter amount"
          style = {inputStyle}
        />
      </label>
      <label style= {labelStyle}>
        Memo:
        <input 
          type="text"
          value={memo}
          onChange={handleMemoChange}
          placeholder="Memo"
          style = {inputStyle}
        />
      </label>
      <button style={submitStyle} type="submit">Submit</button>
    </form>
  );
}

export default FinacneForm;
