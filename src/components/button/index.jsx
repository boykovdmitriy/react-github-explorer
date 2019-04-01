import * as React from 'react';
import cx from 'classnames';
import './Button.scss';

export const Button = ({
                         onClick,
                         className = 'custom_button',
                         children,
                         size = 'default',
                         type = 'button',
                         component: Component = 'button',
                         ...restProps
                       }) => (
  <Component
    type={type}
    className={cx(className, `${className}--size-${size}`)}
    onClick={onClick}
    {...restProps}
  >
    {children}
  </Component>
);
