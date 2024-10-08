const express = require('express');
const path = require('path');
const app = express();
const dotenv = require('dotenv');
const errorHandler = require('./middleware/errorHandler');

const routes = require('./routes');
dotenv.config()

const PORT = process.env.PORT || 3000;
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())
app.use(routes);
app.use(errorHandler)

app.listen(PORT, () => {
  console.log('Server is running on port ' + PORT);
});