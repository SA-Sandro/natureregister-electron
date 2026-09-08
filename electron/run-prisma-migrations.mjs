import { createHash, randomUUID } from 'node:crypto';
import { createRequire } from 'node:module';
import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';

const require = createRequire(import.meta.url);
const Database = require('better-sqlite3');

export async function runPrismaMigrations({ databaseUrl, schemaPath }) {
  if (!databaseUrl.startsWith('file:')) {
    throw new Error(`Unsupported database URL: ${databaseUrl}`);
  }

  const databasePath = path.normalize(databaseUrl.slice('file:'.length));
  const migrationsPath = path.join(path.dirname(schemaPath), 'migrations');
  const database = new Database(databasePath);

  try {
    database.exec(`
      CREATE TABLE IF NOT EXISTS _prisma_migrations (
        id TEXT PRIMARY KEY NOT NULL,
        checksum TEXT NOT NULL,
        finished_at DATETIME,
        migration_name TEXT NOT NULL,
        logs TEXT,
        rolled_back_at DATETIME,
        started_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        applied_steps_count INTEGER NOT NULL DEFAULT 0
      );
    `);

    const migrationDirectories = (await readdir(migrationsPath, { withFileTypes: true }))
      .filter((entry) => entry.isDirectory())
      .map((entry) => entry.name)
      .sort();
    const appliedMigration = database.prepare(
      'SELECT 1 FROM _prisma_migrations WHERE migration_name = ? AND finished_at IS NOT NULL',
    );
    const insertMigration = database.prepare(`
      INSERT INTO _prisma_migrations
        (id, checksum, finished_at, migration_name, started_at, applied_steps_count)
      VALUES (?, ?, CURRENT_TIMESTAMP, ?, CURRENT_TIMESTAMP, 1)
    `);

    for (const migrationName of migrationDirectories) {
      if (appliedMigration.get(migrationName)) continue;

      const migrationSql = await readFile(
        path.join(migrationsPath, migrationName, 'migration.sql'),
        'utf8',
      );
      const migrationId = randomUUID();
      const checksum = createHash('sha256').update(migrationSql).digest('hex');
      const applyMigration = database.transaction(() => {
        database.exec(migrationSql);
        insertMigration.run(migrationId, checksum, migrationName);
      });

      applyMigration();
      console.log(`Applied migration ${migrationName}`);
    }
  } finally {
    database.close();
  }
}
