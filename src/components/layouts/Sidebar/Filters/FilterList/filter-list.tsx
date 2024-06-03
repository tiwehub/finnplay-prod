import clsx from 'clsx';
import React, { useEffect, useState } from 'react';

import styles from './filter-list.module.scss';

interface FilterListProps {
  title: string;
  items: string[];
  onChange: (selected: string | string[]) => void;
  reset: boolean;
  multiSelect?: boolean;
}

const FilterList: React.FC<FilterListProps> = ({
  title,
  items,
  onChange,
  reset,
  multiSelect = false,
}) => {
  const [activeItems, setActiveItems] = useState<string[]>([]);

  useEffect(() => {
    if (reset) {
      setActiveItems([]);
    }
  }, [reset]);

  const handleItemClick = (item: string) => {
    let newActiveItems: string[];
    if (multiSelect) {
      newActiveItems = activeItems.includes(item)
        ? activeItems.filter((i) => i !== item)
        : [...activeItems, item];
    } else {
      newActiveItems = [item];
    }
    setActiveItems(newActiveItems);
    onChange(multiSelect ? newActiveItems : newActiveItems[0]);
  };

  useEffect(() => {
    onChange(multiSelect ? activeItems : activeItems[0]);
  }, [activeItems]);

  return (
    <div className={styles[`filter-list`]}>
      <h2 className={styles[`filter-list__title`]}>{title}</h2>
      <ul className={styles[`filter-list__items`]}>
        {items.map((item) => (
          <li
            key={item}
            className={clsx(
              styles[`filter-list__item`],
              activeItems.includes(item)
                ? styles[`filter-list__item--active`]
                : styles[`filter-list__item--inactive`],
            )}
            onClick={() => handleItemClick(item)}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FilterList;
