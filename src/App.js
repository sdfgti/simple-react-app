import React, { useState, useEffect } from 'react';
import './App.css';
import './Componets/Card/card.css';
import './Componets/Exprensedate/exprensedate.css';
import './Componets/Expense_item/expense_item.css';
import { expenses } from './Componets/Exprenses/expenses.js';
import Button from './Componets/Button/button.js';
import ExpenseForm from './Componets/Form/ExpenseForm.js';
import Filter from './Componets/Filter/filter.js';
import Table from './Componets/Filter/table.js';

function App() {
  const [showForm, setShowForm] = useState(false);
  const [expenseList, setExpenseList] = useState(expenses);
  const [years, setYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState('');

  useEffect(() => {
    const uniqueYears = [...new Set(expenseList.map(expense => new Date(expense.date).getFullYear()))];
    setYears(uniqueYears.sort((a, b) => b - a)); 
  }, [expenseList]);

  const handleAddButtonClick = () => {
    setShowForm(true);
  };

  const handleAddExpense = (newExpense) => {
    if (newExpense.title && !isNaN(newExpense.amount) && newExpense.date) {
      setExpenseList([...expenseList, newExpense]); 
      setShowForm(false);
    } else {
      alert("Please enter a valid title, amount (a number), and date for the expense.");
    }
  };

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
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
            <Table data={filteredExpenses} />
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
                <div className="expense-item__price">${expense.amount || 0}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
