const mongoose = require('mongoose');
const config = require('config');
const externalDataParser = require('../extenalDataParser/parseOutsideData');

module.exports = async () => {
  try {
    await mongoose.connect(config.get('atlasUrl'), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('connected to atlas');
    externalDataParser();
  } catch (error) {
    console.log('from Mongo: ', error);
  }
};
