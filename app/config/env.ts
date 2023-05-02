import { dotenvConfig } from '../deps.ts';
// dotenvConfig({ export: true, path: './src/.env' });

const env: {
  port: number;
  denoEnv: string;
} = {
  port: parseInt(Deno.env.get('PORT' || 8080) as unknown as string),
  denoEnv: Deno.env.get('DENO_ENV') || "development" as unknown as string,
  dbUri: Deno.env.get('MONGODB_URI') as unknown as string,
  dbName: Deno.env.get('MONGODB_DATABASE_NAME') as unknown as string,
};

export default env;