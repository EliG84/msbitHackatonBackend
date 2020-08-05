const mongoose = require("mongoose");

module.exports = async () => {
  mongoose.connect(
    `mongodb+srv://${config.get("mUser")}:${config.get(
      "mPass"
    )}@speedtech.vyer8.gcp.mongodb.net/todoList1`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  );

  try {
    await mongoose.connect("mongodb://localhost:27017/test", {
      useNewUrlParser: true,
    });
  } catch (error) {
    console.log("from Mongo: ", error);
  }
};
