import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { env } from '../config/env';
import { validateUser } from '../services/auth-service';
import { loginSchema } from '../utils/validation';

export const login = (req: Request, res: Response) => {
  const validation = loginSchema.safeParse(req.body);
  console.log('Login request body:', req.body);

  if (!validation.success) {
    console.log('Validation errors:', validation.error.format());
    return res.status(400).json({
      errors: validation.error.format(),
    });
  }

  const { username, password } = req.body;

  if (validateUser(username, password)) {
    const token = jwt.sign({ username }, env.JWT_SECRET, { expiresIn: '1h' });
    (req.session as any).username = username;
    res.cookie('token', token, {
      httpOnly: true,
      secure: env.NODE_ENV === 'production',
    });
    console.log('Login successful, token generated:', token);
    return res.status(200).json({ message: 'Login successful', token });
  }

  console.log('Invalid credentials for username:', username);
  return res.status(401).json({ message: 'Invalid credentials' });
};

export const logout = (req: Request, res: Response) => {
  console.log('Logout called for session:', req.session);
  res.clearCookie('token');
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: 'Logout failed' });
    }
    return res.status(200).json({ message: 'Logout successful' });
  });
};
