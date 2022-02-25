import React from 'react';

import './Input.css';

export type InputProps = {
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
};

const Input: React.FC<InputProps> = ({
  value,
  placeholder = 'Введите название организации',
  onChange,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    onChange(e.target.value);

  return (
    <input
      className="search-input"
      placeholder={placeholder}
      type="text"
      value={value}
      onChange={handleChange}
    />
  );
};

export default React.memo(Input);
