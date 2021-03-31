import React, { ReactElement } from 'react';
import { CSSTransition } from 'react-transition-group';
import classNames from 'classnames';
import Button from './Button';

export interface AlertProps {
  visible: boolean;
  text: string;
  onClose: () => void;
  className?: string;
}

function Alert({
  visible,
  text,
  onClose,
  className,
}: AlertProps): ReactElement {
  return (
    <CSSTransition classNames="alert" in={visible} timeout={300} unmountOnExit>
      <div className={classNames('alert', className)}>
        <p className="alert__text">{text}</p>
        <Button
          className="alert__button"
          title="Закрыть"
          color="blue"
          onClick={() => onClose()}
        />
      </div>
    </CSSTransition>
  );
}

export default Alert;
