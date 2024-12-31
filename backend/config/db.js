// import mongoose from 'mongoose';

// export const connectDB = async()=>{
//     await mongoose.connect('mongodb+srv://habibulrehman7861:418418As$@cluster0.y9ib3.mongodb.net/food-del').then(()=>console.log("Database Successfully Connected"));
// }

// const mongoose = require('mongoose');

// await mongoose.connect('mongodb+srv://habibulrehman7861:418418As$@cluster0.y9ib3.mongodb.net/food-del').then(()=>console.log("Database Successfully Connected"));

// mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log('MongoDB connected!'))
//   .catch(err => console.error('Connection error:', err));

import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    await mongoose.connect(
      'mongodb+srv://habibulrehman7861:418418As%24@cluster0.y9ib3.mongodb.net/food-del',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("Database Successfully Connected");
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1); // Exit the process with failure
  }
};


