const axios = require("axios");
const Product = require('../models/productModel');

const externalJsonUrl =
  "https://msbit-exam-products-store.firebaseio.com/deliveryProducts/products.json";

module.exports = async () => {
  try {
    const data = await axios.get(externalJsonUrl);
    data.data
  } catch (error) {
    console.log("From externalParser: ", error);
  }
};


module.exports = async () => {
    let data = await dataParser();
    data.map((item) => {
      if (item.type === 1) {
        if (Array.isArray(item.fedex)) {
          item.fedex.map((item) => console.log(item));
        } else {
          let product = {};
          product.name = item.fedex.name;
          product.id = item.fedex.id;
          product.description = item.fedex.description;
          product.price = item.fedex.price;
          product.url = item.fedex.url;
          product.thumbnailUrl = item.fedex.thumbnailUrl;
          console.log(product);
        }
      }
    });
  };
  
  const isArray = (obj,shipper) => {
      obj.shipper.map(item=>{
          let product = {
              name: item.name,
              id: item.id,
              description: item.description,
              price: item.price,
              url = item.url,
              thumbnailUrl = item.fedex.thumbnailUrl,
          };
          console.log(product);
      })
  };
  
  const isObj = (obj,shipper) => {
      let product = {
          name: obj[shipper].name,
          id: obj[shipper].id,
          description: obj[shipper].description,
          price: obj[shipper].price,
          url = obj[shipper].url,
          thumbnailUrl = obj[shipper].thumbnailUrl,
      };
      console.log(product);
  };
  
  const getShipperName = (obj) => {
    switch (obj.type) {
      case 1:
        return "fedex";
      case 2:
        return "ups";
      default:
        return "israel";
    }
  };