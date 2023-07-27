// CustomSelect.js
import React, { useState } from 'react';

const CustomSelect = ({ options, onSelect }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');

  const handleOptionClick = (option: any) => {
    setSelectedOption(option);
    setIsOpen(false);
    onSelect(option);
  };

  return (
    <div className='custom-select'>
      <div className='selected-option' onClick={() => setIsOpen(!isOpen)}>
        {selectedOption || 'Select an option'}
        <span className={`arrow ${isOpen ? 'open' : ''}`}></span>
      </div>
      {isOpen && (
        <div className='options'>
          {options.map((option: any) => (
            <div
              key={option.value}
              className='option'
              onClick={() => handleOptionClick(option.value)}
            >
              {option.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
