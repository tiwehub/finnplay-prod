import dotenv from 'dotenv';
import * as z from 'zod';

dotenv.config();

const createServerEnv = () => {
  const EnvSchema = z
    .object({
      SESSION_SECRET: z.string(),
      JWT_SECRET: z.string(),
      CLIENT_URL: z.string(),
      NODE_ENV: z.string().optional(),
      PORT: z.string().default('5000').transform(Number),
    })
    .strict();

  const envVars = {
    SESSION_SECRET: process.env.SESSION_SECRET,
    JWT_SECRET: process.env.JWT_SECRET,
    CLIENT_URL: process.env.CLIENT_URL,
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT,
  };

  console.log('SESSION_SECRET:', envVars.SESSION_SECRET);
  console.log('JWT_SECRET:', envVars.JWT_SECRET);
  console.log('CLIENT_URL:', envVars.CLIENT_URL);
  console.log('PORT:', envVars.PORT);

  const parsedEnv = EnvSchema.safeParse(envVars);

  if (!parsedEnv.success) {
    throw new Error(
      `Invalid env provided.
      The following variables are missing or invalid:
      ${Object.entries(parsedEnv.error.flatten().fieldErrors)
        .map(([k, v]) => `- ${k}: ${v}`)
        .join('\n')}`,
    );
  }

  return parsedEnv.data;
};

export const env = createServerEnv();
