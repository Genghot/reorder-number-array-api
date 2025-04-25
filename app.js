const express = require('express');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

const app = express();
app.use(bodyParser.json());

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Reorder Number in Array API',
      version: '1.0.0',
      description: 'API to reorder an array of integers based on specified criteria',
    },
  },
  apis: ['app.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

/**
 * @swagger
 * /reorder:
 *   post:
 *     summary: Reorders an array of integers
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               numbers:
 *                 type: array
 *                 items:
 *                   type: integer
 *               order:
 *                 type: string
 *                 enum: [ascending, descending]
 *             required:
 *               - numbers
 *               - order
 *     responses:
 *       200:
 *         description: Successfully reordered the numbers
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 sorted_numbers:
 *                   type: array
 *                   items:
 *                     type: integer
 *       400:
 *         description: Invalid input
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       500:
 *         description: Internal server error
 */

app.post('/reorder', (req, res) => {
  const { numbers, order } = req.body;

  if (!Array.isArray(numbers) || !numbers.every(Number.isInteger) || (order !== 'ascending' && order !== 'descending')) {
    return res.status(400).json({ error: 'Input must be an array of integers and a valid order.' });
  }

  let sortedNumbers = [...numbers];
  sortedNumbers.sort((a, b) => (order === 'ascending' ? a - b : b - a));

  res.json({ sorted_numbers: sortedNumbers });
});

app.listen(3000, () => {
  console.log('Server is running on http://gggsolution.com:3000');
});

module.exports = app;