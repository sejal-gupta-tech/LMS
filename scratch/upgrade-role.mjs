import mongoose from 'mongoose';

const MONGODB_URI = process.argv[2];
const EMAIL = 'ssguptaa222006@gmail.com';

async function upgradeRole() {
  await mongoose.connect(MONGODB_URI);
  console.log('Connected to MongoDB');
  
  const db = mongoose.connection.db;
  const result = await db.collection('users').updateOne(
    { email: EMAIL },
    { $set: { role: 'admin' } }
  );
  
  console.log(`Updated ${result.modifiedCount} user(s)`);
  
  const user = await db.collection('users').findOne({ email: EMAIL });
  console.log(`Verified: ${user.email} → role: ${user.role}`);
  
  await mongoose.disconnect();
}

upgradeRole();
