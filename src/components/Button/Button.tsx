import React from 'react';
import './Button.css';

export type ButtonProps = {
  onClick?: (e: React.MouseEvent) => void;
  children: React.ReactNode;
  disabled: boolean;
};

const Button: React.FC<ButtonProps> = ({ onClick, children, disabled }) => (
  <button
    className="search-button search-button_hover search-button_disabled"
    onClick={onClick}
    disabled={disabled}
  >
    {children}
  </button>
);

export default Button;
