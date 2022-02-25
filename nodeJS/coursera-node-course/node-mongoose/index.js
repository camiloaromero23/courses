import mongoose from 'mongoose';
import { Dishes } from './models/dishes.js'

const url = 'mongodb://localhost:27017/conFusion';
try {
  await mongoose.connect( url, {
    authSource: "admin",
    user: "root",
    pass: "root",
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } )
  let dish = await Dishes.create( {
    name: 'Dish',
    description: 'Dish description'
  } )
  dish = await Dishes.findByIdAndUpdate( dish._id, {
    $set: { description: 'Updated test' },
    new: true
  } ).exec()
  console.log( dish );
  dish.comments.push( {
    rating: 5,
    comment: "Nice dish",
    author: "Myself",
  } );
  dish = await dish.save();
  console.log( "Updated" );
  console.log( dish );
  await Dishes.deleteMany( {} )
  console.log( "Cleaned collection" );
} catch ( err ) {
  console.log( "Error 😢", err.message );
} finally {
  await mongoose.connection.close()
}
