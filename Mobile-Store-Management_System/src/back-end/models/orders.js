const mongoose = require("mongoose");
const ordersSchema = new mongoose.Schema(
  {
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

    first_name: {
      type: String,
    //   required: true,
      trim: true,
    },
    last_name: {
        type: String,
        // required: true,
        trim: true,
      },
    address: {
      type: String,
    //   required: true,
    //   unique: true,
    },
    city: {
      type: String,
    },
    phone: {
     type: String 
    },
    email: {
      type: String,
    },
    description: {
      type: String,
      
    },item:{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Orders", ordersSchema);
