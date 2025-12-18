// const mongoose = require('mongoose');

// const connectDB = async () => {
// try {
//     await mongoose.connect(process.env.MONGO_URI, {
//      useNewUrlParser: true,
//       useUnifiedTopology: true 
//     });
// console.log('MongoDB connected successfully');

// } catch (err) {
// console.error('MongoDB connection error:', err.message);
// process.exit(1);
//   }
// };
// module.exports = connectDB;


const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Trim accidental hidden characters like \r or spaces
    if (process.env.MONGO_URI) {
      process.env.MONGO_URI = process.env.MONGO_URI.trim();
    }

    await mongoose.connect(process.env.MONGO_URI); // clean & modern (no deprecated options)

    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
    