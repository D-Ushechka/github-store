import React from 'react';

import styles from './ErrorComponent.module.scss';

const ErrorComponent: React.FC = () => {
  return (
    <div className={styles['error-text']}>
      Что-то пошло не так. Пожалуйста, перезагрузите страницу
    </div>
  );
};

export default React.memo(ErrorComponent);
