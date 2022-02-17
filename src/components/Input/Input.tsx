import React from 'react';
import './Input.css';

export type InputProps = {
  value: string;
  placeholder: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Input: React.FC<InputProps> = ({ value, placeholder, onChange }) => {
  return (
    <input
      className="search-input search-input_disabled search-input_focus"
      placeholder={placeholder}
      type="text"
      value={value}
      onChange={onChange}
    />
  );
};

export default Input;
