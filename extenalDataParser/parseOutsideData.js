const axios = require('axios');
const Product = require('../Models/productModel');

const externalJsonUrl =
  'https://msbit-exam-products-store.firebaseio.com/deliveryProducts/products.json';

module.exports = async () => {
  try {
    const data = await axios.get(externalJsonUrl);
    checkStracture(data.data);
  } catch (error) {
    console.log('From externalParser: ', error);
  }
};

const checkStracture = (data) => {
  data.map((item, index) => {
    if (Object.keys(item).length === 3) {
      getInnerObjects(item);
    } else {
      objectToModelParser(item);
    }
  });
};

// converts a single object to my product model and is saved in the DB

const objectToModelParser = async (obj) => {
  let objToSave = {
    extId: obj['id'],
    creationDate: obj['creationDate'],
    name: obj['name'],
    url: obj['url'],
    description: obj['description'],
    thumbnailUrl: obj['thumbnailUrl'],
    price: obj['price'],
    delivered: obj['status'] ? true : false,
    shipper: obj['type'],
  };
  // adding to db on every server restart. if product status changes to 1 in the original api.
  // it will also be updated as delivered in my database, also any info update from source will reflect in the DB
  // if a product is new , it will just be added with the create function.
  try {
    const product = await Product.findOne({ extId: objToSave.extId });
    if (product)
      await Product.findOneAndUpdate({ extId: objToSave.extId }, objToSave, {
        useFindAndModify: false,
      });
    else await Product.create(objToSave);
  } catch (error) {
    console.log('from objectToModel Parser: ', error);
  }
};

const getInnerObjects = (objData) => {
  for (const i in objData) {
    if (Array.isArray(objData[i])) {
      objData[i].map((item) => {
        item.type = objData['type'];
        item.status = objData['status'] ? true : false;
        objectToModelParser(item);
      });
    } else if (typeof objData[i] === 'object') {
      objData[i].type = objData['type'];
      objData[i].status = objData['status'];
      objectToModelParser(objData[i]);
    }
  }
};
