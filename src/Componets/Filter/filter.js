import React from 'react';
import './filter.css';

const Filter = ({ years, selectedYear, onChange }) => {
  return (
    <div className="filter-container">
      <label htmlFor="year-select">Filter by Year:</label>
      <select id="year-select" value={selectedYear} onChange={onChange}>
        <option value="">All</option>
        {years.map(year => (
          <option key={year} value={year}>{year}</option>
        ))}
      </select>
    </div>
  );
};

export default Filter;
