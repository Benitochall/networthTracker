const cors = require('cors');
const express = require('express');
const { exec } = require('child_process');

const app = express();
app.use(cors());
const port = 3001; // this is the server I will run on 

app.use(express.json());

app.post('/executePython', (req, res) => {
  const { pythonScript, args } = req.body;

  exec(`python ${pythonScript} ${args}`, (error, stdout, stderr) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ error: 'Failed to execute Python script' });
    }
    console.log(stdout);
    res.json({ output: stdout });
  });
});

// // this posts the other function I need to run
// app.post('/executeUpdateFinances', (req, res) => {
//   const { pythonScript, args } = req.body;

//   exec(`python ${pythonScript} ${args}`, (error, stdout, stderr) => {
//     if (error) {
//       console.error(error);
//       return res.status(500).json({ error: 'Failed to execute Python script' });
//     }
//     console.log(stdout);
//     res.json({ output: stdout });
//   });
// });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
