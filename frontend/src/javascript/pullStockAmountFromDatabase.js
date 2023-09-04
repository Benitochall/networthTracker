

const executePythonScript = async () => {
    const pythonScript = '/Users/benitochall/Documents/personalDevelopment/aboutMeProject/aboutMe/backend/pullStocks/pullStockDataBase.py';
  
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
      return data.output; // Return the output from the Python script
    } catch (error) {
      console.error(error);
      throw new Error('Error occurred while executing Python script');
    }
  };
  
  const pullStockAmountFromDatabase = async () => {
    try {
      const output = await executePythonScript();
      return output;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  
  export { pullStockAmountFromDatabase };
  