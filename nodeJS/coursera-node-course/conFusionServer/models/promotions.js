import mongoose from "mongoose";
import mongooseCurrency from 'mongoose-currency';

mongooseCurrency.loadType( mongoose );

const Currency = mongoose.Types.Currency;
const Schema = mongoose.Schema;

const promotionSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true
    },
    label: {
      type: String,
      default: ''
    },
    price: {
      type: Currency,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    featured: {
      type: Boolean,
      default: false
    },
  },
  { timestamps: true }
);

export const Promotions = mongoose.model( 'Promotion', promotionSchema );
