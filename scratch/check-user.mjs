import mongoose from 'mongoose';

const MONGODB_URI = process.argv[2];
const EMAIL = process.argv[3] || 'ssguptaa222006@gmail.com';

async function checkUser() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');
    
    const db = mongoose.connection.db;
    const users = db.collection('users');
    
    // List all users
    const allUsers = await users.find({}, { projection: { name: 1, email: 1, role: 1, password: 1 } }).toArray();
    console.log(`\nTotal users in database: ${allUsers.length}`);
    allUsers.forEach(u => {
      console.log(`  - ${u.email} | role: ${u.role} | has password: ${!!u.password}`);
    });
    
    // Check specific user
    const user = await users.findOne({ email: EMAIL.trim().toLowerCase() });
    if (user) {
      console.log(`\nUser "${EMAIL}" FOUND:`);
      console.log(`  Name: ${user.name}`);
      console.log(`  Email: ${user.email}`);
      console.log(`  Role: ${user.role}`);
      console.log(`  Has password: ${!!user.password}`);
      console.log(`  Password length: ${user.password?.length || 0}`);
    } else {
      console.log(`\nUser "${EMAIL}" NOT FOUND in database!`);
      console.log('You need to register first at /register');
    }
    
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

checkUser();
