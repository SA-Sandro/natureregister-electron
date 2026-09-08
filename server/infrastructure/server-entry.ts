import { startServer } from './server';

export const serverPromise = startServer();

serverPromise.catch((error) => {
  console.error('Failed to start server', error);
  process.exitCode = 1;
});
