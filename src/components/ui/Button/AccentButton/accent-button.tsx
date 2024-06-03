import clsx from 'clsx';
import React from 'react';

import Loader from '@/components/ui/Loader';

import styles from './accent-button.module.scss';

interface AccentButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  isLoading?: boolean;
}

const AccentButton: React.FC<AccentButtonProps> = ({
  children,
  onClick,
  type = 'button',
  className,
  isLoading = false,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={clsx(styles[`accent-button`], className, {
        [styles[`accent-button--loading`]]: isLoading,
      })}
      disabled={isLoading}
    >
      {isLoading ? <Loader /> : children}
    </button>
  );
};

export default AccentButton;
