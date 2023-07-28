import { useState } from 'react';
import './select.css';
interface IOption {
  name: string;
  value: string;
}

interface ICustomSelect {
  options: IOption[];
  onChange: (e: string) => void;
}

const Select = ({ options, onChange }: ICustomSelect) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<IOption>({
    name: '',
    value: '',
  });

  const handleOptionClick = (option: IOption) => {
    setSelectedOption(option);
    setIsOpen(false);
    onChange(option.value);
  };

  return (
    <div className='custom-select'>
      <div className='selected-option' onClick={() => setIsOpen(!isOpen)}>
        {selectedOption?.name || 'Select an option'}
        <span className={`arrow arrow-color ${isOpen ? 'open' : ''}`}></span>
      </div>
      {isOpen && (
        <div className='options pokemon-details-container'>
          {options.map((option: IOption) => (
            <div
              key={option.value}
              className='option card-container '
              onClick={() => handleOptionClick(option)}
            >
              {option.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Select;
