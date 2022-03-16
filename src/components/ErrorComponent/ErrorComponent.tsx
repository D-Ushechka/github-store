import React from 'react';

import styles from './ErrorComponent.module.scss';

export type ErrorComponentProps = {
  visible: boolean;
};

const ErrorComponent: React.FC<ErrorComponentProps> = ({ visible }) => {
  if (visible)
    return (
      <div className={styles['error-text']}>
        Что-то пошло не так. Пожалуйста, перезагрузите страницу
      </div>
    );
  else return <div className={styles.unvisible}></div>;
};

export default React.memo(ErrorComponent);
