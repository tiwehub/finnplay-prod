import clsx from 'clsx';
import React, { useEffect, useState } from 'react';

import data from '@/assets/data/data.json';
import menuIcon from '@/assets/img/icons/menu.svg';
import IconButton from '@/components/ui/Button/IconButton';
import PrimaryButton from '@/components/ui/Button/PrimaryButton';

import FilterInput from './Filters/FilterInput';
import FilterList from './Filters/FilterList';
import FilterRange from './Filters/FilterRange';
import styles from './sidebar.module.scss';

interface Filters {
  providerFilter: string[];
  groupFilter: string[];
  sortOption: string;
  searchQuery: string;
  columns: number;
}

interface SidebarProps {
  className?: string;
  onFilterChange: (filters: Filters) => void;
  filteredGamesCount: number;
}

const Sidebar: React.FC<SidebarProps> = ({
  className,
  onFilterChange,
  filteredGamesCount,
}) => {
  const getInitialColumns = () => {
    if (window.innerWidth < 600) return 2;
    if (window.innerWidth < 1024) return 3;
    return 3;
  };

  const [providerFilter, setProviderFilter] = useState<string[]>([]);
  const [groupFilter, setGroupFilter] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [columns, setColumns] = useState<number>(getInitialColumns());
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 600);
  const [isTablet, setIsTablet] = useState<boolean>(window.innerWidth < 1024);
  const [showFilters, setShowFilters] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      const isNowMobile = window.innerWidth < 600;
      const isNowTablet = window.innerWidth < 1024;

      setIsMobile(isNowMobile);
      setIsTablet(isNowTablet);

      if (isNowMobile) {
        setColumns(2);
        onFilterChange({
          providerFilter,
          groupFilter,
          sortOption,
          searchQuery,
          columns: 2,
        });
      } else if (isNowTablet && columns > 3) {
        setColumns(3);
        onFilterChange({
          providerFilter,
          groupFilter,
          sortOption,
          searchQuery,
          columns: 3,
        });
      } else if (!isNowTablet && columns === 2) {
        setColumns(3);
        onFilterChange({
          providerFilter,
          groupFilter,
          sortOption,
          searchQuery,
          columns: 3,
        });
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [
    columns,
    providerFilter,
    groupFilter,
    sortOption,
    searchQuery,
    onFilterChange,
  ]);

  const handleProviderChange = (selected: string | string[]) => {
    if (Array.isArray(selected)) {
      setProviderFilter(selected);
      onFilterChange({
        providerFilter: selected,
        groupFilter,
        sortOption,
        searchQuery,
        columns,
      });
    }
  };

  const handleGroupChange = (selected: string | string[]) => {
    if (Array.isArray(selected)) {
      setGroupFilter(selected);
      onFilterChange({
        providerFilter,
        groupFilter: selected,
        sortOption,
        searchQuery,
        columns,
      });
    }
  };

  const handleSortChange = (selected: string | string[]) => {
    if (typeof selected === 'string') {
      setSortOption(selected);
      onFilterChange({
        providerFilter,
        groupFilter,
        sortOption: selected,
        searchQuery,
        columns,
      });
    }
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    onFilterChange({
      providerFilter,
      groupFilter,
      sortOption,
      searchQuery: query,
      columns,
    });
  };

  const handleColumnsChange = (value: number) => {
    setColumns(value);
    onFilterChange({
      providerFilter,
      groupFilter,
      sortOption,
      searchQuery,
      columns: value,
    });
  };

  const resetFilters = () => {
    setProviderFilter([]);
    setGroupFilter([]);
    setSortOption('');
    setSearchQuery('');
    const initialColumns = getInitialColumns();
    setColumns(initialColumns);
    onFilterChange({
      providerFilter: [],
      groupFilter: [],
      sortOption: '',
      searchQuery: '',
      columns: initialColumns,
    });
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  useEffect(() => {
    const initialColumns = getInitialColumns();
    setColumns(initialColumns);
    onFilterChange({
      providerFilter,
      groupFilter,
      sortOption,
      searchQuery,
      columns: initialColumns,
    });
  }, []);

  return (
    <aside className={clsx(styles.sidebar, className)}>
      <FilterInput
        id="search-query"
        name="search-query"
        className={styles[`sidebar__filter-list`]}
        onSearch={handleSearchChange}
        reset={searchQuery === ''}
      />
      <div className={styles[`sidebar__filters`]}>
        {isMobile && (
          <IconButton
            icon={menuIcon}
            className={styles[`sidebar__filter-toggle`]}
            onClick={toggleFilters}
          >
            {showFilters ? 'Hide filters' : 'Show filters'}
          </IconButton>
        )}
        {(showFilters || !isMobile) && (
          <div>
            <FilterList
              title="Providers"
              items={data.providers.map((provider) => provider.name)}
              onChange={handleProviderChange}
              multiSelect={true}
              reset={providerFilter.length === 0}
            />
            <FilterList
              title="Game groups"
              items={data.groups.map((group) => group.name)}
              onChange={handleGroupChange}
              multiSelect={true}
              reset={groupFilter.length === 0}
            />
            <FilterList
              title="Sorting"
              items={['A-Z', 'Z-A', 'Newest']}
              onChange={handleSortChange}
              multiSelect={false}
              reset={sortOption === ''}
            />
            {!isMobile && (
              <FilterRange
                title="Columns"
                min={2}
                max={isTablet ? 3 : 4}
                defaultValue={columns}
                onChange={handleColumnsChange}
                reset={columns === 3}
              />
            )}
            <div className={styles[`sidebar__filter-range`]}>
              <h4 className={styles[`sidebar__games-amount`]}>
                Games amount: {filteredGamesCount}
              </h4>
              <PrimaryButton
                className={styles[`sidebar__reset-button`]}
                type="button"
                onClick={resetFilters}
              >
                Reset
              </PrimaryButton>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
