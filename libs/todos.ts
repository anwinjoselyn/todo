import { db } from '../config/firebase';

export async function getOneTodo(id: any) {
  const snapshot = await db.collection('todos').where('id', '==', id).get();
  const todos = [];
  snapshot.forEach((doc) => {
    todos.push({ id: doc.id, ...doc.data() });
  });

  return todos;
}

export async function getUserTodos(userId: any) {
  const snapshot = await db
    .collection('todos')
    .where('authorId', '==', userId)
    .get();
  const todos = [];
  snapshot.forEach((doc) => {
    todos.push({ id: doc.id, ...doc.data() });
  });

  return todos;
}

export async function getAllTodos() {
  const snapshot = await db.collection('todos').get();
  const todos = [];
  snapshot.forEach((doc) => {
    todos.push({ id: doc.id, ...doc.data() });
  });

  return todos;
}

export function createTodo(data: any) {
  return db
    .collection('todos')
    .add(data)
    .then(() => {
      return {
        success: true,
      };
    })
    .catch(() => {
      return {
        success: false,
      };
    });
}

export async function deleteTodo(id: any) {
  try {
    await db
      .collection('todos')
      .doc(id)
      .delete();
    return {
      success: true,
    };
  } catch (e) {
    return {
      success: false,
    };
  }
}

export function updateTodo(id: any, data: any) {
  return db
    .collection('todos')
    .doc(id)
    .update(data)
    .then(() => {
      return {
        success: true,
      };
    })
    .catch(() => {
      return {
        success: false,
      };
    });
}
