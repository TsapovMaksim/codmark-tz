import React, { ReactElement } from 'react';
import classNames from 'classnames';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  onClick?: () => void;
  color?: 'red' | 'green' | 'blue';
}

function Button({
  title,
  onClick,
  className,
  color,
  type = 'button',
  disabled,
}: ButtonProps): ReactElement {
  return (
    <button
      onClick={onClick}
      className={classNames('button', className, {
        'button--red': color === 'red',
        'button--blue': color === 'blue',
        'button--green': color === 'green',
      })}
      type={type}
      disabled={disabled}
    >
      {title}
    </button>
  );
}

export default Button;
