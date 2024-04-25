import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";
import firebaseConfig from "../Database/firebase-config.json";
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const expensesCollectionRef = collection(db, "expenses");


export const createExpense = async (expenseData) => {
  try {
    const docRef = await addDoc(expensesCollectionRef, expenseData);
    console.log("Документ создан с ID: ", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Ошибка при добавлении документа: ", error);
    return null;
  }
};

export const getExpenses = async () => {
  try {
    const querySnapshot = await getDocs(expensesCollectionRef);
    const expenses = [];
    querySnapshot.forEach((doc) => {
      expenses.push({ id: doc.id, ...doc.data() });
    });
    return expenses;
  } catch (error) {
    console.error("Ошибка при получении документов: ", error);
    return [];
  }
};

export const updateExpense = async (expenseId, newData) => {
  try {
    const expenseDocRef = doc(db, "expenses", expenseId);
    await updateDoc(expenseDocRef, newData);
    console.log("Документ успешно обновлен!");
    return true;
  } catch (error) {
    console.error("Ошибка при обновлении документа: ", error);
    return false;
  }
};

export const deleteExpense = async (expenseId) => {
  try {
    await deleteDoc(doc(db, "expenses", expenseId));
    console.log("Документ успешно удален!");
    return true;
  } catch (error) {
    console.error("Ошибка при удалении документа: ", error);
    return false;
  }
};