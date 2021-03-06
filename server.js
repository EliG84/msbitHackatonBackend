const express = require('express');
const cors = require('cors');
const mongoConnect = require('./mongo/mongoConnect');

const port = process.env.PORT || 3001;
const app = express();

mongoConnect();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const apiRouter = require('./Routes/apiRouter');

app.use('/api', apiRouter);

app.listen(port, () => {
  console.log('connected');
});
