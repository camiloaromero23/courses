import mongoose from "mongoose";
import mongooseCurrency from "mongoose-currency";

mongooseCurrency.loadType( mongoose );
const Currency = mongoose.Types.Currency;

const Schema = mongoose.Schema;

const commentSchema = new Schema(
  {
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    }
  },
  { timestamps: true }
);

const dishSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    comments: [commentSchema],
    image: {
      type: String,
      required: true
    },
    category: {
      type: String,
      required: true
    },
    label: {
      type: String,
      default: ''
    },
    price: {
      type: Currency,
      required: true,
      min: 0
    },
    featured: {
      type: Boolean,
      default: false,
    }
  },
  { timestamps: true }
);

export const Dishes = mongoose.model( 'Dish', dishSchema );
