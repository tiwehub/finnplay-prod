const users: Record<string, string> = {
  player1: 'player1',
  player2: 'player2',
};

export const validateUser = (username: string, password: string): boolean => {
  return users[username] === password;
};
