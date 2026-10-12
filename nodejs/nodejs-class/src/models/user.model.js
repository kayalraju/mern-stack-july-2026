const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
    },
    phone: {
      type: String,
      required: [true, "Phone is required"],
    },
    image: {
      type: String,
      required: false,
      default: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    is_Active: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  {
    timestamps: true,
  },
);

const UserModel = mongoose.model("user", UserSchema);

module.exports = UserModel;
