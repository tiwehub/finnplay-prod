import clsx from 'clsx';
import React from 'react';

import Loader from '@/components/ui/Loader';

import styles from './primary-button.module.scss';

interface PrimaryButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  isLoading?: boolean;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
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
      className={clsx(styles[`primary-button`], className, {
        [styles[`primary-button--loading`]]: isLoading,
      })}
      disabled={isLoading}
    >
      {isLoading ? <Loader /> : children}
    </button>
  );
};

export default PrimaryButton;
