import React from 'react';
import './table.css';

const Table = ({ data }) => {
  const allMonths = Array.from({ length: 12 }, (_, index) => ({
    month: index,
    amount: 0
  }));
  data.forEach(expense => {
    const monthIndex = new Date(expense.date).getMonth();
    allMonths[monthIndex].amount += expense.amount;
  });
  const maxSpending = Math.max(...allMonths.map(month => month.amount));

  return (
    <div className="chart-container">
      {allMonths.map(month => (
        <div key={month.month} className="chart-item">
          <svg height="100%" width="100%">
            //svg столбци
            <rect x="0" y={`${100 - (month.amount / maxSpending) * 100}%`} width="14px" height={`${(month.amount / maxSpending) * 100}%`} fill="#310c75" rx="5" stroke="#000" strokeWidth="0.9" />
            <rect x="0" y={`${100 - ((month.amount / maxSpending) * 100 || 100)}%`} width="14px" height={`${((month.amount / maxSpending) * 100) || 100}%`} fill={`${month.amount > 0 ? '#310c75' : '#ADD8E6'}`} rx="5" stroke="#000" strokeWidth="0.9" />
          </svg>
          <div className="chart-label">{new Date(2024, month.month).toLocaleString('en-US', { month: 'long' })}</div>
        </div>
      ))}
    </div>
  );
};

export default Table;
