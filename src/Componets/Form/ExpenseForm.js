import React, { useState } from 'react';
import './form.css'; 

const ExpenseForm = ({ onAddExpense, setShowForm }) => {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const expenseData = {
      title: title,
      amount: amount,
      date: date
    };
    onAddExpense(expenseData); 
    setTitle('');
    setAmount('');
    setDate('');
    setShowForm(false);
  };

  const handleCancel = () => {
    setTitle('');
    setAmount('');
    setDate('');
    setShowForm(false); 
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <div className="row">
        <label className="title-label">Title:</label>
        <input type="text" value={title} onChange={handleTitleChange} />
        <label className="amount-label">Amount:</label>
        <input type="number" value={amount} onChange={handleAmountChange} />
      </div>
      <div className="row">
        <label className="date-label">Date:</label>
        <input type="date" value={date} onChange={handleDateChange} />
      </div>
      <div className="form-actions">
        <button type="submit">Add Expense</button>
        <button type="button" onClick={handleCancel}>Cancel</button>
      </div>
    </form>
  );
};

export default ExpenseForm;
