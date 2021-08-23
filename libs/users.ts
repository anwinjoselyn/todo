import { db } from '../config/firebase';

export async function getAllUsers() {
  const snapshot = await db.collection('users').get();
  const users = [];
  snapshot.forEach((doc) => {
    users.push({ id: doc.id, ...doc.data() });
  });

  return users;
}

export async function getUser(id: string) {
  const snapshot = await db
    .collection('users')
    .where('uid', '==', id)
    .get();
  const user = [];
  snapshot.forEach((doc) => {
    user.push({ id: doc.id, ...doc.data() });
  });

  return user;
}