const mongo = require("mongoose");
const Schema = mongo.Schema;

const ItemSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    default: "No description left"
  }
});

module.exports = Item = mongo.model("item", ItemSchema);
