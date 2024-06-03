import clsx from 'clsx';
import React, { useState } from 'react';

import eyeIcon from '@/assets/img/icons/eye.svg';

import styles from './password-input.module.scss';

interface PasswordInputProps {
  id: string;
  name: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  label: string;
  className?: string;
  error?: string;
}

const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  (
    {
      id,
      name,
      value,
      onChange,
      placeholder,
      label,
      className,
      error,
      ...props
    },
    ref,
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    const togglePasswordVisibility = () => setShowPassword(!showPassword);
    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => {
      if (!value) {
        setIsFocused(false);
      }
    };

    return (
      <div className={styles[`password-input`]}>
        <input
          type={showPassword ? 'text' : 'password'}
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={clsx(styles[`password-input__input`], className)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          autoComplete="off"
          ref={ref}
          {...props}
        />
        <button
          type="button"
          className={styles[`password-input__toggle`]}
          onClick={togglePasswordVisibility}
        >
          <img src={eyeIcon} alt="Toggle Password Visibility" />
        </button>
        <label
          htmlFor={id}
          className={clsx(styles[`password-input__label`], {
            [styles[`password-input__label--focused`]]: isFocused || value,
            [styles[`password-input__label--unfocused`]]: !isFocused && !value,
          })}
        >
          {label}
        </label>
        {error && <p className={styles[`password-input__error`]}>{error}</p>}
      </div>
    );
  },
);

PasswordInput.displayName = 'PasswordInput';

export default PasswordInput;
