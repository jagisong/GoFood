const mongoose = require("mongoose");
const encodedPass = encodeURIComponent("gofood1234");

const mongoURI =
  "mongodb+srv://gofood:" +
  encodedPass +
  "@cluster0.gdlwyzx.mongodb.net/gofood?retryWrites=true&w=majority";

const mongoDB = () => {
  mongoose
    .connect(mongoURI)
    .then(async () => {
      console.log("connected");
      const fetched_data = await mongoose.connection.db.collection(
        "food_items"
      );
      const cursor = fetched_data.find({});
      const resultArray = await cursor.toArray();
      // console.log(resultArray);
      global.food_items = resultArray;
      // console.log(global.food_items);
      const fetched_data1 = await mongoose.connection.db.collection(
        "foodCategory"
      );
      const cursor1 = fetched_data1.find({});
      const resultArray1 = await cursor1.toArray();
      // console.log(resultArray1);
      global.foodCategory = resultArray1;

    })
    .catch((err) => {
      console.log("err", err.message);
    }); 
};

module.exports = mongoDB;
