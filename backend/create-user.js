import mongoose from 'mongoose';
import User from './models/user.js';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

async function createUser() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB connected');

    // Get arguments from command line
    const args = process.argv.slice(2);
    const name = args[0] || 'Admin User';
    const email = args[1] || 'admin@example.com';
    const password = args[2] || 'admin123';
    const role = args[3] || 'admin'; // can be 'admin' or 'student'

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('❌ User with this email already exists');
      await mongoose.disconnect();
      process.exit(1);
    }

    const user = await User.create({
      name,
      email,
      passwordHash,
      role
    });

    console.log('✅ User created:', {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    });

    await mongoose.disconnect();
    console.log('MongoDB disconnected');
    process.exit(0);
  } catch (err) {
    console.error('❌ Error:', err.message);
    process.exit(1);
  }
}

createUser();
