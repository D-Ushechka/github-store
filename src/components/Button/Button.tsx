import React from 'react';

import styles from './Button.module.scss';

export type ButtonProps = {
  onClick: (e: React.MouseEvent) => void;
  children: React.ReactNode;
  disabled?: boolean;
};

const Button: React.FC<ButtonProps> = ({ onClick, children, disabled }) => {
  var classNames = require('classnames');

  return (
    <button
      className={classNames(
        styles['search-button'],
        styles['search-button_hover'],
        {
          [styles['search-button_disabled']]: disabled,
        }
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default React.memo(Button);
