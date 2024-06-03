import clsx from 'clsx';
import React, { useEffect, useState } from 'react';

import searchIcon from '@/assets/img/icons/search.svg';

import styles from './filter-input.module.scss';

interface FilterInputProps {
  id: string;
  name: string;
  placeholder?: string;
  className?: string;
  onIconClick?: () => void;
  onSearch: (query: string) => void;
  reset: boolean;
}

const FilterInput: React.FC<FilterInputProps> = ({
  id,
  name,
  placeholder = 'Search',
  className,
  onIconClick,
  onSearch,
  reset,
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (reset) {
      setQuery('');
    }
  }, [reset]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    onSearch(event.target.value);
  };

  return (
    <div className={clsx(styles[`filter-input`], className)}>
      <input
        id={id}
        name={name}
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={handleInputChange}
        className={styles[`filter-input__input`]}
      />
      <button
        type="button"
        onClick={onIconClick}
        className={styles[`filter-input__button`]}
      >
        <img
          src={searchIcon}
          alt="Search"
          className={styles[`filter-input__icon`]}
        />
      </button>
    </div>
  );
};

export default FilterInput;
