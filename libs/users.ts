import { db } from '../config/firebase';

export async function getAllUsers() {
  const snapshot = await db.collection('users').get();
  const users = [];
  snapshot.forEach((doc) => {
    users.push({ id: doc.id, ...doc.data() });
  });

  return users;
}
