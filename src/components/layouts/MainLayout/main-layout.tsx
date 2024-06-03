import React, { useEffect, useState } from 'react';


import data from '@/assets/data/data.json';
import Sidebar from '@/components/layouts/Sidebar';
import GameList from '@/components/ui/GameList';
import Header from 'src/components/layouts/Header';

import styles from './main-layout.module.scss';

interface Filters {
  providerFilter: string[];
  groupFilter: string[];
  sortOption: string;
  searchQuery: string;
  columns: number;
}

const MainLayout: React.FC = () => {
  const [filters, setFilters] = useState<Filters>({
    providerFilter: [],
    groupFilter: [],
    sortOption: '',
    searchQuery: '',
    columns: 3,
  });
  const [filteredGamesCount, setFilteredGamesCount] = useState(0);

  const handleFilterChange = (newFilters: Filters) => {
    setFilters(newFilters);
  };

  useEffect(() => {
    const filteredGames = data.games.filter((game) => {
      const provider = data.providers.find(
        (provider) => provider.id === game.provider,
      );
      const matchesProvider =
        filters.providerFilter.length === 0 ||
        filters.providerFilter.includes(provider?.name || '');
      const matchesGroup =
        filters.groupFilter.length === 0 ||
        filters.groupFilter.some((group) =>
          data.groups.find((g) => g.name === group)?.games.includes(game.id),
        );
      const matchesSearch =
        !filters.searchQuery ||
        game.name.toLowerCase().includes(filters.searchQuery.toLowerCase());
      return matchesProvider && matchesGroup && matchesSearch;
    });

    setFilteredGamesCount(filteredGames.length);
  }, [filters]);

  return (
    <>
      <Header />
      <div className={styles[`main-layout__container`]}>
        <main className={styles[`main-layout__main`]}>
          <GameList
            {...filters}
            onFilteredGamesCountChange={setFilteredGamesCount}
          />
        </main>
        <Sidebar
          className={styles[`main-layout__sidebar`]}
          onFilterChange={handleFilterChange}
          filteredGamesCount={filteredGamesCount}
        />
      </div>
    </>
  );
};

export default MainLayout;
