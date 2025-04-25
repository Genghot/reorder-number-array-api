const express = require('express');
const supertest = require('supertest');
const fs = require('fs');
const path = require('path');
const app = require('./app');

const testResults = { results: [] };

const runTests = async () => {
  try {
    const response = await supertest(app)
      .post('/reorder')
      .send({ numbers: [3, 1, 2], order: 'ascending' });
      
    const result = response.body;
    testResults.results.push({
      scenario: 'Reorder ascending',
      status: response.status,
      request: { numbers: [3, 1, 2], order: 'ascending' },
      result: result,
      passed: response.status === 200 && JSON.stringify(result.sorted_numbers) === JSON.stringify([1, 2, 3])
    });

    const response2 = await supertest(app)
      .post('/reorder')
      .send({ numbers: [1, 3, 2], order: 'descending' });
      
    const result2 = response2.body;
    testResults.results.push({
      scenario: 'Reorder descending',
      status: response2.status,
      request: { numbers: [1, 3, 2], order: 'descending' },
      result: result2,
      passed: response2.status === 200 && JSON.stringify(result2.sorted_numbers) === JSON.stringify([3, 2, 1])
    });

    const response3 = await supertest(app)
      .post('/reorder')
      .send({ numbers: [1, 'a', 3], order: 'ascending' });
      
    const result3 = response3.body;
    testResults.results.push({
      scenario: 'Invalid input',
      status: response3.status,
      request: { numbers: [1, 'a', 3], order: 'ascending' },
      result: result3,
      passed: response3.status === 400 && result3.error === 'Input must be an array of integers and a valid order.'
    });

  } catch (error) {
    console.error('Error running tests:', error);
  }

  fs.writeFileSync(path.join(__dirname, 'test-result.json'), JSON.stringify(testResults, null, 2));
};

app.get('/unit-test', (req, res) => {
  const resultsPath = path.join(__dirname, 'test-result.json');
  if (fs.existsSync(resultsPath)) {
    const results = fs.readFileSync(resultsPath);
    res.status(200).json(JSON.parse(results));
  } else {
    res.status(200).json({ results: [] });
  }
});

const startServer = async () => {
  await runTests();
  app.listen(3001, () => {
    console.log('Test server is running on http://localhost:3001');
  });
};

startServer();