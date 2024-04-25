import React, { useState, useEffect } from 'react';
import './App.css';
import './Componets/Card/card.css';
import './Componets/Exprensedate/exprensedate.css';
import './Componets/Expense_item/expense_item.css';
import Button from './Componets/Button/button.js';
import ExpenseForm from './Componets/Form/ExpenseForm.js';
import Filter from './Componets/Filter/filter.js';
import Table from './Componets/Filter/table.js';
import Loader from './Componets/Loader/Loader.js'; // Импорт компонента лоадера
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, updateDoc, deleteDoc, doc, getDoc } from "firebase/firestore";
import firebaseConfig from "./Componets/Database/firebase-config.json";
import { getExpenses, createExpense, updateExpense, deleteExpense } from './Componets/Exprenses/expensesServise.js'; // Импорт функций из сервиса

// Initialize Firebase app
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const expensesCollectionRef = collection(db, "expenses");

// Check database connection
const checkDatabaseConnection = async () => {
  try {
    const testDoc = await getDoc(doc(db, 'testCollection', 'testDoc'));
    console.log("Database connection established successfully.");
  } catch (error) {
    console.error("Error establishing database connection:", error);
  }
};
checkDatabaseConnection();

function App() {
  const [showForm, setShowForm] = useState(false);
  const [expenseList, setExpenseList] = useState([]);
  const [years, setYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState('');
  const [loading, setLoading] = useState(false); // Состояние для отслеживания загрузки

  useEffect(() => {
    fetchExpenses(); // Fetch expenses list when component loads
  }, []);

  useEffect(() => {
    const uniqueYears = [...new Set(expenseList.map(expense => new Date(expense.date).getFullYear()))]; // Get unique years
    setYears(uniqueYears.sort((a, b) => b - a)); // Set unique years to component state
  }, [expenseList]);

  // Определяем константу для времени задержки (в миллисекундах)
const LOADER_DELAY = 1000; // 
const fetchExpenses = async () => {
  setLoading(true); 
  const expenses = await getExpenses(); 

  
  setTimeout(() => {
    setExpenseList(expenses); 
    setLoading(false); 
  }, LOADER_DELAY); // Задержка на заданное количество миллисекунд
};

  const handleAddButtonClick = () => {
    setShowForm(true);
  };

  const handleAddExpense = async (newExpense) => {
    if (!newExpense.title.trim() || newExpense.amount.trim() === "" || isNaN(newExpense.amount) || !newExpense.date) {
      alert("Please enter a valid title, non-empty amount (a number), and date for the expense.");
      return;
    }
    
    const expenseId = await createExpense(newExpense); 
    if (expenseId) {
      fetchExpenses(); 
      setShowForm(false); 
    } else {
      alert("Failed to add expense. Please try again."); 
    }
  };

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  const handleDeleteExpense = async (expenseId) => {
    const isDeleted = await deleteExpense(expenseId); 
    if (isDeleted) {
      fetchExpenses(); 
    } else {
      alert("Failed to delete expense. Please try again."); 
    }
  };

  const filteredExpenses = selectedYear ? expenseList.filter(expense => new Date(expense.date).getFullYear() === parseInt(selectedYear)) : expenseList;

  return (
    <div className="App">
      <h2>My Expenses Template</h2>
      {showForm ? (
        <>
          <ExpenseForm onAddExpense={handleAddExpense} setShowForm={setShowForm} /> 
        </>
      ) : (
        <>
          <div className="button-container">
            <div className="background-around-button">
              <Button onClick={handleAddButtonClick}>Add new Expense</Button>
            </div>
          </div>
          <div className="content-container">
            <Filter years={years} selectedYear={selectedYear} onChange={handleYearChange} />
            {loading ? ( // Условное отображение loader
              <Loader />
            ) : (
              // Отображение таблицы после завершения загрузки
              <Table data={filteredExpenses} />
            )}
          </div>
        </>
      )}
      <div className="content-container">
        <div className="card expenses">
          {filteredExpenses.map(expense => (
            <div key={expense.id} className="card expense-item">
              <div className="expense-date">
                <div className="expense-date__month">
                  {expense.date && new Date(expense.date).toLocaleString('en-US', { month: 'long' })}
                </div>
                <div className="expense-date__year">
                  {expense.date && new Date(expense.date).getFullYear()}
                </div>
                <div className="expense-date__day">
                  {expense.date && new Date(expense.date).getDate()}
                </div>
              </div>
              <div className="expense-item__description">
                <h2>{expense.title || "No title"}</h2>
                <div className="expense-item__price">
                  ${expense.amount || 0}
                  <Button className="delete-button" onClick={() => handleDeleteExpense(expense.id)}>Delete</Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;