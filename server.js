const express = require('express');
const cors = require('cors');
const mongoConnect = require('./mongo/mongoConnect');

mongoConnect();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const apiRouter = require('./Routes/apiRouter');

app.use('/api', apiRouter);

app.listen(port, () => {
  console.log('connected');
});
