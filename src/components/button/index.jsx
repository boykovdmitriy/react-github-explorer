import * as React from 'react';
import cx from 'classnames';
import './Button.scss';

export const Button = ({
  styleType = 'default',
  onClick,
  className = 'custom_button',
  children,
  type = 'button',
  size = 'default',
  component: Component = 'button',
  ...restProps
}) => (
  <Component
    type={type}
    className={cx(
      className,
      `${className}--${styleType}`,
      `${className}--size-${size}`,
    )}
    onClick={onClick}
    {...restProps}
  >
    {children}
  </Component>
);
