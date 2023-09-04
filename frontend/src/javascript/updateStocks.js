const executePythonScript = async (selectedOption, currencyAmount, memo) => {
    const pythonScript = '/Users/benitochall/Documents/personalDevelopment/aboutMeProject/aboutMe/backend/updateStocks/updateStocks.py';
    const args = `${selectedOption} ${currencyAmount} ${memo}`;
  
    try {
      const response = await fetch('http://localhost:3001/executePython', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ pythonScript, args }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to execute Python script');
      }
  
      const data = await response.json();
      return data.output; // Return the output from the Python script
    } catch (error) {
      console.error(error);
      throw new Error('Error occurred while executing Python script');
    }
};

const updateStocks = async (selectedOption, currencyAmount, memo) => {
    const databaseMap = {
        Investment: 'investment',
      };

    const database = databaseMap[selectedOption] || '';
    try {
      const output = await executePythonScript(database, currencyAmount, memo);
      return Number(output);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  
  export { updateStocks };
  