import React, { useState } from 'react';
import "./Dropdown.scss";

const Dropdown = ({ id, options, selectedValue, onChange, disabledValues, disabledDropdown }) => {

  return (
    <div className='container'>
      <label htmlFor="dropdown" className='label'>Choose an option:</label>
      <select
        disabled={disabledDropdown}
        id={id}
        value={selectedValue}
        onChange={(e) => onChange(id, e.target.value)}
        className='select'
      >
        <option value="">-- Select an option --</option>
        {options.map((opt) => (
          <option
            key={opt.id}
            value={opt.id}
            disabled={disabledValues.includes(`${opt.id}`)}
          >
            {opt.nombre}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
