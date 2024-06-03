import clsx from 'clsx';
import React, { useEffect, useState } from 'react';

import styles from './filter-range.module.scss';

interface FilterRangeProps {
  title: string;
  min: number;
  max: number;
  defaultValue: number;
  onChange: (value: number) => void;
  reset: boolean;
}

const FilterRange: React.FC<FilterRangeProps> = ({
  title,
  min,
  max,
  defaultValue,
  onChange,
  reset,
}) => {
  const [value, setValue] = useState<number>(defaultValue);

  useEffect(() => {
    if (reset) {
      setValue(defaultValue);
    }
  }, [reset, defaultValue]);

  const handleSliderChange = (newValue: number) => {
    setValue(newValue);
    onChange(newValue);
  };

  const handleButtonClick = (newValue: number) => {
    if (newValue >= min && newValue <= max) {
      handleSliderChange(newValue);
    }
  };

  return (
    <div className={styles[`filter-range`]}>
      <h4 className={styles[`filter-range__title`]}>{title}</h4>
      <div className={styles[`filter-range__container`]}>
        {Array.from({ length: max - min + 1 }, (_, i) => (
          <button
            key={i}
            onClick={() => handleButtonClick(min + i)}
            className={clsx(
              styles[`filter-range__button`],
              value >= min + i
                ? styles[`filter-range__button--active`]
                : styles[`filter-range__button--inactive`],
            )}
          >
            {min + i}
          </button>
        ))}
        <div className={styles[`filter-range__background`]}></div>
        <div
          className={styles[`filter-range__foreground`]}
          style={{ width: `${((value - min) / (max - min)) * 100}%` }}
        ></div>
      </div>
    </div>
  );
};

export default FilterRange;
