import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const MONGODB_URI = process.argv[2];
const EMAIL = process.argv[3] || 'ssguptaa222006@gmail.com';
const NEW_PASSWORD = process.argv[4] || 'sejal123';

async function resetPassword() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');
    
    const db = mongoose.connection.db;
    const users = db.collection('users');
    
    const user = await users.findOne({ email: EMAIL.trim().toLowerCase() });
    if (!user) {
      console.log(`User "${EMAIL}" not found!`);
      await mongoose.disconnect();
      return;
    }
    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(NEW_PASSWORD, salt);
    
    await users.updateOne(
      { _id: user._id },
      { $set: { password: hashedPassword } }
    );
    
    console.log(`\nPassword reset successful!`);
    console.log(`  Email: ${EMAIL}`);
    console.log(`  New password: ${NEW_PASSWORD}`);
    console.log(`\nYou can now log in at localhost:3000/en/admin/login`);
    
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

resetPassword();
