import clsx from 'clsx';
import React from 'react';

import Loader from '@/components/ui/Loader';

import styles from './icon-button.module.scss';

interface IconButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  isLoading?: boolean;
  icon: string;
}

const IconButton: React.FC<IconButtonProps> = ({
  children,
  onClick,
  type = 'button',
  className,
  isLoading = false,
  icon,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={clsx(styles[`icon-button`], className, {
        [styles[`icon-button--loading`]]: isLoading,
      })}
      disabled={isLoading}
    >
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <img src={icon} alt="icon" className={styles[`icon-button__icon`]} />
          <span className={styles[`icon-button__text`]}>{children}</span>
        </>
      )}
    </button>
  );
};

export default IconButton;
