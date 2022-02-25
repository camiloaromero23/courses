import mongoose from "mongoose";

const Schema = mongoose.Schema

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
    }
  },
  { timestamps: true }
)

export const Dishes = mongoose.model( 'Dish', dishSchema )
