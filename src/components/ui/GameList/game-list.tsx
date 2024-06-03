import clsx from 'clsx';
import React, { useEffect, useState } from 'react';

import data from '@/assets/data/data.json';
import GameCard from '@/components/ui/GameCard';

import styles from './game-list.module.scss';

interface GameListProps {
  providerFilter: string[];
  groupFilter: string[];
  sortOption: string;
  searchQuery: string;
  columns: number;
  onFilteredGamesCountChange: (count: number) => void;
}

const GameList: React.FC<GameListProps> = ({
  providerFilter,
  groupFilter,
  sortOption,
  searchQuery,
  columns,
  onFilteredGamesCountChange,
}) => {
  const [filteredGames, setFilteredGames] = useState(data.games);

  useEffect(() => {
    let games = data.games;

    if (providerFilter.length > 0) {
      games = games.filter((game) =>
        providerFilter.includes(
          data.providers.find((provider) => provider.id === game.provider)
            ?.name || '',
        ),
      );
    }

    if (groupFilter.length > 0) {
      games = games.filter((game) =>
        groupFilter.some((group) =>
          data.groups.find((g) => g.name === group)?.games.includes(game.id),
        ),
      );
    }

    if (searchQuery) {
      games = games.filter((game) =>
        game.name.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    if (sortOption === 'A-Z') {
      games = games.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOption === 'Z-A') {
      games = games.sort((a, b) => b.name.localeCompare(a.name));
    } else if (sortOption === 'Newest') {
      games = games.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
      );
    }

    setFilteredGames(games);
    onFilteredGamesCountChange(games.length);
  }, [
    providerFilter,
    groupFilter,
    sortOption,
    searchQuery,
    onFilteredGamesCountChange,
  ]);

  return (
    <div
      className={clsx(
        styles[`game-list`],
        columns === 2 && styles[`game-list--cols-2`],
        columns === 3 && styles[`game-list--cols-3`],
        columns === 4 && styles[`game-list--cols-4`],
      )}
    >
      {filteredGames.map((game) => (
        <GameCard key={game.id} game={game} />
      ))}
    </div>
  );
};

export default GameList;
