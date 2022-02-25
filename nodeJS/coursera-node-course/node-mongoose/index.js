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
  const newDish = Dishes( {
    name: 'Dish',
    description: 'Dish description'
  } )
  await newDish.save()
  const res = await Dishes.find( {} ).exec()
  console.log( res );
  await Dishes.deleteMany( {} )
  console.log( "Cleaned collection" );
} catch ( err ) {
  console.log( "Error 😢", err.message );
} finally {
  await mongoose.connection.close()
}
