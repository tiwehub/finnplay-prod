import clsx from 'clsx';
import React from 'react';

import styles from './game-card.module.scss';

interface GameCardProps {
  game: {
    name: string;
    cover: string;
  };
}

const GameCard: React.FC<GameCardProps> = ({ game }) => {
  return (
    <div className={clsx(styles[`game-card`], `group`)}>
      <img
        src={game.cover}
        alt={game.name}
        className={styles[`game-card__image`]}
      />
      <div className={styles[`game-card__info`]}>{game.name}</div>
    </div>
  );
};

export default GameCard;
