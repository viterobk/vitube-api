import { logger } from '@core';
import config from 'config';
import migrate from 'node-pg-migrate';

interface IMigrationResult {
    succeeded: boolean;
    log: string[];
}

class MigrationManager {
    migrate = async (timeout: number) => {
        let timeoutExpired = false;
        let migrationSuccseeded = false;
        let lastLog = [];
        setTimeout(() => {
            timeoutExpired = true;
        }, timeout);
        while(!migrationSuccseeded && !timeoutExpired) {
            const { succeeded, log } = await this.runMigration();
            migrationSuccseeded = succeeded;
            lastLog = log;
            if (!succeeded) {
                await new Promise((resolve) => {
                    setTimeout(() => {
                        resolve({});
                    }, 1000);
                });
            }
        }
        
        if(migrationSuccseeded) {
            lastLog.map((message) => logger.info(message));
            logger.info('Migration succseeded');
        } else {
            logger.err('Migration failed:');
            lastLog.map((message) => logger.err(message));
        }
    }
    runMigration = async (): Promise<IMigrationResult> => {
        let result: IMigrationResult;
        let log = [];
        try {
            await migrate({
                databaseUrl: {
                    ...config.db,
                    connectionTimeoutMillis: 60000,
                },
                migrationsTable: '_migrations',
                dir: './migrations',
                direction: 'up',
                log: (message) => { log.push(message) },
            });
            result = {
                succeeded: true,
                log,
            };
        } catch {
            result = {
                succeeded: false,
                log,
            }
        }
        return result;
    }
}

export default new MigrationManager();