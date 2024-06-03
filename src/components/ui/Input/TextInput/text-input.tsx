import clsx from 'clsx';
import React, { useState } from 'react';

import styles from './text-input.module.scss';

interface TextInputProps {
  id: string;
  name: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  label: string;
  className?: string;
  error?: string;
}

const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
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
    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => {
      if (!value) {
        setIsFocused(false);
      }
    };

    return (
      <div className={styles['text-input']}>
        <input
          type="text"
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={clsx(styles[`text-input__input`], className)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          autoComplete="off"
          ref={ref}
          {...props}
        />
        <label
          htmlFor={id}
          className={clsx(styles[`text-input__label`], {
            [styles[`text-input__label--focused`]]: isFocused || value,
            [styles[`text-input__label--unfocused`]]: !isFocused && !value,
          })}
        >
          {label}
        </label>
        {error && <p className={styles[`text-input__error`]}>{error}</p>}
      </div>
    );
  },
);

TextInput.displayName = 'TextInput';

export default TextInput;
