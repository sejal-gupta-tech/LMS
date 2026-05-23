import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const MONGODB_URI = process.argv[2];

async function testLogin() {
  await mongoose.connect(MONGODB_URI);
  console.log('Connected to MongoDB');
  
  const db = mongoose.connection.db;
  const users = db.collection('users');
  
  // Get all users and test password
  const allUsers = await users.find({}, { projection: { email: 1, password: 1, role: 1 } }).toArray();
  
  for (const user of allUsers) {
    const testPassword = 'sejal123';
    const match = await bcrypt.compare(testPassword, user.password);
    console.log(`${user.email} (${user.role}): password "sejal123" match = ${match}`);
  }
  
  // Now specifically test with the exact email
  console.log('\n--- Specific test for ssguptaa222006@gmail.com ---');
  const user = await users.findOne({ email: 'ssguptaa222006@gmail.com' });
  if (user) {
    console.log('Password hash:', user.password);
    console.log('Hash length:', user.password.length);
    const result = await bcrypt.compare('sejal123', user.password);
    console.log('bcrypt.compare result:', result);
  }
  
  await mongoose.disconnect();
}

testLogin();
